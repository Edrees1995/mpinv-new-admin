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
# SSH to server (password: @3L#n+8x?a/9X)
ssh root@76.13.18.59

# Deploy updates (with sshpass for non-interactive)
sshpass -p '@3L#n+8x?a/9X' ssh -o StrictHostKeyChecking=no root@76.13.18.59 "source /root/.nvm/nvm.sh && nvm use 20 && cd /var/www/new-admin.mpinv.cloud && git pull origin main && npm install && npm run build && pm2 restart new-admin --update-env"

# Or step-by-step on server:
cd /var/www/new-admin.mpinv.cloud
source /root/.nvm/nvm.sh && nvm use 20
git pull origin main
npm install
npm run build
pm2 restart new-admin --update-env

# View logs
pm2 logs new-admin

# IMPORTANT: Server uses nvm - must run `source /root/.nvm/nvm.sh && nvm use 20` before npm/node commands
```

## Keeping Server & Local In Sync
- **Always** commit and push locally first, then `git pull` on server
- Verify alignment: compare `git log --oneline -1` on both local and server
- Server path: `/var/www/new-admin.mpinv.cloud`
- Local path: `/Users/edreessalih/Desktop/Master Piecs/Master picece/Projects/projects/new-admin`
- After pull on server: `npm install && npm run build && pm2 restart new-admin --update-env`

## Implemented Modules (Phase 1 Complete)

### 1. Dashboard Module
- **Files**: `src/dashboard/`, `views/dashboard.hbs`
- **Features**: Stats cards, recent projects/contacts/developers tables, quick actions
- **Stats**: Shows counts for projects, developers, communities, contacts (Properties from Bitrix24 API)

### 2. Properties Module
- **Files**: `src/properties/`, `views/properties/`
- **Features**: List view with pagination, filtering, property detail view
- **Note**: Properties data comes from Bitrix24 XML feeds, NOT from database

### 3. Offplan Projects Module
- **Files**: `src/projects/`, `views/projects/`
- **Features**: CRUD operations, list/view/create/edit pages, pagination, search/filter
- **37 Synced Fields** (Phase 3): category, subcategory, type_of_project, off_plan, listing_type, launch_date, possession, completion_date, sale_status, pay_plan, payment_plan, rera, ref_no, ded, brn, qr, agent_name, agent_phone, agent_email, agent_logo, mobile_number, meta_title, meta_keywords, meta_description, bg_img, bg_img_mobile, sliding, home_sliding, caption, d_right, bg_attachment1, bg_attachment2, parking, furnished, currency_abr, area_measurement, area_unit
- **Relations**: Developer, Community, SubCommunity, Category, Subcategory, AdImage, AdPropertyType, AdFloorPlan, AdPaymentPlan
- **Verification**: `/projects/verify` (completeness dashboard), `/projects/:id/compare` (side-by-side with old admin API)

### 4. Developers Module
- **Files**: `src/developers/`, `views/developers/`
- **Features**: CRUD operations, list/view/create/edit pages, search/filter, featured developers

### 5. Communities Module
- **Files**: `src/communities/`, `views/communities/`
- **Features**: CRUD operations, list/view/create/edit pages, sub-communities linkage

### 6. Sub-Communities Module
- **Files**: `src/sub-communities/`, `views/sub-communities/`
- **Features**: CRUD operations, list/view/create/edit pages, community filtering, location coordinates

## Key Files
- `src/entities/` - TypeORM entities for all database tables
- `src/dashboard/` - Dashboard module with controller and service
- `src/database/` - Database module configuration
- `src/main.ts` - App bootstrap with Handlebars helpers (eq, gt, range, formatDate, substring, etc.)
- `views/` - Handlebars templates
- `views/layouts/main.hbs` - Main layout with sidebar navigation
- `scripts/create-database.sql` - Database schema
- `scripts/migrate-data.sql` - Data migration script

## Handlebars Helpers Available
- `eq`, `neq`, `gt`, `lt`, `gte`, `lte` - Comparison helpers
- `and`, `or`, `not` - Logical helpers
- `add`, `subtract`, `multiply`, `divide` - Math helpers
- `formatDate`, `formatDateTime` - Date formatting
- `truncate`, `substring` - String helpers
- `range` - Array generation for pagination
- `ifCond` - Complex conditional helper
- `json` - JSON stringify helper

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

## Phase 2: Code Review Summary (Completed)

### Review Agent Results

| Module | Rating | Key Findings |
|--------|--------|--------------|
| Dashboard | Needs Improvement | Fixed: Incorrect unread contacts logic (was using IsNull on string field) |
| Properties | Needs Improvement | Fixed: XSS vulnerability in `{{{property.description}}}` |
| Projects | Needs Improvement | Fixed: XSS in view.hbs, scalability issues with pagination |
| Developers | Needs Improvement | Fixed: XSS in view.hbs and API search endpoint |
| Communities | Good | Fixed: XSS in onclick handler using data attributes |
| Sub-Communities | Needs Improvement | Fixed: XSS in view.hbs, latitude/longitude zero value bug, added missing partials |

### Security Fixes Applied
1. **XSS Prevention**: Changed all triple braces `{{{...}}}` to double braces `{{...}}` for description fields
2. **HTML Escaping**: Added `escapeHtml()` function for API endpoint HTML rendering
3. **Input Validation**: Fixed latitude/longitude zero value checks (`0` is valid coordinate)
4. **Dashboard Logic**: Fixed unread contacts count using `Not(Equal('1'))` instead of `IsNull()`
5. **Data Attributes**: Replaced inline JavaScript with data attributes for onclick handlers

### Remaining Items for Future Phases
- Add proper DTO validation with class-validator
- Add CSRF protection to forms
- Fix route ordering for `api/search` and `api/list` endpoints (currently after `:id` param route)
- Add error handling with try-catch in controllers
- Add `rel="noopener noreferrer"` to external links
- Fix pre-existing `Setting.id` column error in settings entity

## Phase 3: Old Admin Field Sync (Completed)

### What Was Done
Added 37 missing database columns to the offplan project entity so every field from the old admin is visible and editable in the new admin.

### Files Modified
| File | Change |
|------|--------|
| `src/entities/offplan-project.entity.ts` | +37 column mappings, +3 relations (Category, Subcategory, SubCommunity) |
| `src/projects/projects.service.ts` | Updated DTOs, image transforms, new repository injections, lookup methods |
| `src/projects/projects.controller.ts` | New data to views, `/verify` and `/:id/compare` endpoints |
| `src/projects/projects.module.ts` | Import SubCommunity, Category, Subcategory entities |
| `views/projects/view.hbs` | +6 display sections (Classification, Payment Plan, Agent, Legal, SEO, Slider Images) |
| `views/projects/edit.hbs` | +8 form sections for all 37 new fields |
| `views/projects/create.hbs` | Rebuilt with all field sections |
| `views/projects/verify.hbs` | **NEW** - Verification dashboard (completeness %, 10/page) |
| `views/projects/compare.hbs` | **NEW** - Side-by-side comparison with old admin API |

### New Field Groups
- **Classification**: category_id, sub_category_id, type_of_project, off_plan, listing_type
- **Timeline/Sales**: launch_date, possession, completion_date, sale_status
- **Payment Plan**: pay_plan (label), payment_plan (JSON breakdown)
- **Registration/Legal**: rera, ref_no, ded, brn, qr
- **Agent Info**: agent_name, agent_phone, agent_email, agent_logo, mobile_number
- **SEO**: meta_title, meta_keywords, meta_description
- **Slider/Background**: bg_img, bg_img_mobile, sliding, home_sliding, caption, d_right, bg_attachment1, bg_attachment2
- **Additional**: parking, furnished, currency_abr, area_measurement, area_unit

### Verification Pages
- **`/projects/verify`**: Dashboard with completeness % per project, color-coded field indicators, pagination
- **`/projects/:id/compare`**: Fetches old admin API (`offplan_detail?slug=X`), shows side-by-side field comparison with match/diff/missing counts
