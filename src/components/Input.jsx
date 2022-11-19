import React from "react";

export default function Input({label}){
    return (
        <div className="flex flex-col">
            <label className="text-gray-50">{label}</label>
            <input className="h-8 rounded-md border-gray-700 border-2" type="text" />
        </div>
    )
}