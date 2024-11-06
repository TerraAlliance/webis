import { HtmlDisplay } from "../ui/HtmlDisplay"

import { app } from "./state"

export function WebView(props) {
  const elements = app.tree.get()
  return (
    <HtmlDisplay style={{ overflowY: "auto", overflowX: "hidden", borderRadius: "10px", backgroundColor: "white" }} {...props}>
      {renderElements(elements)}
    </HtmlDisplay>
  )
}

function renderElements(elements) {
  return elements.map((element) => {
    const { id, component: Component, props, children } = element
    return (
      <Component {...props} key={id} style={props.style}>
        {Array.isArray(children) ? renderElements(children) : children}
      </Component>
    )
  })
}
