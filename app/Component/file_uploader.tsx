import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/data/fileSize";

// Imports Images
import uploadIcon from "../assets/icons/info.svg";
import pdfImage from "../assets/images/pdf.png";
import removePdf from "../assets/icons/cross.svg";

interface FilesSelectProps {
  filesSelected?: (file: File | null) => void;
}

export default function FileUploader({ filesSelected }: FilesSelectProps) {
  // On Drop Const
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const file = acceptedFiles[0] || null;

      filesSelected?.(file);
    },
    [filesSelected],
  );

  // Use Drop Files
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024,
    });

  // const file
  const file = acceptedFiles[0] || null;

  // const File Size
  const fileSize = 20 * 1024 * 1024;

  return (
    <div className="w-full cursor-pointer my-2 gradient-border">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center gap-5">
          {file ? (
            <div
              className="flex justify-between items-center w-full"
              onClick={(e) => e.stopPropagation()}>
              <img src={pdfImage} className="w-15 h-15" alt="" />
              <div className="cursor-auto">
                <p>{file?.name}</p>
                <p>{formatSize(file?.size)}</p>
              </div>
              <button onClick={() => filesSelected?.(null)}>
                <img
                  src={removePdf}
                  className="w-5 h-5 cursor-pointer"
                  alt=""
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div>
                <img src={uploadIcon} alt="" className="w-100 h-15" />
              </div>
              <p>
                <span>Click to upload</span> or drag and drop
              </p>
              <p>PDF (max {formatSize(fileSize)})</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
