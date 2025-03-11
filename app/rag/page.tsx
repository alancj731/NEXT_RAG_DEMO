"use client";
import { useState } from "react";
import { Loader } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/lib/toast";
import ImportDropdown from "@/components/ImportDropdown";

export default function Rag() {
  const [, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getUrlData(url: string) {
    const urlApi = `/api/web?url=${encodeURI(url)}`;
    setIsLoading(true);
    try {
      await fetch(urlApi).then((res) => res.text());
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
    finally {
      setIsLoading(false);
    }
  }

  async function handleUrlSubmit(url: string) {
    setUrl(url);
    const result = await getUrlData(url);
    if (result) {
      showToast(`Data from ${url} imported successfuly!`, "success");
    }
    else{
      showToast(`Import data from ${url} failed!`, "error");
    }
  }

  async function handleFileSubmit(file: File) {
    setFile(file);
    const formData = new FormData();
    formData.append("file", file);
    const fileApi = `/api/file`;
    setIsLoading(true);
    try {
      await fetch(fileApi, {
        method: "POST",
        body: formData,
      }).then((res) => res.text());
      showToast(`File ${file.name} imported successfuly!`, "success");
    }
    catch (e) {
      console.log(e);
      showToast(`Import file ${file.name} failed!`, "error");
    }
    finally {
      setIsLoading(false);
    }

  }


  return (
    <div className="flex justify-start w-full max-w-md py-12 px-8 space-y-4 items-center space-x-4 px-2 stretch">
      <ImportDropdown onUrlSubmmited={handleUrlSubmit} onFileSubmmited={handleFileSubmit} />
      {isLoading && <div className="flex items-center space-x-2"> <Loader /> <p>Importing...</p> </div>}
      <ToastContainer />
    </div>
  );
}