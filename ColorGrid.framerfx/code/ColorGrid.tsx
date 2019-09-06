import * as React from "react"
import {
    useContext,
    useReducer,
    useLayoutEffect,
    useEffect,
    useState,
} from "react"
import { useIntersect } from "./hooks/useIntersect"

import {
    Frame,
    Scroll,
    addPropertyControls,
    ControlType,
    useCycle,
    MotionStyle,
    AnimatePresence,
} from "framer"
import { colors, getPropsFromColor } from "./utils/Utils"
import { ColorCard } from "./canvas"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api
// ES6-React Reference: http://bit.ly/framer-react

type ColorGridProps = {
    text: string
}

const buildThresholdArray = () =>
    Array.from(Array(colors.length).keys(), i => i / colors.length)

// const createColorGrid = () => {
//   let dummy;
//   formatCard();

//   // Start looping the color dataset

//   _.map(_.slice(colors, 0, colors.length), (colorName, index) => {
//     const c = getNewColor(colorName);

//     if (index % columns === 0) {
//       card.maxHeight = card.height * card.index;
//       card.index += 1;
//     }

//     const color = colorCard.copy();
//     color.createChildrenRefs();

//     color.props = {
//       visible: true,
//       name: `color${colorName}`,
//       parent: colorCollection.content
//     };

//     color.classList.add("color");
//     color.classList.add(_.camelCase(colorName));

//     const element = color._element;
//     element.setAttribute("data-colorName", colorName);
//     element.setAttribute("data-hue", c.hue);
//     element.setAttribute("data-saturation", c.saturation);
//     element.setAttribute("data-lightness", c.lightness);
//     element.setAttribute("data-hex", c.hex);

//     color.colorTemplate.props = {
//       width: card.width,
//       height: card.templateHeight,
//       backgroundColor: c.rgb
//     };

//     color.attributes.props = {
//       width: card.width,
//       x: 18,
//       y: Align.bottom(-54)
//     };

//     color.rgb.props = {
//       x: 18,
//       y: Align.bottom(-18)
//     };

//     color.attributes.template = {
//       colorName
//     };

//     color.rgb.template = {
//       rgb: c.rgbString
//     };

//     color.hex.template = {
//       hex: c.hex
//     };

//     color.hsl.template = {
//       h: c.hue
//     };

//     color.hsl.template = {
//       s: c.saturation
//     };

//     return (color.hsl.template = {
//       l: c.lightness
//     });
//   });
// };

const itemsHeightTotal = (collection: string[], height: number) =>
    (collection.length / 3) * height

export function ColorGrid(props) {
    const [cardProps, setCardProps] = useState({ width: null, height: null })
    const [contentHeight, setContentHeight] = useState(0)
    const { width, height } = props

    // const { width } = useWindowDimensions()

    const colorProps = colorName => getPropsFromColor(colorName)

    useLayoutEffect(() => {
        setContentHeight(
            itemsHeightTotal(
                colors,
                ColorCard.defaultProps._sizeOfMasterOnCanvas.height
            )
        )
        setCardProps({
            width: ColorCard.defaultProps._sizeOfMasterOnCanvas.width,
            height: ColorCard.defaultProps._sizeOfMasterOnCanvas.height,
        })
    }, [ColorCard.defaultProps])

    const [ref, entry] = useIntersect({
        //@ts-ignore
        threshold: buildThresholdArray(),
    })

    // gridTemplateColumns: "repeat(auto-fill, '20%')",
    let wrapper: MotionStyle = {
        display: "grid",
        padding: 20,
        gridRowGap: 24,
        gridColumnGap: 24,
        gridAutoRows: `${cardProps.height}px`,
        gridTemplateColumns: `repeat(auto-fill, ${cardProps.width}px)`,
    }

    // ref={ref}>

    const current = colorName =>
        React.useMemo(() => colorProps(colorName), [colorName])

    return (
        <>
            <Scroll
                width={width}
                height={height}
                background="none"
                contentHeight={contentHeight}
                overflow="visible"
            >
                <Frame
                    width={width}
                    style={{ height: contentHeight, ...wrapper }}
                    background="none"
                    overflow="hidden"
                >
                    {colors.map((colorName, index) => {
                        const c = current(colorName)

                        return (
                            <Frame
                                width={cardProps.width}
                                key={index}
                                height={cardProps.height}
                                style={{ position: "relative" }}
                                background="none"
                            >
                                <ColorCard
                                    data-colorName={colorName}
                                    style={{ position: "relative" }}
                                    data-lazy="colorCard"
                                    width={cardProps.width}
                                    height={cardProps.height}
                                    // initial={{ opacity: 0 }}
                                    // animate={{ opacity: 1 }}
                                    // exit={{ opacity: 0 }}
                                    data-hue={c.hue}
                                    data-saturation={c.saturation}
                                    data-lightness={c.lightness}
                                    data-hex={c.hex}
                                    //@ts-ignore
                                    background={c.hex}
                                    attributes={colorName}
                                    //@ts-ignore
                                    rgb={c.rgbString}
                                    //@ts-ignore
                                    hex={c.hex}
                                    //@ts-ignore
                                    hsl={`${c.hue}, ${c.saturation}, ${c.lightness}`}
                                />
                            </Frame>
                        )

                        //     const c = getNewColor(colorName);
                        //     if (index % columns === 0) {
                        //       card.maxHeight = card.height * card.index;
                        //       card.index += 1;
                        //     }
                    })}
                </Frame>
            </Scroll>
        </>
    )
}

{
    /* <AnimatePresence initial={true}>
</AnimatePresence> */
}
// ColorGrid.defaultProps = {
//     text: "Example from VS Code",
// }

// addPropertyControls(ColorGrid, {
//     text: {
//         type: ControlType.String,
//         defaultValue: ColorGrid.defaultProps.text,
//         placeholder: "Type something…",
//     },
// })
