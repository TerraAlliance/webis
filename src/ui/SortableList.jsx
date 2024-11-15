import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export function SortableList({ items, renderItem, setItems }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 1 } }))

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item.id} item={item} renderItem={renderItem} />
        ))}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event) {
    const { active, over } = event
    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id)
        const newIndex = prev.findIndex((item) => item.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }
}

function SortableItem({ item, renderItem }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }} {...attributes} {...listeners}>
      {renderItem(item)}
    </div>
  )
}
