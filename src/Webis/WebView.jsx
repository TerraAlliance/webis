import cxs from "cxs"
import clsx from "clsx"
import { observer } from "@legendapp/state/react"

import { HtmlDisplay } from "../3dgui/HtmlDisplay"
import { classes, tree, hovered, selected } from "./state"

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

const hoveredPattern = "repeating-linear-gradient(-45deg, hsla(160, 100%, 50%, 0.4) 0px, hsla(160, 100%, 50%, 0.4) 10px, transparent 10px, transparent 20px)"
const selectedPattern = "repeating-linear-gradient(-45deg, hsla(160, 100%, 50%, 0.6) 0px, hsla(160, 100%, 50%, 0.6) 10px, transparent 10px, transparent 20px)"

function renderElements(elements, classMap) {
  return elements.map((element) => {
    const { id, component: Component, props, children } = element
    const { className, style, ...remainingProps } = props
    const isHovered = hovered.get()?.id === element.id
    const isSelected = selected.get()?.id === element.id

    return (
      <Component
        key={id}
        className={clsx("no-twp", className && cxs(classMap[className]))}
        style={{
          background: isSelected ? selectedPattern : isHovered ? hoveredPattern : style?.background || style?.backgroundColor,
          borderColor: isSelected ? "hsla(160, 100%, 50%, 0.6)" : isHovered ? "hsla(160, 100%, 50%, 0.4)" : style?.borderColor,
          ...style,
        }}
        contentEditable
        suppressContentEditableWarning
        {...remainingProps}
      >
        {Array.isArray(children) ? renderElements(children, classMap) : children}
      </Component>
    )
  })
}
