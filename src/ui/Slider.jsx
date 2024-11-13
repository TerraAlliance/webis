import { forwardRef } from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const Slider = forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root ref={ref} className={twMerge(clsx("relative flex my-2 w-full touch-none select-none items-center", className))} {...props}>
    <SliderPrimitive.Track className="relative h-2 grow rounded-full bg-amber-500/25 border border-amber-500">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-amber-500/50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-4 rounded-full bg-red-700 border  border-amber-500" aria-label="Volume" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
