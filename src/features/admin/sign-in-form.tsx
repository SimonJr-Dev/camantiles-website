"use client"

import { useActionState, useState } from "react"
import { CircleAlert, Eye, EyeOff, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { signIn, type SignInState } from "./actions"

const field =
  "min-h-12 w-full rounded-2xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground"

function SignInForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {})
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={action} className="flex flex-col gap-5">
      {state.error ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-2xl bg-advisory px-4 py-3 text-[15px] font-semibold text-advisory-foreground"
        >
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={2.2} />
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[15px] font-bold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          defaultValue={state.email}
          aria-invalid={state.error ? true : undefined}
          className={field}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[15px] font-bold">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            aria-invalid={state.error ? true : undefined}
            className={`${field} pr-14`}
          />
          <button
            type="button"
            aria-pressed={showPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute top-1/2 right-1 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-subtle-foreground hover:bg-muted"
          >
            {showPassword ? (
              <EyeOff aria-hidden className="size-5" />
            ) : (
              <Eye aria-hidden className="size-5" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={pending} className="mt-1 cursor-pointer">
        {pending ? (
          <>
            <LoaderCircle aria-hidden className="animate-spin motion-reduce:animate-none" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  )
}

export { SignInForm }
