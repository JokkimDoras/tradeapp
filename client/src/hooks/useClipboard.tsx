import { useState } from "react";

export function useClipboard() {
    const [copied,setCopied] = useState(false);

    const copy = async(text:string) => {
        await navigator.clipboard.writeText(String(text))
        setCopied(true)
    }

    setTimeout(() => {
        setCopied(false)
    },2000)

    return {
        copied,
        copy
    }
}

