"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronDown, FileUp, Globe, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ImportType = "url" | "file" | null

interface ImportDropdownProps {
  onUrlSubmmited: (url: string) => void
  onFileSubmmited: (file: File) => void
}

export default function ImportDropdown({ onUrlSubmmited, onFileSubmmited }: ImportDropdownProps) {
  const [importType, setImportType] = useState<ImportType>(null)
  const [url, setUrl] = useState("")
  const [file, setFile] = useState<File | null >(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleConfirm = () => {
    if (importType === "url") {
      onUrlSubmmited(url)
    } else if (importType === "file") {
      if(file) onFileSubmmited(file)
    }

    // Reset form after import
    setUrl("")
    setFile(null)
    setImportType(null)
    setIsOpen(false)
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>{importType ? `Import from ${importType.toUpperCase()}` : "Import Data"}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[384px]">
          <DropdownMenuItem onClick={() => setImportType("url")}>
            <Globe className="mr-2 h-4 shrink-0" />
            <span>URL</span>
            {importType === "url" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setImportType("file")}>
            <FileUp className="mr-2 h-4" />
            <span>File</span>
            {importType === "file" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {importType === "url" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url-input">Enter URL</Label>
            <Input
              id="url-input"
              placeholder="https://www.google.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button onClick={handleConfirm} disabled={!url}>
            Import
          </Button>
        </div>
      )}

      {importType === "file" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-input">Select File</Label>
            <div className="flex gap-2">
              <Input id="file-display" placeholder="No file selected" value={file?.name?? ""} readOnly className="flex-1" />
              <div className="relative">
                <Button variant="secondary" className="relative">
                  Browse
                  <Input
                    id="file-input"
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleFileChange}
                  />
                </Button>
              </div>
            </div>
          </div>
          <Button onClick={handleConfirm} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      )}
    </div>
  )
}

