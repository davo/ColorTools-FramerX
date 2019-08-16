import * as React from "react"
import { useContext, useReducer, useLayoutEffect, useEffect, useState } from "react"
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
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

const itemsHeightTotal = (collection: string[], height: number) => collection.length * height

const wrapper: MotionStyle = {
    display: "grid",
    gridGap: "10px",
    gridTemplateColumns: "repeat(auto-fill, '20%')",
}

export function ColorGridPerf(props) {
    const [cardProps, setCardProps] = useState({})
    const [contentHeight, setContentHeight] = useState(0)
    const { width = 600, height = 900 } = props

    const colorProps = colorName => getPropsFromColor(colorName)

    useLayoutEffect(() => {
        setContentHeight(itemsHeightTotal(colors, ColorCard.defaultProps._sizeOfMasterOnCanvas.height))
    }, [])

    return (
        <>
            <AutoSizer>
                {({ height, width }) => (

                    <List
                        className="List"
                        height={height}
                        itemCount={1000}
                        itemSize={35}
                        width={width}
                    >
                        <Frame width={width} height={contentHeight} style={wrapper} background="none">
                            <AnimatePresence initial={false}>
                                {colors.map((colorName, index) => {
                                    // console.log(colorName)

                                    const c: {} = colorProps(colorName)

                                    // console.log(c && c.hex)

                                    return (
                                        <ColorCard
                                            key={index}
                                            width="375px"
                                            style={{ position: "relative" }}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            //@ts-ignore
                                            background={c.hex}
                                            attributes={colorName}
                                            rgb={c.rgbString}
                                            hex={c.hex}
                                            positionTransition
                                        ></ColorCard>
                                    )

                                    //     const c = getNewColor(colorName);

                                    //     if (index % columns === 0) {
                                    //       card.maxHeight = card.height * card.index;
                                    //       card.index += 1;
                                    //     }
                                })}
                            </AnimatePresence>
                        </Frame>
                    </List>
                )}
            </AutoSizer>
        </>
    )
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
