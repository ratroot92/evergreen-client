/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import React from 'react';
import * as FaIcons from 'react-icons/fa'
import { AppContext } from '../../context/appContext';
import CartModal from '../../components/Modal/CartModal'
import Cart from '../Cart/CartProductsTable'
export default function Header() {
  const { store,setState }: any = React.useContext(AppContext)
  const [showModal, setShowModal] = React.useState<boolean>(false);
  return (
    <div className='row'>
      <div className='col-lg-3 col-md-12 col-sm-12 border d-flex flex-row justify-content-center align-items-center' >
        <h4>EVERGREEN</h4>
      </div>
      <div className='col-lg-6 col-md-12 col-sm-12'>
        <ul className='list-inline list d-flex flex-row justify-content-between align-items-baseline'>
          <li className='list-group-item border border-0 '>DryFruits</li>
          <li className='list-group-item border border-0 '>Condiments</li>
          <li className='list-group-item border border-0 '>Dates</li>
          <li className='list-group-item border border-0 '>Others</li>

          
        </ul>
      </div>
      <div className='col-lg-3 col-md-12 col-sm-12 border d-flex flex-row justify-content-center align-items-center' >
        <div className="bg-success w-50 p-2 d-flex flex-row justify-content-center align-items-center">
          <span onClick={() => setShowModal(true)} className="text-white d-flex flex-row justify-content-center align-items-center border border-white" style={{ borderRadius: "50%", height: "30px", width: "30px" }}>{store.cartProducts.length}</span>
          <FaIcons.FaShoppingCart color="yellow" size={40} />
          <CartModal
            // children={()=><Cart />}
            onClose={() => setShowModal(false)}
            show={showModal}  title={"Cart"}       />
        </div>
      </div>
   </div>
  );
}
