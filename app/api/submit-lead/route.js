import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
    try {
  const body = await request.json();

  const { name, email, phone, interest, message } = body;

  if (!name || !email || !phone || !interest || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const { error } = await supabase
    .from("nextrade_leads")
    .insert([{ name, email, phone, interest, message }]);

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to insert lead" }, { status: 500 });
  }
  return NextResponse.json(
    { message: "Lead submitted successfully" },
    { status: 200 }
  )
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
