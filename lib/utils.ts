import { clsx, type ClassValue } from "clsx"
import { NextRequest } from "next/server"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getQueryParams(req: NextRequest, name: string) {
  const {searchParams} = new URL(req.url)
  const params = searchParams.get(name)
  return params
}