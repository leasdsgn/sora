import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.1em] transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
  {
    variants: {
      variant: {
        default:
          "rounded-none border-transparent bg-primary text-primary-foreground",
        secondary:
          "rounded-none border-border bg-secondary text-secondary-foreground",
        destructive:
          "rounded-none border-transparent bg-destructive text-destructive-foreground",
        outline:
          "rounded-none border-border text-foreground bg-transparent",
        pill:
          "rounded-full border-border bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
