# MPINV New Admin Panel - Project Context

## Project Overview
NestJS admin panel for Masterpiece Property (MPINV) real estate website.
Migrating from old Yii PHP admin to modern NestJS + Handlebars + Tailwind CSS + HTMX stack.

## Server Information
- **VPS IP**: 76.13.18.59
- **SSH User**: root
- **SSH Password**: @3L#n+8x?a/9X
- **Admin URL**: https://new-admin.mpinv.cloud
- **Port**: 3001

## Database
- **Host**: 127.0.0.1
- **Port**: 3306
- **Database**: mpinv
- **Username**: mpinv_admin
- **Password**: MpinvAdmin123!
- **Table Prefix**: mw_

## Directory Structure
- **Local**: `/Users/edreessalih/Desktop/Master Piecs/Master picece/Projects/projects/new-admin`
- **Server**: `/var/www/new-admin.mpinv.cloud`

## Related Projects
- **Frontend**: https://mpinv.cloud (Next.js at /var/www/mpinv.cloud)
- **Old Admin**: https://admin.mpinv.cloud (Yii PHP at /var/www/admin.mpinv.cloud)
- **Backend API**: Port 9000 (serves /api/site/)

## Tech Stack
- NestJS 11
- TypeORM with MySQL
- Handlebars (hbs) view engine
- Tailwind CSS (CDN)
- HTMX (CDN)
- Node.js 20 (via nvm)
- PM2 for process management

## Deployment Commands
```bash
# SSH to server
ssh root@76.13.18.59

# Deploy updates
cd /var/www/new-admin.mpinv.cloud
git pull origin main
npm install
npm run build
pm2 restart new-admin --update-env

# View logs
pm2 logs new-admin
```

## Key Files
- `src/entities/` - TypeORM entities for all database tables
- `src/dashboard/` - Dashboard module with controller and service
- `src/database/` - Database module configuration
- `views/` - Handlebars templates
- `views/layouts/main.hbs` - Main layout with sidebar
- `scripts/create-database.sql` - Database schema
- `scripts/migrate-data.sql` - Data migration script

## Database Tables (mw_ prefix)
- mw_place_an_ad - Properties
- mw_projectlist - Offplan projects
- mw_developers - Developers
- mw_community - Communities
- mw_sub_community - Sub-communities
- mw_category - Categories
- mw_subcategory - Subcategories
- mw_amenities - Amenities
- mw_user - Admin users
- mw_listing_users - Frontend users
- mw_article - Blog articles
- mw_option - Settings
- mw_contact_us - Contact inquiries
- mw_banner - Banners
- mw_teams - Team members
- mw_faq - FAQs

## GitHub Repository
https://github.com/Edrees1995/mpinv-new-admin
