import { useRef, useEffect } from "react"
import { observable } from "@legendapp/state"
import { observe } from "@legendapp/state"

import { HtmlDisplay } from "../3dgui/HtmlDisplay"
import { SortableList } from "../ui/SortableList"
import { classes, selected } from "./state"
import { objectToKeyValueArray } from "./helpers"

import { Property } from "./Property"

const style = observable([])
observe(selected, (e) => style.set(objectToKeyValueArray({ ...classes.get()[e.value?.props?.className], ...e.value?.props?.style })))

export function StyleBar(props) {
  return (
    <HtmlDisplay {...props}>
      <div
        className="w-full h-full bg-red-500/20 border border-rose-500/50 overflow-y-auto overflow-x-hidden rounded-lg"
        style={{ backgroundColor: "hsla(0, 100%, 50%, 0.1)", scrollbarGutter: "stable both-edges" }}
      >
        <div className="py-1 text-white font-open-sans text-sm box-border">
          <Content />
        </div>
      </div>
    </HtmlDisplay>
  )
}

function Content() {
  const selectedElement = selected.get()
  const propsRef = useRef({})
  useEffect(() => {
    propsRef.current = {}
  }, [selectedElement])

  return (
    <SortableList
      items={style.get()}
      setItems={style.set}
      renderItem={(item) => (
        <div className="flex flex-wrap justify-center m-1 px-2 text-center items-center border-2 rounded cursor-default border-rose-500/50 bg-rose-500/20 hover:bg-blue-500/20 hover:border-blue-500">
          <Property item={item} propsRef={propsRef} />
        </div>
      )}
    />
  )
}
