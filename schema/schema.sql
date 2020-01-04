-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "calendar" (
    "listing_id" INTEGER   NOT NULL,
    "date" DATE   NOT NULL,
    "available" BOOLEAN   NULL,
    "price" NUMERIC   NULL,
    "adjusted_price" NUMERIC   NULL,
    "minimum_nights" INTEGER   NULL,
    "maximum_nights" INTEGER   NULL,
    CONSTRAINT "pk_calendar" PRIMARY KEY (
        "listing_id","date"
     )
);

CREATE TABLE "neighbourhoods" (
    "neighbourhood_group" VARCHAR   NULL,
    "neighbourhood" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_neighbourhoods" PRIMARY KEY (
        "neighbourhood"
     )
);

CREATE TABLE "reviews" (
    "listing_id" INTEGER   NOT NULL,
    "date" DATE   NULL,
    CONSTRAINT "pk_reviews" PRIMARY KEY (
        "listing_id"
     )
);

CREATE TABLE "listings" (
    "id" INTEGER   NOT NULL,
    "name" VARCHAR   NULL,
    "host_id" INTEGER   NULL,
    "host_name" VARCHAR   NULL,
    "neighbourhood_group" VARCHAR   NULL,
    "neighbourhood" VARCHAR   NULL,
    "latitude" DECIMAL   NULL,
    "longitude" DECIMAL   NULL,
    "room_type" VARCHAR   NULL,
    "price" NUMERIC   NULL,
    "minimum_nights" INTEGER   NULL,
    "number_of_reviews" INTEGER   NULL,
    "last_review" DATE   NULL,
    "reviews_per_month" FLOAT   NULL,
    "calculated_host_listings_count" FLOAT   NULL,
    "availability_365" INTEGER   NULL,
    CONSTRAINT "pk_listings" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "reviews_full" (
    "listing_id" INTEGER   NULL,
    "id" INTEGER   NOT NULL,
    "date" DATE   NULL,
    "reviewer_id" INTEGER   NULL,
    "reviewer_name" VARCHAR   NULL,
    "comments" TEXT   NULL,
    CONSTRAINT "pk_reviews_full" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "listings_full" (
    "id" INTEGER   NOT NULL,
    "listing_url" TEXT   NULL,
    "scrape_id" BIGINT   NULL,
    "last_scraped" DATE   NULL,
    "name" VARCHAR   NULL,
    "summary" TEXT   NULL,
    "space" TEXT   NULL,
    "description" TEXT   NULL,
    "experiences_offered" BOOLEAN   NULL,
    "neighborhood_overview" TEXT   NULL,
    "notes" TEXT   NULL,
    "transit" TEXT   NULL,
    "access" TEXT   NULL,
    "interaction" TEXT   NULL,
    "house_rules" TEXT   NULL,
    "thumbnail_url" TEXT   NULL,
    "medium_url" TEXT   NULL,
    "picture_url" TEXT   NULL,
    "xl_picture_url" TEXT   NULL,
    "host_id" INTEGER   NULL,
    "host_url" TEXT   NULL,
    "host_name" VARCHAR   NULL,
    "host_since" DATE   NULL,
    "host_location" VARCHAR   NULL,
    "host_about" TEXT   NULL,
    "host_response_time" VARCHAR   NULL,
    "host_response_rate" FLOAT   NULL,
    "host_acceptance_rate" FLOAT   NULL,
    "host_is_superhost" BOOLEAN   NULL,
    "host_thumbnail_url" TEXT   NULL,
    "host_picture_url" TEXT   NULL,
    "host_neighbourhood" VARCHAR   NULL,
    "host_listings_count" INTEGER   NULL,
    "host_total_listings_count" INTEGER   NULL,
    "host_verifications" TEXT[]   NULL,
    "host_has_profile_pic" BOOLEAN   NULL,
    "host_identity_verified" BOOLEAN   NULL,
    "street" VARCHAR   NULL,
    "neighbourhood" VARCHAR   NULL,
    "neighbourhood_cleansed" VARCHAR   NULL,
    "neighbourhood_group_cleansed" VARCHAR   NULL,
    "city" VARCHAR   NULL,
    "state" VARCHAR   NULL,
    "zipcode" VARCHAR   NULL,
    "market" VARCHAR   NULL,
    "smart_location" VARCHAR   NULL,
    "country_code" VARCHAR   NULL,
    "country" VARCHAR   NULL,
    "latitude" DECIMAL   NULL,
    "longitude" DECIMAL   NULL,
    "is_location_exact" BOOLEAN   NULL,
    "property_type" VARCHAR   NULL,
    "room_type" VARCHAR   NULL,
    "accommodates" INTEGER   NULL,
    "bathrooms" FLOAT   NULL,
    "bedrooms" INTEGER   NULL,
    "beds" INTEGER   NULL,
    "bed_type" VARCHAR   NULL,
    "amenities" TEXT[]   NULL,
    "square_feet" INTEGER   NULL,
    "price" NUMERIC   NULL,
    "weekly_price" NUMERIC   NULL,
    "monthly_price" NUMERIC   NULL,
    "security_deposit" NUMERIC   NULL,
    "cleaning_fee" NUMERIC   NULL,
    "guests_included" INTEGER   NULL,
    "extra_people" NUMERIC   NULL,
    "minimum_nights" INTEGER   NULL,
    "maximum_nights" INTEGER   NULL,
    "minimum_minimum_nights" INTEGER   NULL,
    "maximum_minimum_nights" INTEGER   NULL,
    "minimum_maximum_nights" INTEGER   NULL,
    "maximum_maximum_nights" INTEGER   NULL,
    "minimum_nights_avg_ntm" FLOAT   NULL,
    "maximum_nights_avg_ntm" FLOAT   NULL,
    "calendar_updated" VARCHAR   NULL,
    "has_availability" BOOLEAN   NULL,
    "availability_30" INTEGER   NULL,
    "availability_60" INTEGER   NULL,
    "availability_90" INTEGER   NULL,
    "availability_365" INTEGER   NULL,
    "calendar_last_scraped" DATE   NULL,
    "number_of_reviews" INTEGER   NULL,
    "number_of_reviews_ltm" INTEGER   NULL,
    "first_review" DATE   NULL,
    "last_review" DATE   NULL,
    "review_scores_rating" INTEGER   NULL,
    "review_scores_accuracy" INTEGER   NULL,
    "review_scores_cleanliness" INTEGER   NULL,
    "review_scores_checkin" INTEGER   NULL,
    "review_scores_communication" INTEGER   NULL,
    "review_scores_location" INTEGER   NULL,
    "review_scores_value" INTEGER   NULL,
    "requires_license" BOOLEAN   NULL,
    "license" VARCHAR   NULL,
    "jurisdiction_names" TEXT[]   NULL,
    "instant_bookable" BOOLEAN   NULL,
    "is_business_travel_ready" BOOLEAN   NULL,
    "cancellation_policy" VARCHAR   NULL,
    "require_guest_profile_picture" BOOLEAN   NULL,
    "require_guest_phone_verification" BOOLEAN   NULL,
    "calculated_host_listings_count" INTEGER   NULL,
    "calculated_host_listings_count_entire_homes" INTEGER   NULL,
    "calculated_host_listings_count_private_rooms" INTEGER   NULL,
    "calculated_host_listings_count_shared_rooms" INTEGER   NULL,
    "reviews_per_month" FLOAT   NULL,
    CONSTRAINT "pk_listings_full" PRIMARY KEY (
        "id"
     )
);

