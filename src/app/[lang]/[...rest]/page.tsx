import { notFound } from "next/navigation";

// Sends unknown URLs to the localized not-found page inside the site shell.
export default function CatchAll() {
  notFound();
}
