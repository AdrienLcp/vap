CREATE TYPE "public"."Role" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN');--> statement-breakpoint
CREATE TYPE "public"."OrderStatus" AS ENUM('CANCELLED', 'COMPLETED', 'PAID', 'PENDING', 'SHIPPED');--> statement-breakpoint
CREATE TYPE "public"."ProductStatus" AS ENUM('ACTIVE', 'INACTIVE', 'FEATURED');--> statement-breakpoint
CREATE TABLE "addresses" (
	"city" text NOT NULL,
	"country" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"isDefault" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"postalCode" text NOT NULL,
	"street" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"accessToken" text,
	"accessTokenExpiresAt" timestamp,
	"accountId" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"idToken" text,
	"password" text,
	"providerId" text NOT NULL,
	"refreshToken" text,
	"refreshTokenExpiresAt" timestamp,
	"scope" text,
	"updatedAt" timestamp NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"createdAt" timestamp NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"ipAddress" text,
	"token" text NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"createdAt" timestamp NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"image" text,
	"name" text NOT NULL,
	"role" "Role" DEFAULT 'USER' NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"createdAt" timestamp,
	"expiresAt" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"updatedAt" timestamp,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"productId" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT "cart_items_productId_userId_pk" PRIMARY KEY("productId","userId")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"id" uuid PRIMARY KEY NOT NULL,
	"imageUrl" text,
	"name" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"orderId" uuid NOT NULL,
	"price" double precision NOT NULL,
	"productId" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"shippingAddressId" uuid NOT NULL,
	"status" "OrderStatus" DEFAULT 'PENDING' NOT NULL,
	"stripeCheckoutSessionId" text,
	"stripePaymentIntentId" text,
	"totalPrice" double precision NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"categoryId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"discountedPrice" double precision,
	"id" uuid PRIMARY KEY NOT NULL,
	"imageUrl" text,
	"name" text NOT NULL,
	"price" double precision NOT NULL,
	"salesCount" integer DEFAULT 0 NOT NULL,
	"sku" text NOT NULL,
	"status" "ProductStatus" DEFAULT 'ACTIVE' NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_addresses_id_fk" FOREIGN KEY ("shippingAddressId") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_key" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_name_key" ON "categories" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_stripeCheckoutSessionId_key" ON "orders" USING btree ("stripeCheckoutSessionId");--> statement-breakpoint
CREATE UNIQUE INDEX "orders_stripePaymentIntentId_key" ON "orders" USING btree ("stripePaymentIntentId");--> statement-breakpoint
CREATE UNIQUE INDEX "products_sku_key" ON "products" USING btree ("sku");