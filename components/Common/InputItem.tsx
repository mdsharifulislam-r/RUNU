import React from "react";

export default function InputItem(props:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>&{title?:string,error?:string}) {
  return (
    <div className="mb-2">
      <label htmlFor={props?.id} className="block text-slate-400">
        {props?.title?props.title:""}
      </label>
      <input
        {...props}
        className="w-full py-1.5 block bg-gray-700 rounded-md px-3 mt-1.5 focus:outline-none focus:border focus:border-emerald-500 text-gray-100"
       
      />
     {props.error && <span className="text-red-500">{props.error}</span>}
    </div>
  );
}
