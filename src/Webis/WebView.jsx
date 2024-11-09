import cxs from "cxs"

import { HtmlDisplay } from "../ui/HtmlDisplay"
import { classes, tree } from "./state"

export function WebView(props) {
  return (
    <HtmlDisplay style={{ overflowY: "auto", overflowX: "hidden", borderRadius: "10px", backgroundColor: "white" }} {...props}>
      <Content />
    </HtmlDisplay>
  )
}

function Content() {
  const elements = tree.get()
  const classMap = classes.get()
  return <>{renderElements(elements, classMap)}</>
}

function renderElements(elements, classMap) {
  return elements.map((element) => {
    const { id, component: Component, props, children } = element
    const { className, ...remainingProps } = props

    return (
      <Component
        className={className && cxs(classMap[className])}
        {...remainingProps}
        contentEditable
        suppressContentEditableWarning
        key={id}
        style={props.style}
      >
        {Array.isArray(children) ? renderElements(children, classMap) : children}
      </Component>
    )
  })
}
