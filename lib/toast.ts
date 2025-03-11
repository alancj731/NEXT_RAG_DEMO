'use client'
import { toast, TypeOptions, Slide } from 'react-toastify';

export const showToast = (message: string, type: TypeOptions = 'info') => {
    toast(message, {
      position: "top-center",   
      autoClose: 3000,         
      type,                   
      theme: "dark",          
      hideProgressBar : true,
      transition: Slide,
      style: {
        backgroundColor: 'gray', 
        color: 'white',
        fontSize: '12px',         
        borderRadius: '5px',     
        padding: '5px',          
      }
    })
  };