
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
	insert into public.profiles (id)
	values (new.id);
	return new;
end;$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."random_string"("length" integer) RETURNS "text"
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$declare
  output text := '';
  i int4;
begin
for i in 1..length
loop
  output := output || substr(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      ceil(random() * 52)::integer,
      1
    );
end loop;
return output;
end;$$;

ALTER FUNCTION "public"."random_string"("length" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."party_comments" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid",
    "party_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."party_comments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profile_scheduled_party" (
    "user_id" "uuid" NOT NULL,
    "party_id" "uuid" NOT NULL
);

ALTER TABLE "public"."profile_scheduled_party" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "display_name" "text" DEFAULT "public"."random_string"(10)
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."scheduled_parties" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "start_time" timestamp with time zone NOT NULL,
    "tmdb_id" integer NOT NULL,
    "movie_runtime" smallint NOT NULL,
    "creator_id" "uuid" NOT NULL
);

ALTER TABLE "public"."scheduled_parties" OWNER TO "postgres";

ALTER TABLE ONLY "public"."party_comments"
    ADD CONSTRAINT "party_comments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."scheduled_parties"
    ADD CONSTRAINT "scheduled_parties_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."scheduled_parties"
    ADD CONSTRAINT "scheduled_parties_start_time_tmdb_id_key" UNIQUE ("start_time", "tmdb_id");

ALTER TABLE ONLY "public"."profile_scheduled_party"
    ADD CONSTRAINT "user_scheduled_party_pkey" PRIMARY KEY ("user_id", "party_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "users_display_name_key" UNIQUE ("display_name");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."party_comments"
    ADD CONSTRAINT "party_comments_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "public"."scheduled_parties"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."party_comments"
    ADD CONSTRAINT "party_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."profile_scheduled_party"
    ADD CONSTRAINT "profile_scheduled_party_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "public"."scheduled_parties"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profile_scheduled_party"
    ADD CONSTRAINT "profile_scheduled_party_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."scheduled_parties"
    ADD CONSTRAINT "scheduled_parties_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

CREATE POLICY "Enable all methods for users based on id" ON "public"."profile_scheduled_party" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON "public"."scheduled_parties" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."party_comments" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users" ON "public"."scheduled_parties" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for authenticated users only" ON "public"."party_comments" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable select for users based on id" ON "public"."profiles" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Enable update for user that created the scheduled party" ON "public"."scheduled_parties" FOR UPDATE USING (("auth"."uid"() = "creator_id")) WITH CHECK (true);

CREATE POLICY "Enable update for users based on id" ON "public"."profiles" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (true);

ALTER TABLE "public"."party_comments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profile_scheduled_party" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."scheduled_parties" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."random_string"("length" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."random_string"("length" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."random_string"("length" integer) TO "service_role";

GRANT ALL ON TABLE "public"."party_comments" TO "anon";
GRANT ALL ON TABLE "public"."party_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."party_comments" TO "service_role";

GRANT ALL ON TABLE "public"."profile_scheduled_party" TO "anon";
GRANT ALL ON TABLE "public"."profile_scheduled_party" TO "authenticated";
GRANT ALL ON TABLE "public"."profile_scheduled_party" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."scheduled_parties" TO "anon";
GRANT ALL ON TABLE "public"."scheduled_parties" TO "authenticated";
GRANT ALL ON TABLE "public"."scheduled_parties" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
