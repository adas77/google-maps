import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import useMap from "@/app/hooks/useMap";
import mapService from "@/app/service/mapSevrice";
import CSV_FORM_CONFIG from "@/app/utils/consts";
import { EQueryKeys } from "@/app/utils/queryClient";
import { FileUploader } from "react-drag-drop-files";

const Uploader = () => {
  const { updateCenter } = useMap();
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | undefined>(undefined);
  const [uploadState, setUploadState] = useState<UploadState>("yes");

  const { isLoading, mutate } = useMutation(mapService.uploadCSV, {
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
