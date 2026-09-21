CREATE TABLE "cms_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"content_type" varchar(40) NOT NULL,
	"slug" varchar(160) NOT NULL,
	"title" varchar(200) NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cms_entries_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "cms_entries_type_status_idx" ON "cms_entries" USING btree ("content_type","status");