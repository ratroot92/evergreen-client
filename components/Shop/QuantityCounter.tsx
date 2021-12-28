import React, { FunctionComponent } from 'react'; // importing FunctionComponent

interface IQuantityCounter{
    quantity:number,
    setQuantity:Function,
}

    const  QuantityCounter:FunctionComponent<IQuantityCounter>=({quantity,setQuantity}) =>{





  
    const increment = () => {
        try {
            setQuantity( quantity + 1)
        }
        catch (err:any) {
            console.log(err.message)
        }
    }
    const decrement = () => {
        try {
            if (quantity !== 0) {
            setQuantity( quantity - 1)
            }
        }
        catch (err:any) {
            console.log(err.message)
        }
    }



    return (
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <button onClick={decrement} type="button" style={{ width: "40px", height: "40px" }}>-</button>
            <input min={0} type="number" id={"counterInput"} value={quantity} onChange={(e)=>console.log(e.target.value)} style={{ width: "60px", height: "40px" }} />
            <button type="button" onClick={increment} style={{ width: "40px", height: "40px" }}>+</button>

        </div>
    )
}


export default QuantityCounter