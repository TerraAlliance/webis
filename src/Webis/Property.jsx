import { useRef, useEffect } from "react"
import { useWindowSize, useDebounce } from "@uidotdev/usehooks"
import { Switch, useObservable } from "@legendapp/state/react"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

import { Slider } from "../ui/Slider"
import { Input } from "../ui/Input"
import { selected, tree } from "./state"
import { editElement } from "./helpers"

export function Property({ item, propsRef }) {
  const [key, value] = Object.entries(item)[0]
  return (
    <Switch value={key}>
      {{
        display: () => <Display propKey={key} initialValue={value} propsRef={propsRef} />,
        flex: () => <Flex propKey={key} initialValue={value} propsRef={propsRef} />,
        gap: () => <Gap propKey={key} initialValue={value} propsRef={propsRef} />,
        backgroundColor: () => <BackgroundColor propKey={key} initialValue={value} propsRef={propsRef} />,
        border: () => <Border propKey={key} initialValue={value} propsRef={propsRef} />,
        flexDirection: () => <FlexDirection propKey={key} initialValue={value} propsRef={propsRef} />,
        justifyContent: () => <JustifyContent propKey={key} initialValue={value} propsRef={propsRef} />,
        alignItems: () => <AlignItems propKey={key} initialValue={value} propsRef={propsRef} />,
        width: () => <Width propKey={key} initialValue={value} propsRef={propsRef} />,
        minHeight: () => <MinHeight propKey={key} initialValue={value} propsRef={propsRef} />,
        padding: () => <Padding propKey={key} initialValue={value} propsRef={propsRef} />,
        borderRadius: () => <BorderRadius propKey={key} initialValue={value} propsRef={propsRef} />,
        default: () => <Default propKey={key} initialValue={value} propsRef={propsRef} />,
      }}
    </Switch>
  )
}

function Display({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <PropertyButtons>
        <PropertyButton icon="icon-display-flex" propKey={propKey} propsRef={propsRef} newValue="flex" value={input} />
        <PropertyButton icon="icon-display-grid" propKey={propKey} propsRef={propsRef} newValue="grid" value={input} />
        <PropertyButton icon="icon-display-none" propKey={propKey} propsRef={propsRef} newValue="none" value={input} />
      </PropertyButtons>
    </>
  )
}

function Flex({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  return <InputField className={"w-6"} propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
}

function Gap({ initialValue, propKey, propsRef }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <InputSlider propKey={propKey} propsRef={propsRef} input={input} />
    </>
  )
}

function BorderRadius({ initialValue, propKey, propsRef }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <InputSlider propKey={propKey} propsRef={propsRef} input={input} />
    </>
  )
}

function BackgroundColor({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField className={"w-full"} propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
    </>
  )
}

function Border({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField className={"w-full"} propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
    </>
  )
}

function Padding({ initialValue, propKey, propsRef }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <InputSlider propKey={propKey} propsRef={propsRef} input={input} />
    </>
  )
}

function Width({ initialValue, propKey, propsRef }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <InputSlider propKey={propKey} propsRef={propsRef} input={input} max={1000} />
    </>
  )
}

function MinHeight({ initialValue, propKey, propsRef }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <InputSlider propKey={propKey} propsRef={propsRef} input={input} max={1000} />
    </>
  )
}

function FlexDirection({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <PropertyButtons>
        <PropertyButton icon="icon-global_flex-direction_row" propKey={propKey} propsRef={propsRef} newValue="row" value={input} />
        <PropertyButton icon="icon-global_flex-direction_column" propKey={propKey} propsRef={propsRef} newValue="column" value={input} />
        <PropertyButton icon="icon-global_flex-direction_row-reverse" propKey={propKey} propsRef={propsRef} newValue="row-reverse" value={input} />
        <PropertyButton icon="icon-global_flex-direction_column-reverse" propKey={propKey} propsRef={propsRef} newValue="column-reverse" value={input} />
      </PropertyButtons>
    </>
  )
}

function AlignItems({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  const type = input.get() === "row" || input.get() === "row-reverse" ? "row" : "column"

  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <PropertyButtons>
        <PropertyButton icon={`icon-${type}_align-items_flex-start`} propKey={propKey} propsRef={propsRef} newValue="flex-start" value={input} />
        <PropertyButton icon={`icon-${type}_align-items_flex-end`} propKey={propKey} propsRef={propsRef} newValue="flex-end" value={input} />
        <PropertyButton icon={`icon-${type}_align-items_center`} propKey={propKey} propsRef={propsRef} newValue="center" value={input} />
        <PropertyButton icon={`icon-${type}_align-items_stretch`} propKey={propKey} propsRef={propsRef} newValue="stretch" value={input} />
        <PropertyButton icon={`icon-${type}_align-items_baseline`} propKey={propKey} propsRef={propsRef} newValue="baseline" value={input} />
      </PropertyButtons>
    </>
  )
}

function JustifyContent({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  const type = input === "row" || input === "row-reverse" ? "row" : "column"

  return (
    <>
      <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
      <PropertyButtons>
        <PropertyButton icon={`icon-${type}_justify-content_flex-start`} propKey={propKey} propsRef={propsRef} newValue="flex-start" value={input} />
        <PropertyButton icon={`icon-${type}_justify-content_flex-end`} propKey={propKey} propsRef={propsRef} newValue="flex-end" value={input} />
        <PropertyButton icon={`icon-${type}_justify-content_center`} propKey={propKey} propsRef={propsRef} newValue="center" value={input} />
        <PropertyButton icon={`icon-${type}_justify-content_space-between`} propKey={propKey} propsRef={propsRef} newValue="space-between" value={input} />
        <PropertyButton icon={`icon-${type}_justify-content_space-around`} propKey={propKey} propsRef={propsRef} newValue="space-around" value={input} />
        <PropertyButton icon={`icon-${type}_justify-content_space-evenly`} propKey={propKey} propsRef={propsRef} newValue="space-evenly" value={input} />
      </PropertyButtons>
    </>
  )
}

function Default({ initialValue, propKey, propsRef }) {
  const input = useObservable(initialValue)
  return <InputField propKey={propKey} propsRef={propsRef} initialValue={initialValue} input={input} />
}

function InputField({ propKey, propsRef, input, className }) {
  const divRef = useRef()
  const inputRef = useRef()
  const spanRef = useRef()
  const inputValue = input.get()

  const size = useWindowSize()
  const debouncedSize = useDebounce(size, 1)

  useEffect(() => {
    const inputEl = inputRef.current
    const spanEl = spanRef.current
    const divEl = divRef.current
    if (inputEl && spanEl && divEl) {
      spanEl.innerText = inputValue.toString().replace(/\s/g, "&nbsp;")
      inputEl.style.width = Math.min(divEl.offsetWidth, spanEl.offsetWidth + 10) + "px"
    }
  }, [inputValue, debouncedSize])

  return (
    <div ref={divRef} className="w-full">
      <span className="break-words">{propKey}:&nbsp;</span>
      <span className="absolute invisible" ref={spanRef}></span>
      <Input
        ref={inputRef}
        className={twMerge(clsx("text-amber-300 text-center"), className)}
        value={inputValue}
        onChange={(e) => {
          input.set(e.target.value)
          propsRef.current[propKey] = e.target.value
          editElement(tree, selected.id.get(), { style: { ...selected.props.style.get(), ...propsRef.current } })
        }}
      />
    </div>
  )
}

function InputSlider({ propKey, propsRef, input, max = 100, step = 5 }) {
  return (
    <Slider
      value={[input.get()]}
      max={max}
      step={step}
      onValueChange={(value) => {
        input.set(value[0])
        propsRef.current[propKey] = value[0]
        editElement(tree, selected.id.get(), { style: { ...selected.props.style.get(), ...propsRef.current } })
      }}
    />
  )
}

function PropertyButtons({ children }) {
  return <div className="flex flex-wrap w-full my-1 gap-1 justify-center">{children}</div>
}

function PropertyButton({ icon, propKey, propsRef, newValue, value }) {
  const active = value.get() === newValue
  const element = selected.get()
  return (
    <i
      className={clsx(
        icon,
        active ? "bg-rose-500/25 border-rose-500 hover:bg-rose-800/25" : "bg-amber-500/25 border-amber-500 hover:bg-amber-800/25",
        "p-px text-lg rounded border cursor-pointer"
      )}
      onClick={() => {
        value.set(newValue)
        propsRef.current[propKey] = newValue
        editElement(tree, element.id, { style: { ...element.props?.style, ...propsRef.current } })
      }}
    />
  )
}
