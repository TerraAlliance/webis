import { forwardRef } from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const Input = forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        clsx(
          "h-5 w-full rounded-md border border-amber-500 bg-transparent px-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
