/* eslint-disable @next/next/no-img-element */


import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import CartProductsTable from '../Cart/CartProductsTable';
import { AppContext } from '../../context/appContext';
import { mobileCodesList } from '../../constant/constant';


const CartModal = ({ show, onClose, children, title }: any) => {
  const {store}=React.useContext(AppContext)
  const [isBrowser, setIsBrowser] = React.useState<boolean>(false);
  const [checkout, setCheckout] = React.useState<boolean>(false)
  const [numberVerified, setNumberVerified] = React.useState<boolean>(false)
  const [code, setCode] = React.useState<string>()
  const [mobileNumber,setMobileNumber]=React.useState<string>()
  const [loading,setLoading]=React.useState<boolean>(false)
  
  
  
    React.useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const handleCloseClick = (e:React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClose();
    };
  
  const verifyNumber = () => {
    try {
        console.log("number verificcation ")
    }
    catch (err:any) {
      console.log(err.message)
    }
  }
  
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
          <StyledModalBody className="row h-auto">
            <div className="col-md-12 text-center ">
              {checkout ? (
                <div className="row">
                  <div className="col-md-12 border">
                    <div className="d-flex flex-row justify-content-center align-items-center">
                      
                      <select value={code} onChange={(e:any)=>setCode(e.target.value)} className="form-control" name="mobileCode" id="mobileCode" style={{width:"80px",borderRadius:"0px",textAlign:"center"}}>
                        <option value="">Code</option>
                        {mobileCodesList.map((code: number,index:number) => {
                          return (<option value={code} key={code+index}>{`0${code}`}</option>)
                        })}
                      </select>
                      <input value={mobileNumber} className="form-control" onChange={(e)=>setMobileNumber(e.target.value)} placeholder="Enter 7 digit number " type="text" minLength={7} maxlength={7} style={{width:"150px",borderRadius:"0px",textAlign:"center"}}/>
                        <button onClick={verifyNumber} disabled={code && mobileNumber?.length===7?false:true} className="btn btn-sm btn-success">Verify Number</button>
                    </div>
                  </div>
                 
              </div>
              ) : (<CartProductsTable />)}
           

            </div>
            <div className="col-md-12 text-center  ">
              {checkout ? (
              <button className="btn btn-success " disabled={!numberVerified} onClick={()=>setCheckout(!checkout)} type="button">Place Order </button>

              ): (
              <button className="btn btn-success " disabled={store.cartProducts.length===0?true:false} onClick={()=>setCheckout(!checkout)} type="button">Shop More </button>
                
              )}
            </div>
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