/**
* DB CREATION
* Note: Use only the first time.
*/
CREATE DATABASE harmonia; 
USE harmonia;

/**
* USER CREATION
* Note: this user is created with initials from alumni. Cannot collision
* with other user in the same DB.
*/
CREATE USER TFC_CSJ IDENTIFIED BY "abc123.";
GRANT ALL ON harmonia.* TO TFC_CSJ;

/**
* USERS
* Note: users are created and managed in Stripe and synced to our DB via Stripe webhooks.
* Note: this is only a mocked version for MySQL as the project is written in PostgreSQL(Stripe native)
*/
create table users (
  -- UUID
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Name with surname
  full_name text,
  -- url of the bucket with the file
  avatar_url text,
  -- The customer's billing address, stored in JSON format.
  billing_address text,
  -- Stores your customer's payment instruments.
  payment_method text
);

/**
* PRODUCTS
* Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
* Note: this is only a mocked version for MySQL as the project is written in PostgreSQL(Stripe native)
*/
create table products (
  -- Product ID
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Whether the product is currently available for purchase.
  active boolean,
  -- The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
  name text,
  -- The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
  description text,
  -- A URL of the product image in Stripe, meant to be displayable to the customer.
  image text,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata text
);

/**
* PRICES
* Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
* Note: this is only a mocked version for MySQL as the project is written in PostgreSQL(Stripe native)
*/
create table prices (
  -- Price ID
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- The ID of the prduct that this price belongs to.
  product_id int not null,
  -- Whether the price can be used for new purchases.
  active boolean,
  -- A brief description of the price.
  description text,
  -- The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).
  unit_amount int,
  -- Three-letter ISO currency code, in lowercase.
  currency char(3),
  -- One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
  pricing_type ENUM('one_time', 'recurring'),
  -- The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
  interval_type ENUM('day', 'week', 'month', 'year'),
  -- The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
  interval_count integer,
  -- Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
  trial_period_days integer,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata text,
  -- The constraint for the FK on product_id linked with the table products.
  FOREIGN KEY (product_id) REFERENCES products(id)
);

/**
* SUBSCRIPTIONS
* Note: subscriptions are created and managed in Stripe and synced to our DB via Stripe webhooks.
* Note: this is only a mocked version for MySQL as the project is written in PostgreSQL(Stripe native)
*/
create table subscriptions (
  -- Subscription ID
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- The user ID of the subscription belongs to
  user_id int not null,
  -- The status of the subscription object, one of subscription_status type above.
  subscription_status enum('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid'),
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata text,
  -- ID of the price that created this subscription.
  price_id int not null,
  -- Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats.
  quantity integer,
  -- If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancel_at_period_end boolean,
  -- Time at which the subscription was created.
  created timestamp not null,
  -- Start of the current period that the subscription has been invoiced for.
  current_period_start timestamp not null,
  -- End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  current_period_end timestamp not null,
  -- If the subscription has ended, the timestamp of the date the subscription ended.
  ended_at timestamp,
  -- A date in the future at which the subscription will automatically get canceled.
  cancel_at timestamp,
  -- If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceled_at timestamp,
  -- If the subscription has a trial, the beginning of that trial.
  trial_start timestamp,
  -- If the subscription has a trial, the end of that trial.
  trial_end timestamp,
    -- The constraint for the FK on user_id linked with the table users.
  FOREIGN KEY (user_id) REFERENCES users(id),
    -- The constraint for the FK on price_id linked with the table prices.
  FOREIGN KEY (price_id) REFERENCES prices(id)
);

/**
* SONGS
* Note: songs are created and managed in Stripe and synced to our DB via Stripe webhooks.
* Note: this is only a mocked version for MySQL as the project is written in PostgreSQL(Stripe native)
*/
create table songs (
     -- Song ID
  id INT AUTO_INCREMENT PRIMARY KEY,
   -- The moment when the song was uploaded
  created_at timestamp,
   -- Title of the song
  title text,
   -- The path to the song file stored in a bucket
  song_path text,
   -- The path to the image file stored in a bucket
  image_path text,
   -- Author of the song
  author text,
   -- The id of the user who updated the song
  user_id int not null,
   -- The constraint for the FK on user_id linked with the table users.
  FOREIGN KEY (user_id) REFERENCES users(id)  
);

/**
* LIKED SONGS
* Note: liked songs are created and managed in Stripe and synced to our DB via Stripe webhooks.
* Note: this is only a mocked version for MySQL as the project is written in PostgreSQL(Stripe native)
*/
create table liked_songs (
     -- User ID
    user_id int not null,
     -- Timestamp of the relation between song and user
    created_at timestamp,
     -- Song ID
    song_id int not null,
     -- The constraint for the creation of the compound primary key
    CONSTRAINT REL_LIKED_PK PRIMARY KEY (user_id, song_id),
     -- The constraint for the FK on user_id linked with the table users.
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
     -- The constraint for the FK on song_id linked with the table songs.
    CONSTRAINT fk_song
        FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE
);

/**
    Maybe needed to match Supabase functions 
    NOT implemented 02/04/2025

    CREATE TRIGGER handle_new_user
    AFTER INSERT
    ON users
    FOR EACH ROW
    BEGIN
        -- SQL statements
    END;
*/

-- Insert test users
INSERT INTO users (full_name, avatar_url, billing_address, payment_method) VALUES
('Carlos Pérez', 'https://example.com/avatar1.jpg', '{"country": "ES", "city": "Madrid"}', 'card_123456'),
('María López', 'https://example.com/avatar2.jpg', '{"country": "MX", "city": "CDMX"}', 'card_654321'),
('John Doe', 'https://example.com/avatar3.jpg', '{"country": "US", "city": "New York"}', 'card_987654'),
('Alice Smith', 'https://example.com/avatar4.jpg', '{"country": "UK", "city": "London"}', 'card_567890');

-- Insert test products
INSERT INTO products (active, name, description, image, metadata) VALUES
(true, 'Basic Plan', 'Access to standard content', 'https://example.com/product1.jpg', '{"category": "subscription"}'),
(true, 'Premium Plan', 'Access to all content', 'https://example.com/product2.jpg', '{"category": "subscription"}'),
(true, 'Family Plan', 'Access for up to 5 users', 'https://example.com/product3.jpg', '{"category": "subscription"}');

-- Insert test prices
INSERT INTO prices (product_id, active, description, unit_amount, currency, pricing_type, interval_type, interval_count, trial_period_days, metadata) VALUES
(1, true, 'Basic Monthly', 1000, 'usd', 'recurring', 'month', 1, 7, '{"discount": "none"}'),
(2, true, 'Premium Monthly', 2000, 'usd', 'recurring', 'month', 1, 7, '{"discount": "none"}'),
(3, true, 'Family Monthly', 5000, 'usd', 'recurring', 'month', 1, 14, '{"discount": "10% off"}');

-- Insert test subscriptions
INSERT INTO subscriptions (user_id, subscription_status, metadata, price_id, quantity, cancel_at_period_end, created, current_period_start, current_period_end) VALUES
(1, 'active', '{"auto_renew": "true"}', 1, 1, false, NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(2, 'trialing', '{"auto_renew": "false"}', 2, 1, false, NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(3, 'active', '{"auto_renew": "true"}', 3, 1, false, NOW(), NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH));

-- Insert test songs
INSERT INTO songs (created_at, title, song_path, image_path, author, user_id) VALUES
(NOW(), 'Song A', 'https://example.com/song1.mp3', 'https://example.com/image1.jpg', 'Author X', 1),
(NOW(), 'Song B', 'https://example.com/song2.mp3', 'https://example.com/image2.jpg', 'Author Y', 2),
(NOW(), 'Song C', 'https://example.com/song3.mp3', 'https://example.com/image3.jpg', 'Author Z', 3),
(NOW(), 'Song D', 'https://example.com/song4.mp3', 'https://example.com/image4.jpg', 'Author W', 4);

-- Insert test liked songs
INSERT INTO liked_songs (user_id, created_at, song_id) VALUES
(1, NOW(), 1),
(2, NOW(), 2),
(3, NOW(), 3),
(4, NOW(), 4);
