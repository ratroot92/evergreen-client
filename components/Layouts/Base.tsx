import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface IProps {
  Component: any;
}

export default function Base({ Component }: IProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Header />
        </div>
        <div className="col-md-12 p-5 ">
          <div className="row products-wrapper" style={{}}>
            <Component />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
