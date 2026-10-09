// Shown while a staff page reads who is signed in. Moving between staff pages
// keeps the menu in place, so each page needs its own placeholder here rather
// than relying on the one around the whole staff area.
export default function Loading() {
  const block = "animate-pulse rounded-card bg-muted motion-reduce:animate-none";

  return (
    <div role="status" aria-label="Loading" className="flex flex-col gap-6">
      <div className={`${block} h-16 max-w-[420px]`} />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className={`${block} h-[260px]`} />
        <div className={`${block} h-[260px]`} />
      </div>
    </div>
  );
}
