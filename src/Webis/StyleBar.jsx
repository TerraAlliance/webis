import { useObservable } from "@legendapp/state/react"

import { HtmlDisplay } from "../ui/HtmlDisplay"
import { SortableList } from "../ui/SortableList"
import { classes, selected, tree } from "./state"
import { objectToKeyValueArray, hsla, editElement } from "./helpers"

export function StyleBar(props) {
  return (
    <HtmlDisplay
      style={{
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "10px",
        backgroundColor: "hsla(0, 100%, 50%, 0.2)",
        scrollbarGutter: "stable both-edges",
      }}
      {...props}
    >
      <div style={{ paddingTop: "5px", paddingBottom: "5px", fontFamily: "Open Sans", fontSize: "18px" }}>
        <Content />
      </div>
    </HtmlDisplay>
  )
}

function Content() {
  const selectedElement = selected.get()
  const classMap = classes.get()
  const style = useObservable()

  style.set(objectToKeyValueArray(classMap[selectedElement?.props.className]))

  return (
    <SortableList
      items={style.get()}
      setItems={style.set}
      renderItem={(item) => (
        <div
          style={{
            margin: "5px 0px 5px 0px",
            borderRadius: "5px",
            backgroundColor: "hsla(0, 100%, 50%, 0.15)",
            textAlign: "center",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsla(220, 100%, 50%, 0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsla(0, 100%, 50%, 0.15)")}
        >
          <span style={{ color: "white", lineHeight: "30px", userSelect: "none" }}>
            <Property item={item} className={selectedElement?.props.className} elementId={selectedElement?.id} />
          </span>
        </div>
      )}
    />
  )
}

import ContentEditable from "react-contenteditable"

function Property({ item, elementId }) {
  const [key, value] = Object.entries(item)[0]

  const handleInput = (e) => {
    const newValue = e.currentTarget.textContent

    // Fetch the current element and get existing styles
    const currentElement = tree.get().find((el) => el.id === elementId)
    const currentStyle = currentElement?.props?.style || {}

    // Merge existing style with the new key-value pair
    const updatedStyle = { ...currentStyle, [key]: newValue }

    // Call editElement with the updated style
    editElement(tree, elementId, { style: updatedStyle })
  }

  return (
    <>
      <span>{key}:&nbsp;</span>
      <ContentEditable style={{ color: hsla(50, 100, 50, 1), cursor: "text", display: "inline-block" }} html={value} onChange={handleInput} />
    </>
  )
}
