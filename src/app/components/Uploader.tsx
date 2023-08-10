import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import useMap from "../hooks/useMap";
import CSV_FORM_CONFIG from "../utils/consts";
import { EQueryKeys } from "../utils/queryClient";

const Uploader = () => {
  const { updateCenter } = useMap();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | undefined>(undefined);
  type UploadState = "wrong" | "yes";
  const [uploadState, setUploadState] = useState<UploadState>("yes");
  const callAPI = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append(CSV_FORM_CONFIG.form_key, file);
      const res = await axios.post("/api", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      const data: Pair[] = await res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const { isLoading, mutate } = useMutation(callAPI, {
    onSuccess: (data) => {
      queryClient.setQueryData([EQueryKeys.maps], data);
      setFile(undefined);
      data && updateCenter(data[0].a);
      toast.success("Uploaded");
    },
    onError: () => {
      setFile(undefined);
      toast.error("Failed to upload");
    },
  });

  return (
    <div className="p-5">
      <FileUploader
        handleChange={(file: any) => {
          if (file.type === CSV_FORM_CONFIG.mime) {
            setFile(file as File);
            setUploadState("yes");
          } else {
            setUploadState("wrong");
          }
        }}
        name="file"
        label={"Drag & Drop or click to upload CSV file."}
      >
        {uploadState === "yes" && file ? (
          <p className="cursor-pointer">
            Upload <b> {file.name}</b> ?
          </p>
        ) : uploadState === "wrong" ? (
          <p className="cursor-pointer underline">
            Wrong extension... choose CSV
          </p>
        ) : (
          this
        )}
      </FileUploader>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {file ? (
          <>
            <button
              className="bg-slate-100 rounded-md text-center"
              disabled={isLoading || file === undefined}
              onClick={() => {
                file && mutate(file);
              }}
            >
              Yes
            </button>
            <button
              className="bg-slate-300 rounded-md text-center"
              disabled={isLoading || file === undefined}
              onClick={() => {
                setFile(undefined);
              }}
            >
              No
            </button>
          </>
        ) : (
          <a
            href="/example.csv"
            className="bg-slate-100 rounded-md text-center"
          >
            Download example
          </a>
        )}
      </div>
    </div>
  );
};

export default Uploader;
