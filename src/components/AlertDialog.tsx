import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react"
import LoadingButton from "./loading-buttom";

export function Alert({ open, setOpen, children, onConfirm, title, type, btnText, description, loading }: { open?: boolean, setOpen?: (bool: boolean) => void, children?: ReactNode, onConfirm: () => void, title: string, type: "delete" | "accept", btnText: string, description?: ReactNode, loading?: boolean }) {

    const handleConfirm = () => {
        onConfirm();
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {
                            description
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {
                        loading ? <LoadingButton text={btnText} /> : <AlertDialogAction className={type == "delete" ? "bg-red-600" : "bg-primary"} onClick={handleConfirm}>{btnText}</AlertDialogAction>

                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
