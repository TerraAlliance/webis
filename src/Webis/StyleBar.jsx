import { observable } from "@legendapp/state"
import { observe } from "@legendapp/state"

import { HtmlDisplay } from "../ui/HtmlDisplay"
import { SortableList } from "../ui/SortableList"
import { classes, selected, tree } from "./state"
import { objectToKeyValueArray, hsla, editElement } from "./helpers"
import ContentEditable from "react-contenteditable"

const style = observable([])

observe(selected, (e) => {
  style.set(objectToKeyValueArray({ ...classes.get()[e.value?.props.className], ...e.value?.props?.style }))
})

export function StyleBar(props) {
  return (
    <HtmlDisplay {...props}>
      <div
        className="w-full h-full bg-red-500/20 border border-red-500/50 overflow-y-auto overflow-x-hidden rounded-lg"
        style={{ backgroundColor: "hsla(0, 100%, 50%, 0.1)", scrollbarGutter: "stable both-edges" }}
      >
        <div className="pt-1 pb-1 text-white font-open-sans text-base box-border">
          <Content />
        </div>
      </div>
    </HtmlDisplay>
  )
}
import { useRef } from "react"

function Content() {
  const selectedElement = selected.get()
  const editedValues = useRef({})

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
