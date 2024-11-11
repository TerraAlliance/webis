import { useState } from "react"
import { DndContext, rectIntersection, closestCenter, PointerSensor, useSensors, useSensor } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { restrictToVerticalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers"
import { CSS, getEventCoordinates } from "@dnd-kit/utilities"

import { HtmlDisplay } from "../ui/HtmlDisplay"
import { tree, selected, hovered } from "./state"
import { hsla } from "./helpers"

export function TreeView(props) {
  return (
    <HtmlDisplay style={{ backdropFilter: "blur(5px)" }} {...props}>
      <div
        className="w-full h-full overflow-y-auto overflow-x-hidden rounded-lg"
        style={{
          backgroundColor: "hsla(220, 100%, 50%, 0.2)",
          scrollbarGutter: "stable both-edges",
        }}
        onClick={(e) => (e.stopPropagation(), selected.set(null))}
      >
        <div className="pt-1 pb-1 text-white font-open-sans text-lg box-border">
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

import clsx from "clsx"

function Element({ element, activeId, depth = 0 }) {
  const children = element.children
  const hasChildren = Array.isArray(children) && children.length > 0
  const isHovered = hovered.get()?.id === element.id
  const isSelected = selected.get()?.id === element.id
  const bgColors = ["bg-blue-500/20", "bg-purple-500/20", "bg-yellow-500/20"]
  const borderColors = ["border-blue-500/50", "border-purple-500/50", "border-yellow-500/50"]

  return (
    <div
      className={clsx(
        "m-1 p-0.5 rounded cursor-pointer border-2",
        isHovered ? "bg-emerald-500/50" : isSelected ? "bg-rose-500/50" : bgColors[depth % bgColors.length],
        isHovered ? "border-emerald-500/80" : isSelected ? "border-rose-500/80" : borderColors[depth % borderColors.length]
      )}
      onClick={(e) => (e.stopPropagation(), selected.set(element))}
      onMouseOver={(e) => (e.stopPropagation(), hovered.set(element))}
      onMouseOut={(e) => (e.stopPropagation(), hovered.set(null))}
    >
      {(activeId === element.id || !hasChildren) && <StartTag element={element} closed />}
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

function StartTag({ element, closed = false }) {
  return (
    <>
      <span>&lt;{element.component}</span>
      {Object.entries(element.props).map(([name, value], index) => (
        <Attribute key={index} color={hsla(150, 100, 50, 1)} value={JSON.stringify(value)} name={name} />
      ))}
      {closed && <span>/</span>}
      <span>&gt;</span>
    </>
  )
}

function Attribute({ color, value, name }) {
  return (
    <>
      <span>&nbsp;{name}=</span>
      <span style={{ color: color, cursor: "text" }}>
        {/* &quot; */}
        <span contentEditable suppressContentEditableWarning spellcheck="false">
          {value}
        </span>
        {/* &quot; */}
      </span>
    </>
  )
}

function EndTag({ element }) {
  return <span>&lt;/{element.component}&gt;</span>
}
