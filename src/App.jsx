import { useEffect } from "react"
import { observable } from "@legendapp/state"
import { useWindowSize } from "@uidotdev/usehooks"
import { Canvas } from "@react-three/fiber"
import { OrthographicCamera, OrbitControls } from "@react-three/drei"

import { FlexBox } from "./3dgui/FlexBox.jsx"
import { Gradient } from "./Gradient.js"
import { Webis } from "./Webis/Webis"
import { Dock } from "./3dgui/Dock.jsx"
import { PageSlider } from "./3dgui/PageSlider.jsx"
import { WebisIcon, FilesIcon } from "./3dgui/Icons.jsx"

function App() {
  useEffect(() => {
    const gradient = new Gradient()
    gradient.initGradient("#gradient")
  }, [])

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Canvas>
        <OrthographicCamera zoom={1} makeDefault position={[0, 0, 5000]} far={10000} />
        <OrbitControls enabled={false} enableZoom={false} />
        <Body />
        <Lights />
      </Canvas>
    </div>
  )
}

const activePage = observable(0)

function Body() {
  const size = useWindowSize()

  if (size.height === null) {
    return null
  }

  return (
    <FlexBox width={size.width - 20} height={size.height - 20} gap={10} direction={"column"}>
      <Pages grow={14} />
      <Dock grow={1}>
        <WebisIcon size={50} width={50} height={50} onClick={() => activePage.set(0)} />
        <FilesIcon size={50} width={50} height={50} onClick={() => activePage.set(1)} />
      </Dock>
    </FlexBox>
  )
}

function Pages(props) {
  const active = activePage.get()

  return (
    <PageSlider active={active} {...props}>
      <Webis />
      <>
        <FilesIcon position={[0, 0, 0]} size={200} width={50} height={50} />
      </>
    </PageSlider>
  )
}

function Lights() {
  return (
    <>
      <directionalLight position={[0, 0, 1]} intensity={5} />
      <directionalLight position={[1, 0, 0]} intensity={5} />
      <directionalLight position={[-1, 0, 0]} intensity={5} />
    </>
  )
}

export default App
