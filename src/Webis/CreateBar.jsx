import { HtmlDisplay } from "../ui/HtmlDisplay"
import { SortableList } from "../ui/SortableList"

import { app, addElement } from "./state"

export function CreateBar(props) {
  return (
    <HtmlDisplay
      style={{ overflowY: "auto", overflowX: "hidden", borderRadius: "10px", backgroundColor: "rgba(0, 0, 200, 0.1)", scrollbarGutter: "stable both-edges" }}
      {...props}
    >
      <div style={{ paddingTop: "5px", paddingBottom: "5px", fontFamily: "Open Sans", fontSize: "18px" }}>
        <Content />
      </div>
    </HtmlDisplay>
  )
}

function Content() {
  return (
    <SortableList
      items={app.components.get()}
      setItems={app.components.set}
      renderItem={(item) => (
        <div
          style={{
            margin: "5px 0px 5px 0px",
            borderRadius: "5px",
            backgroundColor: "hsla(220, 100%, 50%, 0.15)",
            textAlign: "center",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "hsla(220, 100%, 50%, 0.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "hsla(220, 100%, 50%, 0.15)")}
          onClick={(e) => {
            e.stopPropagation()
            addElement(app.tree, item.component, evaluateObject(item.props), item.children, app.selected.get(), null)
          }}
        >
          <span style={{ color: "white", lineHeight: "30px", userSelect: "none" }}>{item.component}</span>
        </div>
      )}
    />
  )
}

const evaluateObject = (obj) => {
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
