// import GUN from "gun"
import { observable } from "@legendapp/state"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"
enableReactTracking({ auto: true })
import cxs from "cxs"

// const gun = GUN()
// const webis = gun.get("webis")
// const elements = webis.get("elements")

export const tree = observable([])
export const selected = observable()
export const properties = observable(["prop1", "prop2", "prop3"])
export const classes = observable({
  container: cxs({
    display: "flex",
    backgroundColor: "pink",
    border: "2px solid deeppink",
    marginBottom: "2px",
    height: "auto",
    minHeight: "100px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    gap: "5px",
    boxSizing: "border-box",
    borderRadius: "10px",
  }),
  font: cxs({ fontFamily: "Open Sans" }),
})

const newId = () => crypto.randomUUID()

export const app = observable()

export const components = observable([
  { component: "div", props: { className: classes.get()["container"] }, children: [], className: "container", id: newId() },
  { component: "p", props: { className: classes.get()["font"], contentEditable: true }, children: "This is a paragraph.", className: "font", id: newId() },
  { component: "span", props: { className: classes.get()["font"], contentEditable: true }, children: "span", className: "font", id: newId() },
  { component: "h1", props: { className: classes.get()["font"], contentEditable: true }, children: "Title", className: "font", id: newId() },
  { component: "h2", props: { className: classes.get()["font"], contentEditable: true }, children: "Title", className: "font", id: newId() },
  { component: "h3", props: { className: classes.get()["font"], contentEditable: true }, children: "Title", className: "font", id: newId() },
  { component: "h4", props: { className: classes.get()["font"], contentEditable: true }, children: "Title", className: "font", id: newId() },
  { component: "h5", props: { className: classes.get()["font"], contentEditable: true }, children: "Title", className: "font", id: newId() },
  { component: "h6", props: { className: classes.get()["font"], contentEditable: true }, children: "Title", className: "font", id: newId() },
  { component: "a", props: { className: classes.get()["font"], href: "#" }, children: "This is a link.", className: "font", id: newId() },
  { component: "button", props: { className: classes.get()["font"] }, children: "Click me", className: "font", id: newId() },
  { component: "img", props: { src: () => getRandomCat(), width: "180px", height: "180px", style: { borderRadius: "10px" } }, id: newId() },
  { component: "input", className: "font", id: newId() },
])

const getRandomCat = (() => {
  let nums = []
  return () => {
    if (!nums.length) nums = [...Array(12).keys()].map((n) => n + 1).sort(() => Math.random() - 0.5)
    return `./cats/cat${nums.pop()}.webp`
  }
})()

export function addElement(component, props = {}, children = null, className, parentId = null, index = null) {
  const newElement = { component, props, children, className, id: newId() }
  const updatedTree = JSON.parse(JSON.stringify(tree.get()))

  const addToParent = (elements) => {
    for (const element of elements) {
      if (element.id === parentId) {
        if (index !== null && index >= 0 && index <= element.children.length) {
          element.children.splice(index, 0, newElement)
        } else {
          element.children.push(newElement)
        }
        return true
      }
      if (element.children && addToParent(element.children)) return true
    }
    return false
  }

  if (parentId) {
    addToParent(updatedTree)
  } else {
    index === null ? updatedTree.push(newElement) : updatedTree.splice(index, 0, newElement)
  }

  tree.set(updatedTree)
}
// function randomHSL(hueRange = [0, 360], saturation, lightness) {
//   const [hueMin, hueMax] = hueRange
//   const hue = Math.floor(Math.random() * (hueMax - hueMin + 1)) + hueMin
//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`
// }

// const button3d = cxs({
//   position: "relative",
//   display: "inline-block",
//   cursor: "pointer",
//   outline: "none",
//   verticalAlign: "middle",
//   textDecoration: "none",
//   fontSize: "inherit",
//   fontFamily: "inherit",
//   fontWeight: 600,
//   color: "#382b22",
//   textTransform: "uppercase",
//   padding: "1.25em 2em",
//   background: "#fff0f0",
//   border: "2px solid #b18597",
//   borderRadius: "0.75em",
//   transformStyle: "preserve-3d",
//   transition: "transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1)",
//   ":before": {
//     position: "absolute",
//     content: '""',
//     width: "100%",
//     height: "100%",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: "#f9c4d2",
//     borderRadius: "inherit",
//     boxShadow: "0 0 0 2px #b18597",
//     transform: "translate3d(0, 0.75em, -1em)",
//     transition: "transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1)",
//   },
//   ":hover": {
//     background: "#ffe9e9",
//     transform: "translate(0, 0.25em)",
//     ":before": {
//       transform: "translate3d(0, 0.5em, -1em)",
//     },
//   },
//   ":active": {
//     background: "#ffe9e9",
//     transform: "translate(0em, 0.75em)",
//     ":before": {
//       boxShadow: "0 0 0 2px #b18597, 0 0 #ffe3e2",
//       transform: "translate3d(0, 0, -1em)",
//     },
//   },
// })
