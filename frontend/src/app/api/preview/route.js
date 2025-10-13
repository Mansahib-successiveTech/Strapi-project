import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const url = searchParams.get("url");
  const status = searchParams.get("status");

  // Check the secret matches
  if (secret !== "my-secret-key") {
    return new Response("Invalid token", { status: 401 });
  }

  
   // Await draftMode() before using it
  const draft = await draftMode()

  if (status === "PUBLISHED") {
    await draft.disable(); // disable draft mode for published content
  } else {
    await draft.enable(); // enable draft mode for drafts
  }
  redirect(url || "/");
}
