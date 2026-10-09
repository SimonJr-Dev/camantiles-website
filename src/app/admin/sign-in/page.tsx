import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SignInForm } from "@/features/admin/sign-in-form";
import { getSite } from "@/sites";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  const site = getSite();

  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel: the same green and gold ring as the public site's hero. */}
      <section className="relative flex flex-col justify-between gap-10 overflow-hidden bg-primary p-7 text-primary-foreground sm:p-12 lg:min-h-screen">
        <div
          aria-hidden
          className="absolute -right-[140px] -bottom-[180px] box-content size-[420px] rounded-full border-[64px] border-accent/12"
        />
        <div className="relative flex items-center gap-3.5">
          {site ? (
            <Image
              src={site.seal.src}
              alt=""
              width={64}
              height={64}
              priority
              className="size-14 rounded-full object-contain sm:size-16"
            />
          ) : null}
          <div className="flex flex-col">
            <span className="text-lg leading-tight font-extrabold tracking-[-0.02em]">
              {site?.name}
            </span>
            <span className="text-sm text-primary-soft-foreground">
              {site?.city.en}, {site?.province}
            </span>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 max-lg:hidden">
          <p className="text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] font-extrabold tracking-[-0.04em]">
            Keep your barangay
            <br />
            up to date.
          </p>
          <p className="max-w-[420px] text-lg leading-[1.6] text-primary-soft-foreground">
            Post announcements, schedules and notices for your office. What you publish here
            appears on the website for every resident.
          </p>
        </div>
        <span className="relative text-sm text-primary-soft-foreground max-lg:hidden">
          For barangay staff only.
        </span>
      </section>

      <section className="flex flex-col justify-center gap-8 px-5 py-10 sm:px-12">
        <div className="mx-auto flex w-full max-w-[420px] flex-col gap-7">
          <div className="flex flex-col gap-2">
            <h1 className="text-[clamp(1.75rem,3vw,2.25rem)] leading-tight font-extrabold">
              Staff sign in
            </h1>
            <p className="text-muted-foreground">Use the email and password your admin gave you.</p>
          </div>
          <SignInForm />
          <p className="rounded-2xl bg-muted p-4 text-sm leading-normal text-subtle-foreground">
            No account, or forgot your password? Ask your Barangay Admin. Accounts are created by
            invitation only.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back to the website
          </Link>
        </div>
      </section>
    </main>
  );
}
