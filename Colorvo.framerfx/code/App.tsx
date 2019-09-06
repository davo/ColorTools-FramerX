import * as React from "react"
// import * as canvas from "./canvas"
import { Frame, Stack, Scroll, AnimatePresence, MotionStyle } from "framer"
import { Card } from "./Card"
import { useStore } from "./store"
import { ColorFormat } from "./enums"

export function CardCollection() {
    const [store] = useStore()

    const gridStyle: MotionStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gridGap: 20,
        padding: 20,
        height: "unset",
        backgroundColor: "transparent",
    }

    return (
        <Scroll width={"100%"} height={"100%"}>
            <Frame width={"100%"} style={gridStyle}>
                <AnimatePresence>
                    {store.sorted.map(c => (
                        <Card name={c} format={store.format} key={c} />
                    ))}
                </AnimatePresence>
            </Frame>
        </Scroll>
    )
}

/* 
Issues: 
- Scroll doesn't automatically adjust it's content height
- Text content is not selectable by cursor
- Bad initial performance on preview
 */
