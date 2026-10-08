import { cn } from "@/lib/utils"

/**
 * A downloadable file with a format badge. Until the file exists it renders as
 * a plain row; callers decide whether to show such rows at all.
 */
function DocumentRow({
  title,
  file,
  format,
  pendingLabel,
  badgeClassName = "bg-primary",
}: {
  title: string
  file: string | null
  format: string
  pendingLabel: string
  badgeClassName?: string
}) {
  const className =
    "flex items-center justify-between gap-3 rounded-2xl bg-background px-[18px] py-4 text-[15px] font-semibold text-foreground no-underline"
  const content = (
    <>
      <span>{title}</span>
      <span className={cn("rounded-lg px-2 py-1 text-[11px] font-bold text-white", badgeClassName)}>
        {format}
      </span>
    </>
  )

  return file ? (
    <a href={file} download className={cn(className, "transition-colors hover:bg-muted")}>
      {content}
    </a>
  ) : (
    <div title={pendingLabel} className={className}>
      {content}
    </div>
  )
}

export { DocumentRow }
