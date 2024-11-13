import { observable } from "@legendapp/state"
import { observe } from "@legendapp/state"
import { Switch, useObservable } from "@legendapp/state/react"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

import { HtmlDisplay } from "../3dgui/HtmlDisplay"
import { Slider } from "../ui/Slider"
import { Input } from "../ui/Input"
import { SortableList } from "../ui/SortableList"
import { classes, selected, tree } from "./state"
import { objectToKeyValueArray, editElement } from "./helpers"

const style = observable([])
observe(selected, (e) => style.set(objectToKeyValueArray({ ...classes.get()[e.value?.props?.className], ...e.value?.props?.style })))

export function StyleBar(props) {
  return (
    <HtmlDisplay {...props}>
      <div
        className="w-full h-full bg-red-500/20 border border-rose-500/50 overflow-y-auto overflow-x-hidden rounded-lg"
        style={{ backgroundColor: "hsla(0, 100%, 50%, 0.1)", scrollbarGutter: "stable both-edges" }}
      >
        <div className="py-1 text-white font-open-sans text-base box-border">
          <Content />
        </div>
      </div>
    </HtmlDisplay>
  )
}

function Content() {
  return (
    <SortableList
      items={style.get()}
      setItems={style.set}
      renderItem={(item) => (
        <div className="m-1 px-2 text-center  border-2 rounded cursor-default border-rose-500/50 bg-rose-500/20 hover:bg-blue-500/20 hover:border-blue-500">
          <Property item={item} />
        </div>
      )}
    />
  )
}

function Property({ item }) {
  const [key, value] = Object.entries(item)[0]
  return (
    <>
      <Switch value={key}>
        {{
          display: () => <Display propertyKey={key} initialValue={value} />,
          flex: () => <Flex propertyKey={key} initialValue={value} />,
          gap: () => <Gap propertyKey={key} initialValue={value} />,
          backgroundColor: () => <BackgroundColor propertyKey={key} initialValue={value} />,
          border: () => <Border propertyKey={key} initialValue={value} />,
          flexDirection: () => <FlexDirection propertyKey={key} initialValue={value} />,
          justifyContent: () => <JustifyContent propertyKey={key} initialValue={value} />,
          alignItems: () => <AlignItems propertyKey={key} initialValue={value} />,
          width: () => <Width propertyKey={key} initialValue={value} />,
          minHeight: () => <MinHeight propertyKey={key} initialValue={value} />,
          padding: () => <Padding propertyKey={key} initialValue={value} />,
          borderRadius: () => <BorderRadius propertyKey={key} initialValue={value} />,
          default: () => <Default propertyKey={key} initialValue={value} />,
        }}
      </Switch>
    </>
  )
}

function Display({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <div className="flex gap-1 justify-center">
        <PropertyButton iconClass="icon-display-flex" propertyKey={propertyKey} newValue="flex" value={input} />
        <PropertyButton iconClass="icon-display-grid" propertyKey={propertyKey} newValue="grid" value={input} />
        <PropertyButton iconClass="icon-display-none" propertyKey={propertyKey} newValue="none" value={input} />
      </div>
    </>
  )
}

function Flex({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  return <InputField className={"w-6"} propertyKey={propertyKey} initialValue={initialValue} input={input} />
}

function Gap({ initialValue, propertyKey }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <InputSlider propertyKey={propertyKey} input={input} />
    </>
  )
}

function BorderRadius({ initialValue, propertyKey }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <InputSlider propertyKey={propertyKey} input={input} />
    </>
  )
}

function BackgroundColor({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField className={"w-full"} propertyKey={propertyKey} initialValue={initialValue} input={input} />
    </>
  )
}

function Border({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField className={"w-full"} propertyKey={propertyKey} initialValue={initialValue} input={input} />
    </>
  )
}

function Padding({ initialValue, propertyKey }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <InputSlider propertyKey={propertyKey} input={input} />
    </>
  )
}

function Width({ initialValue, propertyKey }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <InputSlider propertyKey={propertyKey} input={input} max={1000} />
    </>
  )
}

function MinHeight({ initialValue, propertyKey }) {
  const input = useObservable(parseInt(initialValue))
  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <InputSlider propertyKey={propertyKey} input={input} max={1000} />
    </>
  )
}

function FlexDirection({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <div className="flex gap-1 justify-center">
        <PropertyButton iconClass="icon-global_flex-direction_row" propertyKey="flexDirection" newValue="row" value={input} />
        <PropertyButton iconClass="icon-global_flex-direction_column" propertyKey="flexDirection" newValue="column" value={input} />
        <PropertyButton iconClass="icon-global_flex-direction_row-reverse" propertyKey="flexDirection" newValue="row-reverse" value={input} />
        <PropertyButton iconClass="icon-global_flex-direction_column-reverse" propertyKey="flexDirection" newValue="column-reverse" value={input} />
      </div>
    </>
  )
}

function AlignItems({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  const type = input.get() === "row" || input.get() === "row-reverse" ? "row" : "column"

  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <div className="flex gap-1 justify-center">
        <PropertyButton iconClass={`icon-${type}_align-items_flex-start`} propertyKey="alignItems" newValue="flex-start" value={input} />
        <PropertyButton iconClass={`icon-${type}_align-items_flex-end`} propertyKey="alignItems" newValue="flex-end" value={input} />
        <PropertyButton iconClass={`icon-${type}_align-items_center`} propertyKey="alignItems" newValue="center" value={input} />
        <PropertyButton iconClass={`icon-${type}_align-items_stretch`} propertyKey="alignItems" newValue="stretch" value={input} />
        <PropertyButton iconClass={`icon-${type}_align-items_baseline`} propertyKey="alignItems" newValue="baseline" value={input} />
      </div>
    </>
  )
}

function JustifyContent({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  const type = input === "row" || input === "row-reverse" ? "row" : "column"

  return (
    <>
      <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
      <div className="flex gap-1 justify-center">
        <PropertyButton iconClass={`icon-${type}_justify-content_flex-start`} propertyKey="justifyContent" newValue="flex-start" value={input} />
        <PropertyButton iconClass={`icon-${type}_justify-content_flex-end`} propertyKey="justifyContent" newValue="flex-end" value={input} />
        <PropertyButton iconClass={`icon-${type}_justify-content_center`} propertyKey="justifyContent" newValue="center" value={input} />
        <PropertyButton iconClass={`icon-${type}_justify-content_space-between`} propertyKey="justifyContent" newValue="space-between" value={input} />
        <PropertyButton iconClass={`icon-${type}_justify-content_space-around`} propertyKey="justifyContent" newValue="space-around" value={input} />
        <PropertyButton iconClass={`icon-${type}_justify-content_space-evenly`} propertyKey="justifyContent" newValue="space-evenly" value={input} />
      </div>
    </>
  )
}

function Default({ initialValue, propertyKey }) {
  const input = useObservable(initialValue)
  return <InputField propertyKey={propertyKey} initialValue={initialValue} input={input} />
}

function InputField({ propertyKey, input, className }) {
  return (
    <>
      <span>{propertyKey}:&nbsp;</span>
      <Input
        className={twMerge(clsx("text-amber-300 w-16 text-center"), className)}
        value={input.get()}
        onChange={(e) => {
          input.set(e.target.value)
          editElement(tree, selected.id.get(), { style: { ...selected.props.style.get(), [propertyKey]: e.target.value } })
        }}
      />
    </>
  )
}

function InputSlider({ propertyKey, input, max = 100, step = 5 }) {
  return (
    <Slider
      value={[input.get()]}
      max={max}
      step={step}
      onValueChange={(value) => {
        input.set(value[0])
        editElement(tree, selected.id.get(), { style: { ...selected.props.style.get(), [propertyKey]: value[0] } })
      }}
    />
  )
}

function PropertyButton({ iconClass, propertyKey, newValue, value }) {
  const active = value.get() === newValue
  const element = selected.get()
  return (
    <i
      className={clsx(
        iconClass,
        active ? "bg-rose-500/25 border-rose-500 hover:bg-rose-800/25" : "bg-amber-500/25 border-amber-500 hover:bg-amber-800/25",
        "my-1 p-px text-lg rounded  border  cursor-pointer"
      )}
      onClick={() => {
        editElement(tree, element.id, { style: { ...element.props?.style, [propertyKey]: newValue } })
        value.set(newValue)
      }}
    />
  )
}
