import * as React from "react"
import { Frame } from "framer"
import { useStore } from "./store"

export function Search() {
    const [store, setStore] = useStore()

    React.useEffect(() => {
        setStore({ result: [...store.flatten] })
    }, [])

    const whileType = ({ target: { value: keyword } }) => {
        const result = keyword.trim()
            ? store.flatten.filter(c => c.toLowerCase().includes(keyword))
            : [...store.flatten]
        setStore({ result })
    }

    return (
        <input
            onChange={whileType}
            type="text"
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "999px",
                border: "none",
                textIndent: 30,
                fontSize: 14,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                outline: "none",
            }}
        ></input>
    )
}
