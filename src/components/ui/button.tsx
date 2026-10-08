import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Also applied to links: <Link className={buttonVariants({ variant: "accent" })}>
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap no-underline transition-colors select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        dark: "bg-inverse text-white hover:bg-inverse/90",
        white: "bg-card text-foreground shadow-[0_1px_2px_rgb(11_23_18/0.06)] hover:bg-muted",
        "on-dark": "bg-white/10 text-white hover:bg-white/20",
      },
      size: {
        default: "px-[22px] py-3.5 text-[15px] [&_svg]:size-[18px]",
        sm: "px-[18px] py-[11px] text-sm [&_svg]:size-4",
        // Larger tap target and text, used on the Senior Citizens page.
        lg: "px-6 py-4 text-[17px] [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
