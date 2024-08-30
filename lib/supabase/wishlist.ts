"use server";

import { createClient } from "@/lib/supabase/server";

export async function addWishlist(email: string) {
  "use server";

  const supabase = createClient();
  await supabase.from("email_wishlist").insert({ email: email });
}
