import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getAuthenticatedUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return { supabase, user };
}
