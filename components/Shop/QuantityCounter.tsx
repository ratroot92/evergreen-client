import React from 'react'
export default function QuantityCounter() {





    const [counter, setCounter] = React.useState<number>(0);
    const increment = () => {
        try {
            setCounter( counter + 1)
        }
        catch (err:any) {
            console.log(err.message)
        }
    }
    const decrement = () => {
        try {
            if (counter !== 0) {
            setCounter( counter - 1)
            }
        }
        catch (err:any) {
            console.log(err.message)
        }
    }



    return (
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <button type="button" onClick={increment} style={{ width: "40px", height: "40px" }}>+</button>
            <input min={0} type="number" id={"counterInput"} value={counter} onChange={(e)=>console.log(e.target.value)} style={{ width: "60px", height: "40px" }} />
            <button onClick={decrement} type="button" style={{ width: "40px", height: "40px" }}>-</button>
        </div>
    )
}
