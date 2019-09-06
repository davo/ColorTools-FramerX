import * as React from "react"
import { Frame, Color } from "framer"

export function Spinner() {
    return (
        <Frame
            size={"100%"}
            radius="100%"
            background={
                "conic-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0.25))"
            }
            animate={{
                rotate: 360,
            }}
            transition={{
                duration: 1,
                ease: "linear",
                loop: Infinity,
            }}
        ></Frame>
    )
}
