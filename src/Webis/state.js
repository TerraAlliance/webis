import { observable } from "@legendapp/state"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"
enableReactTracking({ auto: true })

import { newId, getRandomCat } from "./helpers"

// import GUN from "gun"
// const gun = GUN()
// const webis = gun.get("webis")
// const elements = webis.get("elements")

export const tree = observable([])
export const tailwind = observable(false)
export const selected = observable()
export const hovered = observable()
export const classes = observable({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "1",
    gap: "5px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "hsla(220, 100%, 50%, 0.1)",
    width: "100%",
    minHeight: "100px",
    boxSizing: "border-box",
    marginBottom: "2px",
    padding: "5px",
    border: "2px solid orchid",
    borderRadius: "10px",
  },
  font: { fontFamily: "Open Sans" },
  image: { borderRadius: "10px" },
})

export const components = observable([
  { component: "div", props: { className: "container" }, children: [], id: newId() },
  { component: "p", props: { className: "font" }, children: "This is a paragraph.", id: newId() },
  { component: "span", props: { className: "font" }, children: "span", id: newId() },
  { component: "h1", props: { className: "font" }, children: "Title", id: newId() },
  { component: "h2", props: { className: "font" }, children: "Title", id: newId() },
  { component: "h3", props: { className: "font" }, children: "Title", id: newId() },
  { component: "a", props: { className: "font", href: "#" }, children: "This is a link.", id: newId() },
  { component: "button", props: { className: "font" }, children: "Click me", id: newId() },
  { component: "img", props: { className: "image", src: () => getRandomCat(), width: "200px", height: "200px" }, id: newId() },
  { component: "input", id: newId() },
])
