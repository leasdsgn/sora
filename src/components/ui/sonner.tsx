"use client"

import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert } from "lucide-react"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-none border border-border bg-background text-foreground shadow-[0_4px_12px_0_rgba(38,38,38,0.08)] font-sans text-sm tracking-wide",
          description: "text-muted-foreground text-xs",
          actionButton:
            "bg-primary text-primary-foreground rounded-none text-[10px] uppercase tracking-[0.1em] font-semibold",
          cancelButton:
            "bg-muted text-muted-foreground rounded-none text-[10px] uppercase tracking-[0.1em]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
