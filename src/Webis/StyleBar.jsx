import { useObservable } from "@legendapp/state/react"

import { HtmlDisplay } from "../ui/HtmlDisplay"
import { SortableList } from "../ui/SortableList"
import { classes, selected, tree } from "./state"
import { objectToKeyValueArray, hsla, editElement } from "./helpers"
import ContentEditable from "react-contenteditable"

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
import { useRef } from "react"

function Content() {
  const selectedElement = selected.get()
  const classMap = classes.get()
  const style = useObservable()
  const editedValues = useRef({})

  style.set(objectToKeyValueArray({ ...classMap[selectedElement?.props.className], ...selectedElement?.props?.style }))

  return (
    <SortableList
      items={style.get()}
      setItems={style.set}
      renderItem={(item) => (
        <div className="m-1 text-center cursor-pointer border-2 rounded border-red-500/50 bg-red-500/20 hover:bg-blue-500/20 hover:border-blue-500">
          <span style={{ color: "white", lineHeight: "30px", userSelect: "none" }}>
            <Property item={item} element={selectedElement} editedValues={editedValues.current} />
          </span>
        </div>
      )}
    />
  )
}

function Property({ item, element, editedValues }) {
  const [key, value] = Object.entries(item)[0]

  return (
    <>
      <span>{key}:&nbsp;</span>
      <ContentEditable
        style={{ color: hsla(50, 100, 50, 1), cursor: "text", display: "inline-block" }}
        html={value}
        onChange={(e) => {
          editedValues[key] = e.currentTarget.textContent
          editElement(tree, element.id, { style: { ...element.props?.style, ...editedValues } })
        }}
      />
    </>
  )
}
