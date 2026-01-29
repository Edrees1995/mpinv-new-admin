#!/bin/bash
# seed-developer-logos.sh
# Downloads missing developer logos and uploads them to the server
# Usage: bash scripts/seed-developer-logos.sh

set -e

SERVER="root@76.13.18.59"
SSH_PASS='@3L#n+8x?a/9X'
UPLOAD_DIR="/var/www/admin.mpinv.cloud/public/uploads/ads"
DB_USER="debian-sys-maint"
DB_PASS="xKvaXiUhsocZRURL"
DB_NAME="mpinv"
TEMP_DIR=$(mktemp -d)

echo "=== Developer Logo Seed Script ==="
echo "Temp directory: $TEMP_DIR"

# Define developer logos: "developer_name|logo_url"
declare -a LOGOS=(
  "IMKAN|https://emirates.estate/uploads/images/2020-12/imkanproperties.png"
  "MAG Group|https://mag.global/themes/mag/src/images/logo.png"
  "Federal Properties Limited|https://federalpropertiesltd.ae/wp-content/themes/webftechpr40/assets/img/logo.svg"
  "Fam Holding|https://famholding.com/wp-content/uploads/2024/08/icon-dark-01.png"
  "Tameer Holding|https://emirates.estate/uploads/images/2020-12/logotamer.png"
  "Aabar Properties|https://res.cloudinary.com/protenders/image/upload/s--t5ebYMxg--/c_fit,d_missing,dpr_auto,f_auto,h_120,q_auto:eco,w_120/jsb7jjl2fsc7xviw2lou.png"
  "Al Markaz Development|https://www.fcprop.net/assets/uploads/developers/3760083AL_MARKAZ.jpg"
  "Dhafir Development and Contracting LLC|https://www.dhafirdc.com/uploads/logo59193db5a5c79_thumbs_225.png"
  "RDK Group|https://storage.googleapis.com/bd-ae-01/developer_image/logo/164.png"
  "Solidere International|https://cdn.brandfetch.io/id17UpHSrz/w/1826/h/505/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1763233621331"
  "Hydra Properties|https://openhomegroup.com/wp-content/uploads/2023/09/hydra-logo.jpg"
  "Burooj Properties|https://res.cloudinary.com/protenders/image/upload/s--X7skLPDl--/c_fit,d_missing,dpr_auto,f_auto,h_120,q_auto:eco,w_120/my7gyrreu50id1xlofeg.jpg"
  "Green Emirates Properties|https://img.squareyards.ae/resources/images/developerlogo/green-emirates-properties-16367.jpg"
  "Masaood Developments|https://res.cloudinary.com/protenders/image/upload/s--GAvmoCzt--/c_fit,d_missing,dpr_auto,f_auto,h_120,q_auto:eco,w_120/33abba030799624b49e79956d237fe77.png"
  "Farglory|https://cdn.brandfetch.io/idLEaxe3SH/w/820/h/115/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1764713851094"
  "Webridge Properties|https://cdn.brandfetch.io/idwgqT93CE/w/820/h/393/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1769626437369"
)

TIMESTAMP=$(date +%y%m%d%H%M%S)
SQL_STATEMENTS=""
SUCCESS_COUNT=0
FAIL_COUNT=0

for entry in "${LOGOS[@]}"; do
  IFS='|' read -r DEV_NAME LOGO_URL <<< "$entry"

  # Generate unique filename matching server convention
  RANDOM_NUM=$((RANDOM % 999999))
  FILENAME="${TIMESTAMP}_${RANDOM_NUM}_$(echo "$DEV_NAME" | tr ' ' '_' | tr -cd '[:alnum:]_').webp"
  DOWNLOAD_PATH="$TEMP_DIR/$(echo "$DEV_NAME" | tr ' ' '_').orig"

  echo ""
  echo "--- Processing: $DEV_NAME ---"
  echo "    URL: $LOGO_URL"

  # Download the logo
  if curl -sL -o "$DOWNLOAD_PATH" --max-time 30 "$LOGO_URL"; then
    # Check if file has content
    if [ ! -s "$DOWNLOAD_PATH" ]; then
      echo "    SKIP: Empty file downloaded"
      FAIL_COUNT=$((FAIL_COUNT + 1))
      continue
    fi

    FILE_TYPE=$(file -b --mime-type "$DOWNLOAD_PATH" 2>/dev/null || echo "unknown")
    echo "    Downloaded: $FILE_TYPE"

    WEBP_PATH="$TEMP_DIR/$FILENAME"

    # Convert to WebP based on file type
    if [[ "$FILE_TYPE" == *"svg"* ]]; then
      # SVG: use convert (ImageMagick) on server instead
      # Upload original and convert on server
      SVG_PATH="$TEMP_DIR/$(echo "$DEV_NAME" | tr ' ' '_').svg"
      cp "$DOWNLOAD_PATH" "$SVG_PATH"
      echo "    SVG detected - will convert on server"

      # Upload SVG to server, convert there, then clean up
      sshpass -p "$SSH_PASS" scp -o StrictHostKeyChecking=no "$SVG_PATH" "$SERVER:/tmp/logo_temp.svg" 2>/dev/null
      sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SERVER" "convert /tmp/logo_temp.svg -resize 400x400 -background white -flatten $UPLOAD_DIR/$FILENAME && rm /tmp/logo_temp.svg" 2>/dev/null

      if sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SERVER" "test -s $UPLOAD_DIR/$FILENAME" 2>/dev/null; then
        echo "    Converted and uploaded: $FILENAME"
        SQL_STATEMENTS="$SQL_STATEMENTS
UPDATE mw_developers SET logo = '$FILENAME' WHERE developer_name = '$DEV_NAME' AND (logo LIKE '%.png' OR logo = '' OR logo IS NULL);"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
      else
        echo "    FAIL: SVG conversion failed on server"
        FAIL_COUNT=$((FAIL_COUNT + 1))
      fi
      continue
    fi

    # For raster images: convert to webp using cwebp on server
    # First upload the original
    sshpass -p "$SSH_PASS" scp -o StrictHostKeyChecking=no "$DOWNLOAD_PATH" "$SERVER:/tmp/logo_temp.img" 2>/dev/null

    # Convert on server (cwebp for PNG/JPG, or convert for GIF/other)
    if [[ "$FILE_TYPE" == *"gif"* ]] || [[ "$FILE_TYPE" == *"webp"* ]]; then
      sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SERVER" "convert /tmp/logo_temp.img -resize 400x400 $UPLOAD_DIR/$FILENAME && rm /tmp/logo_temp.img" 2>/dev/null
    else
      sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SERVER" "cwebp -q 85 -resize 400 0 /tmp/logo_temp.img -o $UPLOAD_DIR/$FILENAME && rm /tmp/logo_temp.img" 2>/dev/null
    fi

    # Verify upload
    if sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SERVER" "test -s $UPLOAD_DIR/$FILENAME" 2>/dev/null; then
      echo "    Uploaded: $FILENAME"
      SQL_STATEMENTS="$SQL_STATEMENTS
UPDATE mw_developers SET logo = '$FILENAME' WHERE developer_name = '$DEV_NAME' AND (logo LIKE '%.png' OR logo = '' OR logo IS NULL);"
      SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
      echo "    FAIL: Upload/conversion failed"
      FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
  else
    echo "    FAIL: Download failed"
    FAIL_COUNT=$((FAIL_COUNT + 1))
  fi
done

echo ""
echo "=== Updating Database ==="

if [ -n "$SQL_STATEMENTS" ]; then
  echo "$SQL_STATEMENTS"
  sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SERVER" "mysql -u $DB_USER -p$DB_PASS $DB_NAME -e \"$SQL_STATEMENTS\"" 2>&1 | grep -v Warning
  echo ""
  echo "Database updated successfully."
else
  echo "No SQL updates to run."
fi

echo ""
echo "=== Summary ==="
echo "Successful: $SUCCESS_COUNT"
echo "Failed: $FAIL_COUNT"
echo "Total: $((SUCCESS_COUNT + FAIL_COUNT))"

# Cleanup
rm -rf "$TEMP_DIR"
echo ""
echo "Done! Temp files cleaned up."
