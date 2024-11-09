import { observable } from "@legendapp/state"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"
enableReactTracking({ auto: true })

import { newId, getRandomCat } from "./helpers"

// import GUN from "gun"
// const gun = GUN()
// const webis = gun.get("webis")
// const elements = webis.get("elements")

export const tree = observable([])

export const selected = observable()

export const properties = observable([])

export const classes = observable({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "pink",
    border: "2px solid deeppink",
    minHeight: "50px",
    width: "100%",
    marginBottom: "2px",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    gap: "5px",
    boxSizing: "border-box",
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
  { component: "h4", props: { className: "font" }, children: "Title", id: newId() },
  { component: "h5", props: { className: "font" }, children: "Title", id: newId() },
  { component: "h6", props: { className: "font" }, children: "Title", id: newId() },
  { component: "a", props: { className: "font", href: "#" }, children: "This is a link.", id: newId() },
  { component: "button", props: { className: "font" }, children: "Click me", id: newId() },
  { component: "img", props: { className: "image", src: () => getRandomCat(), width: "200px", height: "200px" }, id: newId() },
  { component: "input", id: newId() },
])
