import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/auth/auth";

// Sign-in, sign-out, password reset and two-step verification endpoints.
export const { GET, POST } = toNextJsHandler(auth);
