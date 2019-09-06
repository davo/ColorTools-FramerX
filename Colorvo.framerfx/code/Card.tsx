import * as React from "react"
import { Stack, Color, RenderTarget } from "framer"
import { ColorFormat } from "./enums"
const { hasRestrictions } = RenderTarget

export function Card({ name = "LightSkyBlue", format = ColorFormat.Hex, key }) {
    // Styles:
    const colorNameStyle: React.CSSProperties = {
        fontSize: 20,
        fontWeight: 500,
        cursor: "default",
        color:
            Color.toHusl(Color(name)).l > 70
                ? Color.darken(Color(name), 60).toValue()
                : Color.brighten(Color(name), 50).toValue(),
    }

    const colorFormatStyle: React.CSSProperties = {
        fontSize: 12,
        textTransform: "uppercase",
        cursor: "default",
        color: "black",
    }
    // Nodes:
    return (
        <Stack
            width={"100%"}
            height={100}
            background={name}
            radius={5}
            gap={0}
            overflow={"hidden"}
            position="relative"
            // @ts-ignore
            initial={!hasRestrictions() && { scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.1 }}
            layoutTransition={{ type: "spring", damping: 100, stiffness: 100 }}
            key={key}
        >
            <Stack
                width="1fr"
                height="1fr"
                distribution="end"
                alignment="start"
                padding={10}
                // @ts-ignore
                style={colorNameStyle}
            >
                <p>{name}</p>
            </Stack>
            <Stack
                width="1fr"
                height={30}
                bottom={0}
                distribution="center"
                alignment="start"
                background="white"
                paddingLeft={10}
                // @ts-ignore
                style={colorFormatStyle}
            >
                <p>{Color[`to${format}String`](Color(name))}</p>
            </Stack>
        </Stack>
    )
}

// import { addPropertyControls, ControlType } from "framer"

// Card.defaultProps = {
//     name: "DeepSkyBlue",
// }

// addPropertyControls(Card, {
//     name: {
//         type: ControlType.String,
//         title: "Color Name",
//     },
// })
