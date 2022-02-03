import React from 'react';
import Label from './Label';
function FormGroup({ children, label }: any) {
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-start mt-2 mb-2"
      style={{ height: 'auto' }}
    >
      <div className=" w-25">
        <Label>{label}</Label>
      </div>
      <div className=" w-75">{children}</div>
    </div>
  );
}

export default FormGroup;
