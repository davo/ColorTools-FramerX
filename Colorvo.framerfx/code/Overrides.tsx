import { Override, RenderTarget } from "framer"
import { useStore } from "./store"

export function MainBackground(): Override {
    return {
        backgroundColor: "transparent",
    }
}

export function ResultCounter(): Override {
    const [store, setStore] = useStore()
    return {
        text: `Showing ${store.result.length} colors`,
    }
}

export function DisplayNoResult(): Override {
    const [store, setStore] = useStore()
    return {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: store.result.length ? 0 : 1,
        },
        transition: {
            duration: store.result.length ? 0 : 0.5,
        },
    }
}

// export function DisplaySpinner(): Override {
//     const [store, setStore] = useStore()
//     return {
//         visible: !store.loaded,
//     }
// }
