import React from 'react';
import ReactLoading from 'react-loading';

const ReactLoader = ({ type = 'bars', color = '#000' }: any) => (
  <div className="row">
    <div className="col-md-12 d-flex flex-row justify-content-center align-items-center">
      <ReactLoading type={type} color={color} height={'60%'} width={'60%'} />
    </div>
  </div>
);

export default ReactLoader;
