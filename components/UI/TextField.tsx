/*eslint-disable*/

import React from 'react';

function TextField({ defaultValue, label, required, error, variant }) {
  return (
    <TextField
      required={required ? true : false}
      id="outlined-required"
      label="Required"
      defaultValue={defaultValue}
      variant={variant}
    />
  );
}
export default TextField;
