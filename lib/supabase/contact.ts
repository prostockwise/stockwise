"use server";

import { createClient } from "@/lib/supabase/server";

export async function addContactMessage(
  name: string,
  email: string,
  message: string,
) {
  "use server";

  const supabase = createClient();
  await supabase
    .from("email_contact")
    .insert({ name: name, email: email, message: message });
}
