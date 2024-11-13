import { HtmlDisplay } from "../3dgui/HtmlDisplay"
import { SortableList } from "../ui/SortableList"

import { selected, components, tree } from "./state"
import { addElement } from "./helpers"

export function CreateBar(props) {
  return (
    <HtmlDisplay {...props}>
      <div
        className="w-full h-full bg-blue-500/20 border border-blue-500/50 overflow-y-auto overflow-x-hidden rounded-lg"
        style={{ backgroundColor: "hsla(220, 100%, 50%, 0.2)", scrollbarGutter: "stable both-edges" }}
      >
        <div className="py-1 text-white font-open-sans text-base box-border">
          <Content />
        </div>
      </div>
    </HtmlDisplay>
  )
}

function Content() {
  return (
    <SortableList
      items={components.get()}
      setItems={components.set}
      renderItem={(item) => (
        <div
          className="m-1 text-center cursor-pointer border-2 rounded border-blue-500/50 bg-blue-500/20 hover:bg-red-500/20 hover:border-red-500"
          onClick={(e) => {
            e.stopPropagation()
            addElement(tree, item.component, evaluateObject(item.props), item.children, selected.get()?.id, null)
          }}
        >
          <span style={{ color: "white", lineHeight: "30px", userSelect: "none" }}>{item.component}</span>
        </div>
      )}
    />
  )
}

const evaluateObject = (obj) => {
  if (obj === undefined || obj === null) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === "function") {
        return [key, value()]
      } else if (typeof value === "object" && value !== null) {
        return [key, evaluateObject(value)]
      } else {
        return [key, value]
      }
    })
  )
}
