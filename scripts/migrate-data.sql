-- Data Migration Script
-- Migrate data from old mpinv database to new mpinv_new database
-- Run this AFTER create-database.sql

-- Use the new database
USE mpinv_new;

-- Disable foreign key checks during migration
SET FOREIGN_KEY_CHECKS = 0;

-- Migrate categories
INSERT INTO mpinv_new.mw_category (id, name, slug, icon, description, status, sort_order, meta_title, meta_description)
SELECT id, name, slug, icon, description, status, COALESCE(sort_order, 0), meta_title, meta_description
FROM mpinv.mw_category
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

-- Migrate subcategories
INSERT INTO mpinv_new.mw_subcategory (id, name, slug, category_id, description, status, sort_order, meta_title, meta_description)
SELECT id, name, slug, category_id, description, status, COALESCE(sort_order, 0), meta_title, meta_description
FROM mpinv.mw_subcategory
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

-- Migrate communities
INSERT INTO mpinv_new.mw_community (id, name, slug, description, image, banner_image, latitude, longitude, status, featured, sort_order, meta_title, meta_description, meta_keywords)
SELECT id, name, slug, description, image, banner_image, latitude, longitude, status, COALESCE(featured, 0), COALESCE(sort_order, 0), meta_title, meta_description, meta_keywords
FROM mpinv.mw_community
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

-- Migrate sub-communities
INSERT INTO mpinv_new.mw_sub_community (id, name, slug, community_id, description, image, latitude, longitude, status, sort_order, meta_title, meta_description)
SELECT id, name, slug, community_id, description, image, latitude, longitude, status, COALESCE(sort_order, 0), meta_title, meta_description
FROM mpinv.mw_sub_community
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

-- Migrate developers
INSERT INTO mpinv_new.mw_developers (id, name, slug, description, logo, banner_image, website, email, phone, address, established_year, projects_count, status, featured, sort_order, meta_title, meta_description, meta_keywords)
SELECT id, name, slug, description, logo, banner_image, website, email, phone, address, established_year, COALESCE(projects_count, 0), status, COALESCE(featured, 0), COALESCE(sort_order, 0), meta_title, meta_description, meta_keywords
FROM mpinv.mw_developers
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

-- Migrate amenities
INSERT INTO mpinv_new.mw_amenities (id, name, slug, icon, icon_type, description, category, status, sort_order)
SELECT id, name, slug, icon, icon_type, description, category, status, COALESCE(sort_order, 0)
FROM mpinv.mw_amenities
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

-- Migrate properties (mw_place_an_ad)
INSERT INTO mpinv_new.mw_place_an_ad (id, title, slug, description, price, purpose, property_type, bedrooms, bathrooms, area, builtup_area, address, city, latitude, longitude, category_id, subcategory_id, community_id, sub_community_id, featured_image, reference_no, status, featured, is_offplan, video_url, virtual_tour, agent_id, meta_title, meta_description, meta_keywords)
SELECT id, title, slug, description, price, purpose, property_type, bedrooms, bathrooms, area, builtup_area, address, city, latitude, longitude, category_id, subcategory_id, community_id, sub_community_id, featured_image, reference_no, status, COALESCE(featured, 0), COALESCE(is_offplan, 0), video_url, virtual_tour, agent_id, meta_title, meta_description, meta_keywords
FROM mpinv.mw_place_an_ad
ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    slug = VALUES(slug);

-- Migrate property images
INSERT INTO mpinv_new.mw_ad_image (id, ad_id, image, thumbnail, alt_text, sort_order, is_featured)
SELECT id, ad_id, image, thumbnail, alt_text, COALESCE(sort_order, 0), COALESCE(is_featured, 0)
FROM mpinv.mw_ad_image
ON DUPLICATE KEY UPDATE
    image = VALUES(image);

-- Migrate property amenities
INSERT INTO mpinv_new.mw_ad_amenities (id, ad_id, amenity_id)
SELECT id, ad_id, amenity_id
FROM mpinv.mw_ad_amenities
ON DUPLICATE KEY UPDATE
    ad_id = VALUES(ad_id);

-- Migrate property FAQs
INSERT INTO mpinv_new.mw_ad_faq (id, ad_id, question, answer, sort_order, status)
SELECT id, ad_id, question, answer, COALESCE(sort_order, 0), COALESCE(status, 1)
FROM mpinv.mw_ad_faq
ON DUPLICATE KEY UPDATE
    question = VALUES(question);

-- Migrate property floor plans
INSERT INTO mpinv_new.mw_ad_floor_plan (id, ad_id, title, image, bedrooms, bathrooms, area, price, sort_order)
SELECT id, ad_id, title, image, bedrooms, bathrooms, area, price, COALESCE(sort_order, 0)
FROM mpinv.mw_ad_floor_plan
ON DUPLICATE KEY UPDATE
    title = VALUES(title);

-- Migrate projects (offplan)
INSERT INTO mpinv_new.mw_projectlist (id, name, slug, description, short_description, developer_id, community_id, sub_community_id, category_id, featured_image, gallery, starting_price, price, bedrooms, bathrooms, builtup_area, project_status, completion_date, payment_plan, highlights, amenities, latitude, longitude, address, video_url, virtual_tour, brochure, status, featured, sort_order, meta_title, meta_description, meta_keywords)
SELECT id, name, slug, description, short_description, developer_id, community_id, sub_community_id, category_id, featured_image, gallery, starting_price, price, bedrooms, bathrooms, builtup_area, project_status, completion_date, payment_plan, highlights, amenities, latitude, longitude, address, video_url, virtual_tour, brochure, status, COALESCE(featured, 0), COALESCE(sort_order, 0), meta_title, meta_description, meta_keywords
FROM mpinv.mw_projectlist
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    slug = VALUES(slug);

-- Migrate admin users
INSERT INTO mpinv_new.mw_user (id, username, email, password, first_name, last_name, phone, avatar, role, status, auth_key, password_reset_token, last_login)
SELECT id, username, email, password, first_name, last_name, phone, avatar, COALESCE(role, 'admin'), status, auth_key, password_reset_token, last_login
FROM mpinv.mw_user
ON DUPLICATE KEY UPDATE
    username = VALUES(username),
    email = VALUES(email);

-- Migrate listing users
INSERT INTO mpinv_new.mw_listing_users (id, name, email, password, phone, company, avatar, bio, user_type, status, is_verified, verification_token, password_reset_token, last_login)
SELECT id, name, email, password, phone, company, avatar, bio, user_type, status, COALESCE(is_verified, 0), verification_token, password_reset_token, last_login
FROM mpinv.mw_listing_users
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    email = VALUES(email);

-- Migrate articles
INSERT INTO mpinv_new.mw_article (id, title, slug, excerpt, content, featured_image, author_id, category_id, tags, views, status, featured, published_at, meta_title, meta_description, meta_keywords)
SELECT id, title, slug, excerpt, content, featured_image, author_id, category_id, tags, COALESCE(views, 0), status, COALESCE(featured, 0), published_at, meta_title, meta_description, meta_keywords
FROM mpinv.mw_article
ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    slug = VALUES(slug);

-- Migrate settings/options
INSERT INTO mpinv_new.mw_option (id, option_key, option_value, option_group, option_type, label, description, sort_order)
SELECT id, option_key, option_value, option_group, option_type, label, description, COALESCE(sort_order, 0)
FROM mpinv.mw_option
ON DUPLICATE KEY UPDATE
    option_value = VALUES(option_value);

-- Migrate contact submissions
INSERT INTO mpinv_new.mw_contact_us (id, name, email, phone, subject, message, source, property_id, project_id, is_read, is_replied, reply, replied_at, ip_address, user_agent)
SELECT id, name, email, phone, subject, message, source, property_id, project_id, COALESCE(is_read, 0), COALESCE(is_replied, 0), reply, replied_at, ip_address, user_agent
FROM mpinv.mw_contact_us
ON DUPLICATE KEY UPDATE
    name = VALUES(name);

-- Migrate banners
INSERT INTO mpinv_new.mw_banner (id, title, subtitle, image, mobile_image, link, link_target, button_text, position, status, sort_order, start_date, end_date)
SELECT id, title, subtitle, image, mobile_image, link, link_target, button_text, position, status, COALESCE(sort_order, 0), start_date, end_date
FROM mpinv.mw_banner
ON DUPLICATE KEY UPDATE
    title = VALUES(title);

-- Migrate teams
INSERT INTO mpinv_new.mw_teams (id, name, slug, designation, bio, image, email, phone, whatsapp, linkedin, facebook, instagram, twitter, languages, status, featured, sort_order, meta_title, meta_description)
SELECT id, name, slug, designation, bio, image, email, phone, whatsapp, linkedin, facebook, instagram, twitter, languages, status, COALESCE(featured, 0), COALESCE(sort_order, 0), meta_title, meta_description
FROM mpinv.mw_teams
ON DUPLICATE KEY UPDATE
    name = VALUES(name);

-- Migrate FAQs
INSERT INTO mpinv_new.mw_faq (id, question, answer, category, status, sort_order)
SELECT id, question, answer, category, status, COALESCE(sort_order, 0)
FROM mpinv.mw_faq
ON DUPLICATE KEY UPDATE
    question = VALUES(question);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verification queries
SELECT 'Migration Complete!' AS status;
SELECT 'Categories' AS table_name, COUNT(*) AS count FROM mpinv_new.mw_category
UNION ALL SELECT 'Subcategories', COUNT(*) FROM mpinv_new.mw_subcategory
UNION ALL SELECT 'Communities', COUNT(*) FROM mpinv_new.mw_community
UNION ALL SELECT 'Sub-communities', COUNT(*) FROM mpinv_new.mw_sub_community
UNION ALL SELECT 'Developers', COUNT(*) FROM mpinv_new.mw_developers
UNION ALL SELECT 'Amenities', COUNT(*) FROM mpinv_new.mw_amenities
UNION ALL SELECT 'Properties', COUNT(*) FROM mpinv_new.mw_place_an_ad
UNION ALL SELECT 'Property Images', COUNT(*) FROM mpinv_new.mw_ad_image
UNION ALL SELECT 'Projects', COUNT(*) FROM mpinv_new.mw_projectlist
UNION ALL SELECT 'Users', COUNT(*) FROM mpinv_new.mw_user
UNION ALL SELECT 'Articles', COUNT(*) FROM mpinv_new.mw_article
UNION ALL SELECT 'Settings', COUNT(*) FROM mpinv_new.mw_option
UNION ALL SELECT 'Contacts', COUNT(*) FROM mpinv_new.mw_contact_us
UNION ALL SELECT 'Teams', COUNT(*) FROM mpinv_new.mw_teams;
