import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import CSV_FORM_CONFIG from "../utils/consts";
import { EQueryKeys } from "../utils/queryClient";

const Uploader = () => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | undefined>(undefined);
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
      toast.success("Uploaded");
    },
    onError: () => {
      toast.error("Failed to upload");
    },
  });

  return (
    <div className="p-5">
      <FileUploader
        handleChange={(file: any) => {
          setFile(file as File);
        }}
        name="file"
        label={"Drag & Drop or click to upload CSV file."}
      />
      <button
        className="mt-1"
        disabled={isLoading}
        onClick={() => {
          file && mutate(file);
        }}
      >
        Send
      </button>
    </div>
  );
};

export default Uploader;
