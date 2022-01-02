import React from 'react';
import CategoryCard from '../Shop/CategoryCard';

export interface ITopCategories {
  categories: any[];
}

const TopCategories = ({ categories }: ITopCategories) => {
  return (
    <div className="row">
      <div className="col-md-12 text-center mt-5 mb-5">
        <h3 className="text-success">Top Categories</h3>
      </div>
      <>
        {categories.length > 0 ? (
          <>
            {categories.map((cat: any) => {
              return (
                <div
                  key={cat._id}
                  className="col-lg-3 col-md-6 col-sm-12 "
                  style={{ height: '300px' }}
                >
                  <CategoryCard category={cat} />
                </div>
              );
            })}
          </>
        ) : (
          <div className="col-md-12  text-center">
            <h5>No top categories avaliable</h5>
          </div>
        )}
      </>
    </div>
  );
};

export default TopCategories;
