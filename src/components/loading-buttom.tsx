import { LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LoadingButton({ text, widthFull = true }: { text: string, widthFull?: boolean }) {
  return (
    <Button className={widthFull ? 'w-full' : ""} disabled>
      <LoaderCircleIcon
        className="-ms-1 animate-spin"
        size={16}
        aria-hidden="true"
      />
      {text}
    </Button>
  )
}
