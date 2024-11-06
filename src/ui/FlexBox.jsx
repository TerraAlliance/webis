import { Children, cloneElement } from "react"

export function FlexBox({ position, width, height, gap, children, direction = "row", justifyContent = "flex-start" }) {
  const isRow = direction === "row"
  const isColumn = direction === "column"
  const containerSize = isRow ? width : height

  const totalGrow = children.reduce((sum, child) => sum + (child.props.grow || 0), 0)
  const totalChildSize = children.reduce((sum, child) => {
    const size = isRow ? child.props.width : child.props.height
    return sum + (size || 0)
  }, 0)
  const availableSpace = containerSize - gap * (children.length - 1) - totalChildSize

  const childSizes = children.map((child) => {
    const childSize = isRow ? child.props.width : child.props.height
    const growSize = totalGrow > 0 ? ((child.props.grow || 0) / totalGrow) * availableSpace : 0
    return childSize ? childSize + growSize : growSize
  })

  const totalSize = childSizes.reduce((sum, size) => sum + size, 0) + gap * (children.length - 1)

  let acc
  switch (justifyContent) {
    case "flex-start":
      if (isRow) acc = -containerSize / 2
      if (isColumn) acc = containerSize / 2
      break
    case "flex-end":
      if (isRow) acc = containerSize / 2
      if (isColumn) acc = -containerSize / 2
      break
    case "center":
      if (isRow) acc = -totalSize / 2
      if (isColumn) acc = totalSize / 2
      break
  }

  return (
    <group position={position}>
      {Children.map(children, (child, i) => {
        const childSize = childSizes[i]
        const x = child.props.position?.[0] || 0
        const y = child.props.position?.[1] || 0
        const z = child.props.position?.[2] || 0

        let childProps
        switch (direction) {
          case "row":
            childProps = { position: [acc + childSize / 2 + x, y, z], width: childSize, height: height }
            break
          case "column":
            childProps = { position: [x, acc - childSize / 2 + y, z], width: width, height: childSize }
            break
        }

        switch (justifyContent) {
          case "center":
          case "flex-start":
            if (isRow) acc += childSize + gap
            if (isColumn) acc -= childSize + gap
            break
          case "flex-end":
            if (isRow) acc -= childSize + gap
            if (isColumn) acc += childSize + gap
            break
        }

        return cloneElement(child, { key: i, ...childProps })
      })}
    </group>
  )
}
