"use server";

import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactState = {
  error: string | null;
  success: string | null;
};

export async function submitContact(prevState: any, formData: FormData): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const details = formData.get("details") as string;

  if (!name || !email || !details) {
    return {
      error: "Please fill out all fields.",
      success: null,
    };
  }

  try {
    // 1. Save to Supabase Database
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && supabaseUrl.startsWith("http")) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([{ name, email, details }]);
        
      if (dbError) {
        console.error("Supabase Error:", dbError);
        // We log the error but still try to send the email
      } else {
        console.log("Successfully saved contact to Supabase database.");
      }
    } else {
      console.log("Skipping Database Insert: Supabase credentials not configured yet.");
    }

    // 2. Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Testing email provided by Resend
      to: [process.env.CONTACT_EMAIL || "team.abhinavan@gmail.com"], // Your destination email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nProject Details:\n${details}`,
    });

    if (error) {
      console.error("Resend Error:", error);
      return {
        error: "Failed to send message. Please try again later.",
        success: null,
      };
    }

    console.log("Email sent successfully:", data);

    return {
      error: null,
      success: "Message received! We'll get back to you shortly.",
    };
  } catch (error) {
    console.error("Server Error:", error);
    return {
      error: "An unexpected error occurred.",
      success: null,
    };
  }
}
