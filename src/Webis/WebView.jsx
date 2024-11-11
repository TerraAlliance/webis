import cxs from "cxs"
import clsx from "clsx"

import { HtmlDisplay } from "../ui/HtmlDisplay"
import { classes, tree, hovered } from "./state"
import { hsla } from "./helpers"

import { observer } from "@legendapp/state/react"

export const WebView = observer((props) => {
  return (
    <HtmlDisplay
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
      {...props}
    >
      <Content />
    </HtmlDisplay>
  )
})

const Content = observer(() => {
  const elements = tree.get()
  const classMap = classes.get()

  return <>{renderElements(elements, classMap)}</>
})

function renderElements(elements, classMap) {
  return elements.map((element) => {
    const { id, component: Component, props, children } = element
    const { className, ...remainingProps } = props
    const isHovered = hovered.get()?.id === element.id

    return (
      <Component
        className={clsx("no-twp", className && cxs(classMap[className]))}
        {...remainingProps}
        contentEditable
        suppressContentEditableWarning
        key={id}
        style={{ border: isHovered ? "2px solid " + hsla(150, 100, 50, 1) : props.style?.border, ...props.style }}
      >
        {Array.isArray(children) ? renderElements(children, classMap) : children}
      </Component>
    )
  })
}
