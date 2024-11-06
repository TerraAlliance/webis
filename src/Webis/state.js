// import GUN from "gun"
import { observable } from "@legendapp/state"
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking"
enableReactTracking({ auto: true })

// const gun = GUN()
// const webis = gun.get("webis")
// const elements = webis.get("elements")

export const app = observable()

import shuffle from "lodash/shuffle"

const uniqueRandomGenerator = (range) => {
  let nums = []
  return () => {
    if (nums.length === 0) {
      nums = shuffle([...Array(range).keys()].map((n) => n + 1))
    }
    return nums.pop()
  }
}

const getUniqueRandom12 = uniqueRandomGenerator(12)

function randomHSL(hueRange = [0, 360], saturation, lightness) {
  const [hueMin, hueMax] = hueRange
  const hue = Math.floor(Math.random() * (hueMax - hueMin + 1)) + hueMin
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

app.components.set([
  {
    component: "div",
    props: {
      style: {
        display: "flex",
        backgroundColor: () => randomHSL([0, 40], 100, 80),
        height: "auto",
        minHeight: "100px",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
        gap: "5px",
        boxSizing: "border-box",
        borderRadius: "10px",
      },
    },
    children: [],
    id: crypto.randomUUID(),
  },
  {
    component: "p",
    props: { style: { color: "black", fontFamily: "Open Sans" }, contentEditable: true },
    children: "This is a paragraph.",
    id: crypto.randomUUID(),
  },
  { component: "span", props: { style: { color: "black" }, contentEditable: true }, children: "span", id: crypto.randomUUID() },
  { component: "h1", props: { style: { color: "black", fontFamily: "Open Sans" }, contentEditable: true }, children: "Title", id: crypto.randomUUID() },
  { component: "h2", props: { style: { color: "black", fontFamily: "Open Sans" }, contentEditable: true }, children: "Title", id: crypto.randomUUID() },
  { component: "h3", props: { style: { color: "black", fontFamily: "Open Sans" }, contentEditable: true }, children: "Title", id: crypto.randomUUID() },
  { component: "a", props: { href: "#", contentEditable: true, fontFamily: "Open Sans" }, children: "This is a link.", id: crypto.randomUUID() },
  { component: "button", props: { className: "button", style: { color: "black" }, contentEditable: true }, children: "Click me", id: crypto.randomUUID() },
  {
    component: "img",
    props: { src: () => "./cats/cat" + getUniqueRandom12() + ".webp", width: "180px", height: "180px", style: { borderRadius: "10px" } },
    id: crypto.randomUUID(),
  },
])

app.properties.set(["prop1", "prop2", "prop3"])

app.tree.set([])

export function addElement(tree, component, props = {}, children = null, parentId = null, index = null) {
  const newElement = {
    component,
    props,
    children,
    id: crypto.randomUUID(),
  }

  // Create a deep copy of the tree to maintain immutability
  const updatedTree = JSON.parse(JSON.stringify(tree.get()))

  if (!parentId) {
    // No parentId specified, add to root level
    if (index !== null && index >= 0 && index <= updatedTree.length) {
      updatedTree.splice(index, 0, newElement)
    } else {
      updatedTree.push(newElement)
    }
    tree.set(updatedTree)
    return
  }

  // Helper function to find and add to parent within the copied tree
  function addToParent(elements) {
    for (const el of elements) {
      if (el.id === parentId) {
        // If parentId matches, add new element to this parent's children
        if (!el.children) {
          el.children = []
        }
        if (index !== null && index >= 0 && index <= el.children.length) {
          el.children.splice(index, 0, newElement)
        } else {
          el.children.push(newElement)
        }
        return true
      } else if (el.children) {
        // Recursively search in children
        if (addToParent(el.children)) return true
      }
    }
    return false
  }

  addToParent(updatedTree)
  tree.set(updatedTree)
}
