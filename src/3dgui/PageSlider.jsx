import { Children, cloneElement } from "react"
import { animated, useSpringValue } from "@react-spring/three"
import { useWindowSize } from "@uidotdev/usehooks"

export function PageSlider({ children, active, ...props }) {
  const spring = useSpringValue(0, { config: { mass: 1, tension: 170, friction: 26 } })
  spring.start(active)

  const size = useWindowSize()

  if (size.height === null) {
    return null
  }

  return (
    <>
      {Children.map(children, (child, i) => (
        <animated.group key={i} position={spring.to((value) => [i * size.width - value * size.width, 0, 0])}>
          {cloneElement(child, { ...props })}
        </animated.group>
      ))}
    </>
  )
}
