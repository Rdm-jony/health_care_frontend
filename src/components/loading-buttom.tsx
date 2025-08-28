import { LoaderCircleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LoadingButton({ text }: { text: string }) {
  return (
    <Button className="w-full" disabled>
      <LoaderCircleIcon
        className="-ms-1 animate-spin"
        size={16}
        aria-hidden="true"
      />
      {text}
    </Button>
  )
}
