import { Html } from "@react-three/drei"

export function HtmlDisplay({ width, height, children, style, ...props }) {
  return (
    <Html distanceFactor={400} transform={true} occlude={"blending"} style={{ width: width + "px", height: height + "px", ...style }} {...props}>
      {children}
    </Html>
  )
}
