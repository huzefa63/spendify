'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ContextMenu from "./ContextMenu";
import { useMyContext } from "./ContextProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

function RenderContextMenu() {
    const {menuPosition,transactionObj,setMenuPosition,setShowModel,setFormType} = useMyContext();
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:handleDelete,
        onSuccess:()=>queryClient.invalidateQueries(['transactions'])
    })
    async function handleDelete(){
        const token = localStorage.getItem('token');
       try{
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/deleteTransaction/${transactionObj._id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(res.data.status === 'success'){
            setMenuPosition({});
            // toast.success('transaction deleted successfully!');
            return true;
        }

       }catch(err){
        // toast.err('unable to delete transaction! please try again');
        return false;
       }
    }
    if(menuPosition?.top && menuPosition?.right){
        return (
          <ContextMenu>
            <div className="flex flex-col w-36">
              <button  onClick={()=>{
                setMenuPosition({})
                setFormType('update');
                setShowModel(true);
              }} className="bg-transparent text-green-600 border-b-1 border-b-[var(--border)] text-left lg:py-3 px-2 py-1.5 lg:pl-3  hover:bg-[var(--surface)] hover:cursor-pointer transition-all duration-300 flex items-center gap-2 text-lg tracking-wider">
                <FaEdit /> edit
              </button>
              <button
                onClick={() =>
                  toast?.promise(mutate.mutateAsync(), {
                    loading: "deleting transaction...",
                    success: <b>transaction deleted successfully!</b>,
                    error: <b>unable to delete transaction! please try again.</b>,
                  })
                }
                className="bg-transparent text-red-600 text-left lg:py-3 px-2 py-1.5 lg:pl-3  hover:bg-[var(--surface)] hover:cursor-pointer transition-all duration-300 flex items-center gap-2 text-lg tracking-wider"
              >
                <FaTrash /> delete
              </button>
            </div>
          </ContextMenu>
        );
    }
}

export default RenderContextMenu
