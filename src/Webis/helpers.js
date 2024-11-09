export function hsla(h, s, l, a) {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

export function newId() {
  return crypto.randomUUID()
}

export const getRandomCat = (() => {
  let nums = []
  return () => {
    if (!nums.length) nums = [...Array(12).keys()].map((n) => n + 1).sort(() => Math.random() - 0.5)
    return `./cats/cat${nums.pop()}.webp`
  }
})()

export function objectToKeyValueArray(obj = {}) {
  return Object.entries(obj).map(([key, value]) => ({ [key]: value }))
}

export function addElement(tree, component, props = {}, children = null, parentId = null, index = null) {
  const newElement = { component, props, children, id: newId() }
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

export function editElement(tree, elementId, updatedProps = {}, updatedChildren = null, updatedClassName = null) {
  const updatedTree = JSON.parse(JSON.stringify(tree.get()))

  const editInTree = (elements) => {
    for (const element of elements) {
      if (element.id === elementId) {
        // Update the element's properties
        element.props = { ...element.props, ...updatedProps }
        if (updatedChildren !== null) element.children = updatedChildren
        if (updatedClassName !== null) element.className = updatedClassName
        return true
      }
      if (element.children && editInTree(element.children)) return true
    }
    return false
  }

  editInTree(updatedTree)
  tree.set(updatedTree)
}
