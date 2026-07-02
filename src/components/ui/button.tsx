import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-semibold text-[11px] uppercase tracking-[0.1em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-background hover:text-primary border border-transparent hover:border-primary/20",
        accent:
          "bg-accent text-accent-foreground hover:bg-background hover:text-foreground",
        inverse:
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-foreground/40 bg-transparent text-foreground hover:bg-primary hover:border-primary hover:text-accent",
        "outline-inverse":
          "border border-background/40 bg-transparent text-background hover:bg-background hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-muted",
        ghost:
          "text-foreground hover:bg-muted",
        link:
          "rounded-none text-foreground underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-14 px-8",
        sm: "h-10 px-5 text-[10px]",
        lg: "h-16 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
