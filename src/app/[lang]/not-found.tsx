import Link from "next/link";
import { lang } from "next/root-params";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDictionary } from "@/i18n";
import { siteHref } from "@/lib/href";
import { getSite, hasLocale } from "@/sites";

export default async function NotFound() {
  const site = getSite();
  if (!site) return null;
  const requested = await lang();
  const locale = hasLocale(site, requested) ? requested : site.defaultLocale;
  const dict = await getDictionary(site, locale);

  return (
    <Card className="flex flex-col items-start gap-5 p-8 sm:p-12">
      <h1 className="text-h1">{dict.notFound.title}</h1>
      <p className="max-w-[500px] text-lg leading-[1.6] text-muted-foreground">
        {dict.notFound.body}
      </p>
      <Link href={siteHref(site, locale)} className={buttonVariants()}>
        {dict.notFound.home}
      </Link>
    </Card>
  );
}
