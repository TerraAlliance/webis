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
