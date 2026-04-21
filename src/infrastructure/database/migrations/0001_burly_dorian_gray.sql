ALTER TABLE "orders" ADD COLUMN "shippingCost" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "stripeCustomerId" text;--> statement-breakpoint
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users" USING btree ("stripeCustomerId");