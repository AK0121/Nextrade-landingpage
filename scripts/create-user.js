import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase Client Initialization
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 👤 User details
const name = "Admin";
const email = "admin@nextrade.com";
const password = "rahul8888";

async function createUser() {
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ✅ Ensures the user is confirmed and can log in
      user_metadata: {
        name,
        role: "admin",
      },
    });

    if (error) {
      console.error("❌ Error creating user:", error);
    } else {
      console.log("✅ Admin user created successfully:", data);
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

createUser();
