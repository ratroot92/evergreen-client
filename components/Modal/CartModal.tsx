/* eslint-disable @next/next/no-img-element */


import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import CartProductList from '../Cart/CartProductList';


const CartModal = ({ show, onClose, children, title }:any) => {
    const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
  
    React.useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const handleCloseClick = (e:React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClose();
    };
  
    const modalContent = show ? (
      <StyledModalOverlay>
        <StyledModal>
          <StyledModalHeader>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </StyledModalHeader>
          {title && <StyledModalTitle>{title}</StyledModalTitle>}
          {/* <StyledModalBody>{children}</StyledModalBody> */}
          <StyledModalBody>
               <CartProductList/>
          </StyledModalBody>

        </StyledModal>
      </StyledModalOverlay>
    ) : null;
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")!
      );
    } else {
      return null;
    }
};
const StyledModalTitle = styled.div`
  `;
  
  const StyledModalBody = styled.div`
    padding-top: 10px;
  `;
  
  const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
  `;
  
  const StyledModal = styled.div`
    background: white;
    width: 500px;
    height: 600px;
    border-radius: 15px;
    padding: 15px;
  `;
  const StyledModalOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `;
  
  export default CartModal;