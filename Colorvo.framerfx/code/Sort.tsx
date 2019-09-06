import * as React from "react"
import { Frame, Stack, Color } from "framer"
import { useStore } from "./store"
import { Sorting } from "./enums"

export function Sort() {
    const [store, setStore] = useStore()

    const sort = sorting => {
        switch (Sorting[sorting]) {
            case Sorting.Alphabetical:
                return [...store.result].sort()
            case Sorting.Color:
                return [...store.result]
            case Sorting.Luminance:
                return [...store.result].sort((a, b) => Color(b).l - Color(a).l)
        }
    }

    React.useEffect(() => {
        setStore({ sorted: sort(store.sorting) })
    }, [store.sorting, store.result])

    const variants = {
        normal: {
            color: "hsla(0, 0%, 100%, 0.5)",
            backgroundColor: "transparent",
            fontSize: 13,
            cursor: "default",
        },
        active: {
            color: "hsla(0, 0%, 100%, 0.75)",
            backgroundColor: "hsla(0, 0%, 100%, 0.1)",
        },
    }

    return (
        <Stack
            size={"100%"}
            overflow={"hidden"}
            direction={"vertical"}
            gap={0}
            radius={5}
            border={"1px solid hsla(0, 0%, 100%, 0.2)"}
            background="hsla(0, 0%, 100%, 0.05)"
        >
            {Object.keys(Sorting).map(sorting => {
                const isActive = store.sorting === sorting
                return (
                    <Stack
                        key={sorting}
                        width={"1fr"}
                        height={"1fr"}
                        distribution="center"
                        alignment="start"
                        paddingLeft={10}
                        // @ts-ignore
                        style={variants.normal}
                        variants={variants}
                        animate={isActive ? "active" : "normal"}
                        onTap={() => setStore({ sorting: sorting as Sorting })}
                        whileTap={!isActive && { scale: 0.98 }}
                    >
                        <p>{Sorting[sorting]}</p>
                    </Stack>
                )
            })}
        </Stack>
    )
}
