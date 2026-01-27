# MPINV Admin Panel Migration Plan

## Overview
Migrating from Yii PHP admin panel to NestJS + Handlebars + Tailwind + HTMX

## Old Admin Analysis

### Controllers (93 total - key modules)
| Module | Controller | CRUD | Priority |
|--------|------------|------|----------|
| Dashboard | DashboardController | R | HIGH |
| Properties | Place_an_adController | CRUD | HIGH |
| Offplan Projects | OffplanController | CRUD | HIGH |
| Project List | ProjectlistController | CRUD | HIGH |
| Developers | DevelopersController, Developer_listController | CRUD | HIGH |
| Communities | CommunityController | CRUD | HIGH |
| Sub-Communities | Sub_communityController | CRUD | HIGH |
| Categories | CategoryController | CRUD | HIGH |
| Subcategories | SubcategoryController | CRUD | HIGH |
| Amenities | AmenitiesController | CRUD | MEDIUM |
| Users | UsersController, ListingusersController | CRUD | HIGH |
| Articles/Blog | ArticlesController | CRUD | MEDIUM |
| FAQ | FaqController | CRUD | MEDIUM |
| Reviews | ReviewsController | CRUD | MEDIUM |
| Teams | TeamsController | CRUD | MEDIUM |
| Banners | BannerController | CRUD | LOW |
| Settings | SettingsController | RU | HIGH |
| Contact Forms | Contact_usController, EnquiryController | R | MEDIUM |
| Careers | CareersController, JobsController | CRUD | LOW |
| Social Posts | Social_postsController | CRUD | LOW |
| Floor Plans | Floor_planController | CRUD | MEDIUM |

### Database Tables (90 total - key tables)
| Table | Purpose | Priority |
|-------|---------|----------|
| mw_place_an_ad | Properties/Listings | HIGH |
| mw_ad_image | Property Images | HIGH |
| mw_ad_amenities | Property Amenities | HIGH |
| mw_ad_floor_plan | Property Floor Plans | HIGH |
| mw_ad_faq | Property FAQs | HIGH |
| mw_projectlist | Off-plan Projects | HIGH |
| mw_developers | Developers | HIGH |
| mw_devlist | Developer Details | HIGH |
| mw_community | Communities | HIGH |
| mw_sub_community | Sub-communities | HIGH |
| mw_category | Property Categories | HIGH |
| mw_subcategory | Property Subcategories | HIGH |
| mw_amenities | Amenities Master | HIGH |
| mw_user | Admin Users | HIGH |
| mw_listing_users | Frontend Users | MEDIUM |
| mw_article | Blog Articles | MEDIUM |
| mw_option | Settings | HIGH |
| mw_contact_us | Contact Submissions | MEDIUM |
| mw_banner | Banners | LOW |
| mw_social_posts | Social Media Posts | LOW |

---

## Phase 1: Database Setup
**Agent: Database Agent**

### Tasks:
1. Export existing database structure from mpinv
2. Create new database `mpinv_new` on server
3. Create TypeORM entities matching existing tables
4. Migrate data from old to new database
5. Verify data integrity

### Key Entities to Create:
- Property (mw_place_an_ad)
- PropertyImage (mw_ad_image)
- PropertyAmenity (mw_ad_amenities)
- Project (mw_projectlist)
- Developer (mw_developers)
- Community (mw_community)
- SubCommunity (mw_sub_community)
- Category (mw_category)
- Subcategory (mw_subcategory)
- Amenity (mw_amenities)
- User (mw_user)
- Article (mw_article)
- Setting (mw_option)
- Contact (mw_contact_us)
- Banner (mw_banner)
- FAQ (mw_ad_faq)
- FloorPlan (mw_ad_floor_plan)
- Review (related to teams)

---

## Phase 2: Dashboard Design
**Agent: Dashboard Agent**

### Pages to Create:
1. **Dashboard** - Overview with stats
2. **Properties**
   - List view with filters
   - Create/Edit form
   - Image management
   - Amenities selection
   - Floor plans
3. **Off-plan Projects**
   - List view
   - Create/Edit form
   - Gallery management
4. **Developers**
   - List view
   - Create/Edit form
5. **Locations**
   - Communities list
   - Sub-communities list
   - Create/Edit forms
6. **Categories**
   - Categories list
   - Subcategories list
7. **Amenities**
   - List view
   - Create/Edit form
8. **Users**
   - Admin users
   - Listing users
9. **Content**
   - Articles/Blog
   - FAQs
   - Banners
10. **Settings**
    - General settings
    - Social links
    - Contact info

---

## Phase 3: API Development
**Agent: API Agent**

### API Endpoints:
1. **Properties API**
   - GET /api/properties
   - GET /api/properties/:id
   - POST /api/properties
   - PUT /api/properties/:id
   - DELETE /api/properties/:id
   - POST /api/properties/:id/images

2. **Projects API**
   - GET /api/projects
   - GET /api/projects/:id
   - POST /api/projects
   - PUT /api/projects/:id
   - DELETE /api/projects/:id

3. **Developers API**
   - GET /api/developers
   - GET /api/developers/:id
   - POST /api/developers
   - PUT /api/developers/:id
   - DELETE /api/developers/:id

4. **Locations API**
   - GET /api/communities
   - GET /api/sub-communities
   - CRUD operations

5. **Categories API**
   - GET /api/categories
   - GET /api/subcategories
   - CRUD operations

6. **Settings API**
   - GET /api/settings
   - PUT /api/settings

7. **Frontend APIs** (for website)
   - GET /api/site/properties
   - GET /api/site/offplan-listings
   - GET /api/site/developers
   - GET /api/site/communities

---

## Phase 4: Review & Testing
**Agents: Review Agents, Testing Agents**

### Review Checklist:
- [ ] All database tables migrated
- [ ] All entities correctly mapped
- [ ] All CRUD operations working
- [ ] All dashboard pages functional
- [ ] All APIs responding correctly
- [ ] Image upload working
- [ ] Authentication working

### Testing:
- Unit tests for services
- Integration tests for APIs
- E2E tests for dashboard flows

---

## Phase 5: QA & Deployment
**Agent: QA Agent**

### QA Checklist:
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance testing
- [ ] Security audit
- [ ] Data validation
- [ ] Error handling

---

## Execution Order:
1. Database Agent → Create entities & migrate data
2. Dashboard Agent → Build UI pages
3. API Agent → Create REST endpoints
4. Review Agent → Review all work
5. Testing Agent → Run tests
6. QA Agent → Final quality check
