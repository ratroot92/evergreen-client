import React from 'react';

export default function FormLayout({ children, title }: any) {
  return (
    <div
      className="card"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
    >
      <div className="card-header">
        <h4>{title}</h4>
      </div>

      <div className="card-body p-5">{children}</div>
    </div>
  );
}
