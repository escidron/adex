"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";


export const Preview = ({
  value,
  heigth
}) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
      className={`line-clamp-3 ${heigth && `max-h-[${heigth}px]`}`}
    />
  );
};