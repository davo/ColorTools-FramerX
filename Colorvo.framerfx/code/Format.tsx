import * as React from "react"
import { Frame, Stack } from "framer"
import { useStore } from "./store"
import { ColorFormat } from "./enums"

export function Format() {
    const [store, setStore] = useStore()

    const variants = {
        normal: {
            backgroundColor: "transparent",
            fontSize: 13,
            color: "hsla(0, 0%, 100%, 0.5)",
            cursor: "default",
        },
        active: {
            backgroundColor: "hsla(0, 0%, 100%, 0.1)",
            color: "hsla(0, 0%, 100%, 0.75)",
        },
    }

    return (
        <Stack
            size={"100%"}
            overflow={"hidden"}
            direction={"horizontal"}
            gap={0}
            radius={5}
            border={"1px solid hsla(0, 0%, 100%, 0.2)"}
            background="hsla(0, 0%, 100%, 0.05)"
        >
            {Object.keys(ColorFormat).map(format => (
                <Frame
                    key={format}
                    width={"1fr"}
                    style={variants.normal}
                    variants={variants}
                    animate={store.format === format ? "active" : "normal"}
                    onTap={() => setStore({ format: format as ColorFormat })}
                    whileTap={{ scale: 0.8 }}
                >
                    {format.toUpperCase()}
                </Frame>
            ))}
        </Stack>
    )
}
