import "server-only";

type Email = { to: string; subject: string; text: string };

/**
 * Sends account emails (invitations, password resets). No mail provider is
 * connected yet, so messages are printed to the server log; a provider must be
 * wired in here before launch (docs/milestones.md, M11).
 */
export async function sendEmail({ to, subject, text }: Email): Promise<void> {
  console.log(`\n--- email (not sent: no mail provider configured) ---\nTo: ${to}\nSubject: ${subject}\n\n${text}\n---\n`);
}
