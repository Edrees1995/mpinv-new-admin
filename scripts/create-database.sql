-- Create new database for MPINV Admin Panel
-- Run this on MySQL server

-- Create database
CREATE DATABASE IF NOT EXISTS mpinv_new CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the new database
USE mpinv_new;

-- Categories table
CREATE TABLE IF NOT EXISTS mw_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    icon VARCHAR(255),
    description TEXT,
    status TINYINT DEFAULT 1,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Subcategories table
CREATE TABLE IF NOT EXISTS mw_subcategory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    category_id INT,
    description TEXT,
    status TINYINT DEFAULT 1,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    FOREIGN KEY (category_id) REFERENCES mw_category(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Communities table
CREATE TABLE IF NOT EXISTS mw_community (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    banner_image VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status TINYINT DEFAULT 1,
    featured TINYINT DEFAULT 0,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sub-communities table
CREATE TABLE IF NOT EXISTS mw_sub_community (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    community_id INT,
    description TEXT,
    image VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status TINYINT DEFAULT 1,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_community (community_id),
    INDEX idx_status (status),
    FOREIGN KEY (community_id) REFERENCES mw_community(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Developers table
CREATE TABLE IF NOT EXISTS mw_developers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    description TEXT,
    logo VARCHAR(255),
    banner_image VARCHAR(255),
    website VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(50),
    address TEXT,
    established_year INT,
    projects_count INT DEFAULT 0,
    status TINYINT DEFAULT 1,
    featured TINYINT DEFAULT 0,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Amenities table
CREATE TABLE IF NOT EXISTS mw_amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    icon VARCHAR(255),
    icon_type VARCHAR(50),
    description TEXT,
    category VARCHAR(50),
    status TINYINT DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Properties table (mw_place_an_ad)
CREATE TABLE IF NOT EXISTS mw_place_an_ad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255),
    description TEXT,
    price DECIMAL(15, 2),
    purpose VARCHAR(50),
    property_type VARCHAR(50),
    bedrooms INT,
    bathrooms INT,
    area DECIMAL(10, 2),
    builtup_area DECIMAL(10, 2),
    address VARCHAR(255),
    city VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    category_id INT,
    subcategory_id INT,
    community_id INT,
    sub_community_id INT,
    featured_image VARCHAR(255),
    reference_no VARCHAR(50),
    status TINYINT DEFAULT 1,
    featured TINYINT DEFAULT 0,
    is_offplan TINYINT DEFAULT 0,
    video_url VARCHAR(255),
    virtual_tour VARCHAR(255),
    agent_id INT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_category (category_id),
    INDEX idx_community (community_id),
    INDEX idx_slug (slug),
    INDEX idx_purpose (purpose),
    FOREIGN KEY (category_id) REFERENCES mw_category(id) ON DELETE SET NULL,
    FOREIGN KEY (subcategory_id) REFERENCES mw_subcategory(id) ON DELETE SET NULL,
    FOREIGN KEY (community_id) REFERENCES mw_community(id) ON DELETE SET NULL,
    FOREIGN KEY (sub_community_id) REFERENCES mw_sub_community(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Property images table
CREATE TABLE IF NOT EXISTS mw_ad_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_id INT,
    image VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255),
    alt_text VARCHAR(255),
    sort_order INT DEFAULT 0,
    is_featured TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ad (ad_id),
    FOREIGN KEY (ad_id) REFERENCES mw_place_an_ad(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Property amenities junction table
CREATE TABLE IF NOT EXISTS mw_ad_amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_id INT,
    amenity_id INT,
    INDEX idx_ad (ad_id),
    INDEX idx_amenity (amenity_id),
    FOREIGN KEY (ad_id) REFERENCES mw_place_an_ad(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES mw_amenities(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Property FAQs table
CREATE TABLE IF NOT EXISTS mw_ad_faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_id INT,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ad (ad_id),
    FOREIGN KEY (ad_id) REFERENCES mw_place_an_ad(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Property floor plans table
CREATE TABLE IF NOT EXISTS mw_ad_floor_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_id INT,
    title VARCHAR(255),
    image VARCHAR(255) NOT NULL,
    bedrooms INT,
    bathrooms INT,
    area DECIMAL(10, 2),
    price DECIMAL(15, 2),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ad (ad_id),
    FOREIGN KEY (ad_id) REFERENCES mw_place_an_ad(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects table (offplan projects)
CREATE TABLE IF NOT EXISTS mw_projectlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    description TEXT,
    short_description TEXT,
    developer_id INT,
    community_id INT,
    sub_community_id INT,
    category_id INT,
    featured_image VARCHAR(255),
    gallery TEXT,
    starting_price DECIMAL(15, 2),
    price DECIMAL(15, 2),
    bedrooms VARCHAR(50),
    bathrooms VARCHAR(50),
    builtup_area DECIMAL(10, 2),
    project_status VARCHAR(100),
    completion_date VARCHAR(100),
    payment_plan TEXT,
    highlights TEXT,
    amenities TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address VARCHAR(255),
    video_url VARCHAR(255),
    virtual_tour VARCHAR(255),
    brochure VARCHAR(255),
    status TINYINT DEFAULT 1,
    featured TINYINT DEFAULT 0,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_developer (developer_id),
    INDEX idx_community (community_id),
    INDEX idx_slug (slug),
    FOREIGN KEY (developer_id) REFERENCES mw_developers(id) ON DELETE SET NULL,
    FOREIGN KEY (community_id) REFERENCES mw_community(id) ON DELETE SET NULL,
    FOREIGN KEY (sub_community_id) REFERENCES mw_sub_community(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES mw_category(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin users table
CREATE TABLE IF NOT EXISTS mw_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    avatar VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    status TINYINT DEFAULT 1,
    auth_key VARCHAR(255),
    password_reset_token VARCHAR(255),
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_username (username),
    UNIQUE KEY unique_email (email),
    INDEX idx_status (status),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Frontend/listing users table
CREATE TABLE IF NOT EXISTS mw_listing_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    avatar VARCHAR(255),
    bio TEXT,
    user_type VARCHAR(50),
    status TINYINT DEFAULT 1,
    is_verified TINYINT DEFAULT 0,
    verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_email (email),
    INDEX idx_status (status),
    INDEX idx_user_type (user_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Articles/blog table
CREATE TABLE IF NOT EXISTS mw_article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    excerpt TEXT,
    content LONGTEXT,
    featured_image VARCHAR(255),
    author_id INT,
    category_id INT,
    tags TEXT,
    views INT DEFAULT 0,
    status TINYINT DEFAULT 1,
    featured TINYINT DEFAULT 0,
    published_at DATETIME,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug),
    INDEX idx_author (author_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Settings/options table
CREATE TABLE IF NOT EXISTS mw_option (
    id INT AUTO_INCREMENT PRIMARY KEY,
    option_key VARCHAR(100) NOT NULL,
    option_value TEXT,
    option_group VARCHAR(50),
    option_type VARCHAR(50),
    label VARCHAR(255),
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_key (option_key),
    INDEX idx_group (option_group)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact submissions table
CREATE TABLE IF NOT EXISTS mw_contact_us (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    source VARCHAR(50),
    property_id INT,
    project_id INT,
    is_read TINYINT DEFAULT 0,
    is_replied TINYINT DEFAULT 0,
    reply TEXT,
    replied_at DATETIME,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_is_read (is_read),
    INDEX idx_source (source),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Banners table
CREATE TABLE IF NOT EXISTS mw_banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    subtitle TEXT,
    image VARCHAR(255) NOT NULL,
    mobile_image VARCHAR(255),
    link VARCHAR(500),
    link_target VARCHAR(50),
    button_text VARCHAR(100),
    position VARCHAR(50) NOT NULL,
    status TINYINT DEFAULT 1,
    sort_order INT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_position (position)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Teams table
CREATE TABLE IF NOT EXISTS mw_teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(255),
    designation VARCHAR(100),
    bio TEXT,
    image VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    linkedin VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    twitter VARCHAR(255),
    languages VARCHAR(50),
    status TINYINT DEFAULT 1,
    featured TINYINT DEFAULT 0,
    sort_order INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- General FAQs table
CREATE TABLE IF NOT EXISTS mw_faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50),
    status TINYINT DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - bcrypt hashed)
INSERT INTO mw_user (username, email, password, first_name, last_name, role, status) VALUES
('admin', 'admin@mpinv.cloud', '$2b$10$rOzJqQZQm7FLXmKJw.2EWuL.TQhPLqL8Lv.QNvX9tQMwvxL1VZqKy', 'Admin', 'User', 'admin', 1)
ON DUPLICATE KEY UPDATE id=id;

-- Insert default settings
INSERT INTO mw_option (option_key, option_value, option_group, option_type, label) VALUES
('site_name', 'Masterpiece Property', 'general', 'text', 'Site Name'),
('site_logo', '/images/logo.png', 'general', 'image', 'Site Logo'),
('site_email', 'info@mpinv.cloud', 'general', 'text', 'Site Email'),
('site_phone', '+971 4 XXX XXXX', 'general', 'text', 'Site Phone'),
('site_address', 'Dubai, UAE', 'general', 'textarea', 'Site Address'),
('facebook_url', 'https://facebook.com/', 'social', 'text', 'Facebook URL'),
('instagram_url', 'https://instagram.com/', 'social', 'text', 'Instagram URL'),
('twitter_url', 'https://twitter.com/', 'social', 'text', 'Twitter URL'),
('linkedin_url', 'https://linkedin.com/', 'social', 'text', 'LinkedIn URL'),
('youtube_url', 'https://youtube.com/', 'social', 'text', 'YouTube URL')
ON DUPLICATE KEY UPDATE id=id;

SELECT 'Database mpinv_new created successfully!' AS message;
