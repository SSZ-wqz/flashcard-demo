import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const loaderVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        default: "h-4 w-4",
        sm: "h-2 w-2",
        md: "h-4 w-4",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface LoaderProps extends VariantProps<typeof loaderVariants> {}

export const Loader = ({ size }: LoaderProps) => {
  return (
    <Loader2 className={cn(loaderVariants({ size }))} />
  )
}
