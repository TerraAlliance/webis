import { Html } from "@react-three/drei"

import { FlexBox } from "../ui/FlexBox"
import { CreateBar } from "./CreateBar"
import { StyleBar } from "./StyleBar"
import { TreeView } from "./TreeView"
import { WebView } from "./WebView"

export function Webis(props) {
  return (
    <FlexBox gap={10} direction={"row"} {...props}>
      <WebView grow={20} />
      <TreeView grow={16} />
      <FlexBox grow={5} gap={10} direction={"column"}>
        <CreateBar grow={1} />
        <StyleBar grow={1} />
      </FlexBox>
    </FlexBox>
  )
}

export function HtmlDisplay({ x = 0, y = 0, z = 0, width, height, children, color }) {
  return (
    <Html
      position={[x, y, z]}
      distanceFactor={400}
      transform={true}
      occlude={"blending"}
      style={{
        width: width + "px",
        height: height + "px",
        userSelect: "none",
        overflowY: "auto",
        borderRadius: "10px",
        backgroundColor: color,
        scrollbarGutter: "stable both-edges",
      }}
    >
      {children}
    </Html>
  )
}
