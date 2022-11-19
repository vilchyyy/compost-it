import React from "react";

export default function Input({label, input, ...props}){
    return (
        <div className="flex flex-col">
            <label className="text-gray-50">{label}</label>
            <input ref={input} className="h-12 rounded-md border-gray-700 border-2" type="text" {...props}/>
        </div>
    )
}