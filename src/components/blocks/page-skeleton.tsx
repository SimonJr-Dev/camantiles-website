/**
 * Shown for a moment while a detail page (a school, an announcement) loads its
 * content. Shapes only, so it needs no translation.
 */
function PageSkeleton() {
  const block = "animate-pulse rounded-card bg-muted motion-reduce:animate-none"

  return (
    <div aria-hidden className="flex flex-col gap-5">
      <div className="h-[380px] animate-pulse rounded-panel bg-muted motion-reduce:animate-none" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        <div className={`${block} h-[84px]`} />
        <div className={`${block} h-[84px]`} />
        <div className={`${block} h-[84px]`} />
      </div>
      <div className={`${block} h-[320px]`} />
    </div>
  )
}

export { PageSkeleton }
