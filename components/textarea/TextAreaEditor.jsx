"use client";

// import ReactQuill from "react-quill"
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";

export const TextAreaEditor = ({ onChange, value }) => {
   const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);


  var toolbarOptions = [

    ['bold', 'italic', 'underline'],        // toggled buttons

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],


  ];

  // const refQuill = useRef(null)

  // useEffect(() => {
  //   if (refQuill) {
  //     console.log('reaactquil', refQuill)
  //     refQuill.current.focus()
  //   }
  // }, []);


  return (
    <>
      {
        ReactQuill && (
          <div className="bg-white h-[100px]">
            <ReactQuill
              theme="snow"
              // ref={refQuill}
              value={value}
              onChange={onChange}
              modules={{ toolbar: toolbarOptions }}
            />
          </div>
        )
      }
    </>
  )

};