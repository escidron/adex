"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

export const TextAreaEditor = ({
  onChange,
  value,
}) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  var toolbarOptions = [
    
    ['bold', 'italic', 'underline'],        // toggled buttons
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  
  
  ];

  return (
    <div className="bg-white h-[100px]">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{toolbar:toolbarOptions}}

      />
    </div>
  );
};