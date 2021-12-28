import React, { FunctionComponent } from 'react'; // importing FunctionComponent

import { IProductVariant } from '../../types/product';

interface IVariantSelector{
  setVariant:Function,
   variant:string,
   productVariants:IProductVariant[]
}


const  VariantSelector:FunctionComponent<IVariantSelector>=({ setVariant, variant, productVariants })=> {
  React.useEffect(() => {
    setVariant(productVariants[0]._id)
  },[])
    return (
        <div className="d-flex flex-row justify-content-around align-items-center">
         <label htmlFor="variantSelector">Quantity</label>
        <select
          value={variant}
          className="form-control form-control-sm"
                  onChange={(e) => {
                    if (e.target.value!==undefined|| e.target.value==="") {
                      setVariant(e.target.value);
                    }
                    else {
                      setVariant(undefined);
                      
                    }
                  }}
                  id="variantSelector"
                  style={{ width: '100px' }}
                >
          {productVariants.map((variant: any, index: any) => {
                    return (
                      <option key={index} value={variant._id}>
                        {variant.quantity} GM
                      </option>
                    );
                  })}
                </select>   
        </div>
    )
}


export default VariantSelector