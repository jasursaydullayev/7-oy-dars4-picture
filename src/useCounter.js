import { useState } from "react"

export default () => {
    const [count, setCount] = useState(0)

    const increment =  () => setCount(count + 1)
    const decrement =  () => setCount(count - 1)

    return {
        count, increment, decrement
    }
}