import { FlexBox } from "./FlexBox"

export function Dock({ position, width, height, children }) {
  return (
    <group position={position}>
      <FlexBox width={width} height={height} gap={20} direction={"row"} justifyContent="center">
        {children}
      </FlexBox>
    </group>
  )
}
