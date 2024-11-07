import { useState } from "react"
import { Show } from "@legendapp/state/react"
import { DndContext, rectIntersection, closestCenter, PointerSensor, useSensors, useSensor } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers"
import { CSS, getEventCoordinates } from "@dnd-kit/utilities"

import { HtmlDisplay } from "../ui/HtmlDisplay"
import { selected, tree } from "./state"

export function TreeView(props) {
  return (
    <HtmlDisplay style={{}} {...props}>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 200, 0.1)",
          scrollbarGutter: "stable both-edges",
        }}
        onClick={(e) => (e.stopPropagation(), selected.set(null))}
      >
        <div
          style={{
            paddingTop: "5px",
            paddingBottom: "5px",
            color: "white",
            fontFamily: "Open Sans",
            fontSize: "18px",
            boxSizing: "border-box",
          }}
        >
          <SortableList />
        </div>
      </div>
    </HtmlDisplay>
  )
}

function SortableList() {
  const elements = tree.get()
  const [activeId, setActiveId] = useState(null)
  const [activeDepth, setActiveDepth] = useState(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 1 } }))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      modifiers={[snapYToCursor, restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={elements} strategy={verticalListSortingStrategy}>
        {elements.map((element) => (
          <SortableElement key={element.id} element={element} activeId={activeId} />
        ))}
      </SortableContext>
    </DndContext>
  )

  function handleDragStart(event) {
    const { active } = event
    setActiveDepth(active.data.current.depth)
    setActiveId(active.id)
  }

  function handleDragEnd(event) {
    setActiveDepth(null)
    setActiveId(null)

    const { active, over } = event
    if (!over || active.id === over.id) return

    tree.set((prevTree) => {
      const findPath = (tree, id, path = []) => {
        for (let i = 0; i < tree.length; i++) {
          const item = tree[i]
          if (item.id === id) return [...path, i]
          if (item.children) {
            const result = findPath(item.children, id, [...path, i, "children"])
            if (result) return result
          }
        }
        return null
      }

      const activePath = findPath(prevTree, active.id)
      const overPath = findPath(prevTree, over.id)

      if (activePath.slice(0, -1).join(",") !== overPath.slice(0, -1).join(",")) {
        return prevTree
      }

      const newTree = JSON.parse(JSON.stringify(prevTree))
      const fromParent = activePath.slice(0, -1).reduce((acc, key) => acc[key], newTree)
      const toParent = overPath.slice(0, -1).reduce((acc, key) => acc[key], newTree)

      const [movedItem] = fromParent.splice(activePath.at(-1), 1)
      toParent.splice(overPath.at(-1), 0, movedItem)

      return newTree
    })
  }

  function handleDragCancel() {
    setActiveDepth(null)
    setActiveId(null)
  }

  function customCollisionDetection(args) {
    const filteredArgs = { ...args, droppableContainers: args.droppableContainers.filter((c) => c.data.current.depth <= activeDepth) }
    return rectIntersection(args).length ? rectIntersection(filteredArgs) : closestCenter(filteredArgs)
  }
}

const snapYToCursor = ({ activatorEvent, draggingNodeRect, transform }) => {
  const coords = draggingNodeRect && activatorEvent && getEventCoordinates(activatorEvent)
  return coords ? { ...transform, y: transform.y + coords.y - draggingNodeRect.top - draggingNodeRect.height / 2 } : transform
}

function SortableElement({ element, activeId, depth = 0 }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: element.id,
    data: { depth: depth },
  })

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }} {...attributes} {...listeners}>
      <Element element={element} activeId={activeId} depth={depth} />
    </div>
  )
}

function Element({ element, activeId, depth = 0 }) {
  const children = element.children
  const hasChildren = Array.isArray(children) && children.length > 0
  const isSelected = selected.get() === element.id

  return (
    <div
      style={{
        margin: "4px",
        padding: "2px",
        borderRadius: "5px",
        backgroundColor: hsla(isSelected ? 0 : 220 + 10 * (depth + 2), 100, 50, 0.2 + depth * 0.05),
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hsla(0, 100, 50, 0.2 + depth * 0.05))}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = hsla(isSelected ? 0 : 220 + 10 * (depth + 2), 100, 50, 0.2 + depth * 0.05))}
      onClick={(e) => (e.stopPropagation(), selected.set(element.id))}
    >
      {(activeId === element.id || !hasChildren) && (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0px 5px 0px 5px" }}>
          <StartTag element={element} />
          <EndTag element={element} />
        </div>
      )}
      {activeId !== element.id && hasChildren && (
        <>
          <div style={{ paddingLeft: "5px" }}>
            <StartTag element={element} />
          </div>
          <SortableContext items={children} strategy={verticalListSortingStrategy}>
            {children.map((element) => (
              <SortableElement key={element.id} element={element} depth={depth + 1} activeId={activeId} />
            ))}
          </SortableContext>
          <div style={{ paddingLeft: "5px" }}>
            <EndTag element={element} />
          </div>
        </>
      )}
    </div>
  )
}

function StartTag({ element }) {
  return (
    <div>
      <span>&lt;{element.component}</span>

      <Show if={element.idName}>
        {() => (
          <>
            <span>&nbsp;id=</span>
            <span style={{ color: hsla(150, 100, 50, 1), cursor: "text" }}>
              &quot;
              <span contentEditable suppressContentEditableWarning>
                name
              </span>
              &quot;
            </span>
          </>
        )}
      </Show>

      <Show if={element.className}>
        {() => (
          <>
            <span>&nbsp;class=</span>
            <span style={{ color: hsla(50, 100, 50, 1), cursor: "text" }}>
              &quot;
              <span contentEditable suppressContentEditableWarning>
                {element.className}
              </span>
              &quot;
            </span>
          </>
        )}
      </Show>

      <span>&gt;</span>
    </div>
  )
}

function EndTag({ element }) {
  return <span>&lt;{element.component}&gt;</span>
}

function hsla(h, s, l, a) {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}
