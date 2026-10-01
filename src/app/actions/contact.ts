"use server";

export interface ContactState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContactAction(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const firstName = (formData.get("firstName") as string)?.trim() || "";
  const lastName = (formData.get("lastName") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const subject = (formData.get("subject") as string)?.trim() || "";
  const message = (formData.get("message") as string)?.trim() || "";

  const errors: Record<string, string> = {};
  if (!email || !email.includes("@")) {
    errors.email = "Please provide a valid email address.";
  }
  if (!subject) {
    errors.subject = "Please provide a subject line.";
  }
  if (!message || message.length < 5) {
    errors.message = "Please write a message with at least 5 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors,
    };
  }

  console.info(`⚡ [Next.js Server Action] Received direct server-side contact mutation from ${email}: "${subject}"`);

  return {
    success: true,
    message: "Thank you! Your message was transmitted via Next.js Server Action. Habtamu will reply soon.",
  };
}
