/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
export default function CategoryCard({ category }: any) {
  return (
    <div
      className="w-100 h-100   d-flex flex-column justify-content-center align-items-center "
      style={{
        backgroundColor: 'lightgray',
      }}
    >
      <Link href={`/shop/${category._id}`}>
        <img
          src={category.coverImage}
          className="img-fluid"
          alt=""
          style={{ width: '250px', height: '190px', borderRadius: '2px' }}
        />
      </Link>
      <div className="d-flex flex-row justify-content-center align-items-center ">
        <h5 className="text-success mt-2"> {category.name}</h5>
      </div>
    </div>
  );
}
