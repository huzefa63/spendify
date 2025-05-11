'use client';
import { createPortal } from "react-dom"
import { useMyContext } from "./ContextProvider"
import { useEffect, useRef } from "react";

function ContextMenu({children}) {
    const {menuPosition,setMenuPosition,transactionId} = useMyContext();
    const ref = useRef(null);
    console.log('context',menuPosition);
    useEffect(function(){
        function handleClose(e){
            if(ref.current && !ref.current.contains(e.target)){
                setMenuPosition({});
            }
        }
        document.addEventListener('click',handleClose);
        return ()=> document.removeEventListener('click',handleClose);
    },[])
    return createPortal(
         <div
                    ref={ref}
                    style={{ top: menuPosition?.top, right: menuPosition?.right }}
                    className={` rounded-md bg-[var(--background)] border-1 border-[var(--border)] fixed  z-[10000]`}
                  >

                      {children}
                  </div>,
                      document.getElementById("menu")
    );
}

export default ContextMenu
