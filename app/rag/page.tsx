"use client";
import { useState } from "react";
import ImportDropdown from "@/components/ImportDropdown";

export default function Rag() {
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");

  async function getUrlData(url: string) {
    const urlApi = `/api/web?url=${encodeURI(url)}`;
    try {
      const textFromWebPage = await fetch(urlApi).then((res) => res.text());
      console.log(textFromWebPage.length);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUrlSubmit(url: string) {
    setUrl(url);
    getUrlData(url);
  }

  async function handleFileSubmit(fileName: string) {
    setFileName(fileName);
    console.log("Importing file:", fileName);
  }


  return (
    <div className="flex justify-start w-full max-w-md py-12 px-8 space-y-4 px-2 stretch">
      <ImportDropdown onUrlSubmmited={handleUrlSubmit} onFileSubmmited={handleFileSubmit} />
    </div>
  );
}
