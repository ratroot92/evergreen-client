import React from 'react';
import { useCss } from 'react-use';

interface ILabelProps {
  htmlFor: string;
  children?: string;
}

export default function Label(props: ILabelProps) {
  const labelStyles = useCss({
    height: '2.5rem',
    borderRadius: '0.2rem',
    border: '1px solid green',
    width: '30rem',
    '&:hover': {
      border: '1.5px solid green',
    },
    '&:focus': {
      border: '1px solid red!important',
    },
  });
  const inputWrapperStyles = useCss({
    margin: '0.3rem 0px 0.3rem 0.2rem', //['top' , 'right' , 'bottom' , 'left' ]
    borderRadius: '0.2rem',
    padding: '0.3rem 0px 0.3rem 0.2rem', //['top' , 'right' , 'bottom' , 'left' ]
    boxShadow:
      ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
    '&:hover': {
      // border: '1px solid red',
    },
  });

  return (
    <div className={`${inputWrapperStyles}`}>
      <label className={`${labelStyles}`} htmlFor={props.htmlFor}>
        {props.children}
      </label>
    </div>
  );
}
