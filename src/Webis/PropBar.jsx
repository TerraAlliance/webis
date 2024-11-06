import { HtmlDisplay } from "../ui/HtmlDisplay"
import { SortableList } from "../ui/SortableList"

import { app } from "./state"

export function PropBar(props) {
  return (
    <HtmlDisplay
      style={{ overflowY: "auto", overflowX: "hidden", borderRadius: "10px", backgroundColor: "rgba(0, 0, 200, 0.1)", scrollbarGutter: "stable both-edges" }}
      {...props}
    >
      <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
        <Content />
      </div>
    </HtmlDisplay>
  )
}

function Content() {
  return (
    <SortableList
      items={app.properties.get()}
      setItems={app.properties.set}
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
        >
          <span style={{ color: "white", lineHeight: "30px", fontFamily: "Open Sans", fontSize: "18px", userSelect: "none" }}>{item}</span>
        </div>
      )}
    />
  )
}
