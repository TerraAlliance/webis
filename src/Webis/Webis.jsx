import { useWindowSize } from "@uidotdev/usehooks"

import { FlexBox } from "../3dgui/FlexBox"
import { CreateBar } from "./CreateBar"
import { StyleBar } from "./StyleBar"
import { TreeView } from "./TreeView"
import { WebView } from "./WebView"

export function Webis(props) {
  const size = useWindowSize()

  if (size.height === null) {
    return null
  }

  return (
    <FlexBox gap={10} direction={size.height > size.width ? "column" : "row"} {...props}>
      <WebView grow={20} />
      <TreeView grow={16} />
      <FlexBox grow={5} gap={10} direction={"column"}>
        <CreateBar grow={18} />
        <StyleBar grow={20} />
      </FlexBox>
    </FlexBox>
  )
}
