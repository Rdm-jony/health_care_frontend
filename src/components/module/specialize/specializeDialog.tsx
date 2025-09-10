/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UploadAvatar from "@/components/upload-avatar"
import type { FileMetadata } from "@/hooks/use-file-upload"
import LoadingButton from "@/components/loading-buttom"

interface SpecializationDialogProps {
    isLoading: boolean,
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (values: { name: string; image: any, id: string }) => void
    initialData?: { name: string; image: string, _id: string }
    mode?: "add" | "edit"
}

export default function SpecializationDialog({
    open,
    isLoading,
    onOpenChange,
    onSave,
    initialData,
    mode = "add",
}: SpecializationDialogProps) {
    console.log(initialData)
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [image, setImage] = useState<(File | FileMetadata) | null>()

    // preload data when editing
    useEffect(() => {
        if (initialData) {
            setName(initialData.name)
            setId(initialData._id)
        } else {
            setName("")
            setImage(null)
            setId("")
        }
    }, [initialData, open])

    const handleSave = () => {
        onSave({ name, image, id })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {mode === "add" ? "Add New Specialization" : "Edit Specialization"}
                    </DialogTitle>
                </DialogHeader>
                <UploadAvatar onChange={setImage} defaultImage={initialData?.image} />

                <div className="space-y-4">
                    <Input
                        placeholder="Specialization Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    {
                        isLoading ? <LoadingButton text={mode === "add" ? "Add" : "Update"} /> : <Button onClick={handleSave}>
                            {mode === "add" ? "Add" : "Update"}
                        </Button>
                    }

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
