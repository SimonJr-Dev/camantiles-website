import { Fragment } from "react"

import type { Rich } from "@/content"
import type { Locale } from "@/sites/types"

const marks = {
  strong: "font-bold",
  em: "italic",
  gold: "text-accent",
  green: "text-link",
} as const

/** Renders runs of styled text in the given language. */
function RichText({ value, locale }: { value: Rich; locale: Locale }) {
  return value.map((run, index) => {
    if ("break" in run) return <br key={index} />
    const text = run.text[locale]
    if (!run.mark) return <Fragment key={index}>{text}</Fragment>
    const Element = run.mark === "strong" ? "strong" : run.mark === "em" ? "i" : "span"
    return (
      <Element key={index} className={marks[run.mark]}>
        {text}
      </Element>
    )
  })
}

export { RichText }
