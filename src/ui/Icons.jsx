import { Sphere, Torus, RoundedBox } from "@react-three/drei"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

export function WebisIcon({ position = [0, 0, 0], size = 0.1, ...props }) {
  const latitudeCount = 3
  const longitudeCount = 5
  const angleOffset = Math.PI / (latitudeCount * 2)

  const icon = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => (hovered ? (icon.current.rotation.y += delta * 1) : null))

  return (
    <group ref={icon} position={position}>
      <Sphere args={[size * 0.6]} position={[0, 0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} {...props}>
        <meshStandardMaterial transparent opacity={0.1} color={hovered ? "red" : "blue"} />
      </Sphere>
      <Sphere args={[size * 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color={hovered ? "red" : "blue"} />
      </Sphere>
      {Array.from({ length: latitudeCount }).map((_, i) => {
        const angle = ((i + 0.5) / latitudeCount) * (Math.PI - 2 * angleOffset) - (Math.PI / 2 - angleOffset)
        const radius = size * 0.5 * Math.cos(angle)
        const yPosition = size * 0.5 * Math.sin(angle)
        return (
          <Torus key={`latitude-${i}`} args={[Math.abs(radius), size * 0.02]} position={[0, yPosition, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="white" />
          </Torus>
        )
      })}
      {Array.from({ length: longitudeCount }).map((_, i) => (
        <Torus key={`longitude-${i}`} args={[size * 0.5, size * 0.02]} rotation={[0, (i / longitudeCount) * Math.PI, 0]}>
          <meshStandardMaterial color="white" />
        </Torus>
      ))}
    </group>
  )
}

export function FilesIcon({ position = [0, 0, 0], size = 0.1, ...props }) {
  const icon = useRef()
  const [hovered, setHovered] = useState(false)

  const width = size * 0.7
  const height = size * 0.6
  const depth = size * 0.05

  return (
    <group ref={icon} position={position}>
      <Sphere args={[size * 0.6]} position={[0, 0, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} {...props}>
        <meshStandardMaterial transparent opacity={0.1} color={hovered ? "red" : "blue"} />
      </Sphere>
      <RoundedBox position={[0, -height * 0.05, depth]} args={[width, height * 0.9, depth]} radius={depth / 2}>
        <meshStandardMaterial color={hovered ? "red" : "darkorange"} />
      </RoundedBox>
      <RoundedBox position={[0, 0, 0]} args={[width, height, depth / 4]} radius={depth / 8}>
        <meshStandardMaterial color={hovered ? "red" : "white"} />
      </RoundedBox>
      <RoundedBox position={[0, height * 0.05, -depth]} args={[width, height * 1.1, depth]} radius={depth / 2}>
        <meshStandardMaterial color={hovered ? "red" : "darkorange"} />
      </RoundedBox>
    </group>
  )
}
