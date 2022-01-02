import React from 'react';

export default function VariantSelector({
  setVariant,
  productVariants,
  productQuantity,
}: any) {
  return (
    <div className="d-flex flex-row justify-content-around align-items-center">
      <label htmlFor="variantSelector">Quantity</label>
      <select
        onChange={(e) => {
          if (e.target.value) {
            if (productQuantity === 0) {
              alert('Select quantity');
            } else {
              setVariant({
                isSelected: true,
                variant: e.target.value,
              });
            }
          }
        }}
        id="variantSelector"
        className="form-control"
        style={{ width: '100px' }}
      >
        {productVariants.map((variant: any, index: any) => {
          return (
            <option key={index} value={variant.quantity}>
              {variant.quantity}-{variant.unit}
            </option>
          );
        })}
      </select>
    </div>
  );
}
