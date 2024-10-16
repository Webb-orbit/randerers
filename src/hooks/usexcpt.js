import { useEffect, useState } from "react"
// LOADING - BOLLEAN
// ERROR - BOLLEAN
// DATA - OBJ

const useExcpt = ({ payload }) => {
    const [data, setdata] = useState({})
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const find = await payload
                if (find) {
                    setdata(find)
                    setloading(false)
                }
            } catch (error) {
                seterror(true)
                console.log(error);
            }
        })()

        return () => {
            setdata({})
            seterror(false)
            setloading(true)
        }
    }, [payload])

    return { loading, data, error }
}

export default useExcpt