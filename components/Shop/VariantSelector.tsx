import React from 'react'

export default function VariantSelector({setVariant,productVariants}:any) {
    return (
        <div className="d-flex flex-row justify-content-around align-items-center">
         <label htmlFor="variantSelector">Quantity</label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      setVariant({
                        isSelected: true,
                        variant: e.target.value,
                      });
                    }
                  }}
                  id="variantSelector"
                  className=""
                  style={{ width: '100px' }}
                >
                  {productVariants.map((variant: any, index: any) => {
                    return (
                      <option key={index} value={variant.variant}>
                        {variant.variant}
                        {variant.unit}
                      </option>
                    );
                  })}
                </select>   
        </div>
    )
}
