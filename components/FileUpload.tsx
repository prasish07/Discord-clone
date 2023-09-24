"use client";

interface FileUploadProps {
  endPoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";

const FileUpload = ({ endPoint, value, onChange }: FileUploadProps) => {
  const fileType = value.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill alt="upload file" src={value} className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 bg-rose-500 rounded-full text-white p-1 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
