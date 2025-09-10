/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAddSpecializationMutation, useGetAllSpecializationQuery, useUpdateSpecializationMutation } from "@/redux/features/doctor/doctorApi"
import { Edit, Plus } from "lucide-react"
import SpecializationDialog from "@/components/module/specialize/specializeDialog"
import { toast } from "sonner"

export default function AllSpecialization() {
    const { data } = useGetAllSpecializationQuery()

    const [updateSpecialize, { isLoading: updateLoading }] = useUpdateSpecializationMutation()
    const [addSpecialize, { isLoading: addLoading }] = useAddSpecializationMutation()
    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState<"add" | "edit">("add")
    const [selected, setSelected] = useState<any>(null)

    const handleSave = async (values: { id: string, name: string; image: any }) => {
        if (!values.name) {
            return toast.error("name is required")
        }
        console.log(values)
        const formData = new FormData()
        formData.append("data", JSON.stringify(values))
        formData.append("file", values.image as File)
        try {
            if (mode === "add") {
                const response = await addSpecialize(formData).unwrap()
                if (response.success) {
                    toast.success(response.message)
                    setOpen(false)
                }
            } else {
                if (!values.id) {
                    return toast.error("id not found")
                }

                const response = await updateSpecialize({ id: values.id, formdata: formData }).unwrap()
                if (response.success) {
                    toast.success(response.message)
                    setOpen(false)
                }
            }
        } catch (error: any) {
            toast.error(error?.data.message)
        }

    }



    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">All Specializations</h2>
                <Button
                    onClick={() => {
                        setMode("add")
                        setSelected(null)
                        setOpen(true)
                    }}
                >
                    Add New <Plus className="ml-2" />
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[250px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Edit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data.map((item: any) => (
                            <TableRow key={item._id}>
                                <TableCell className="font-mono text-sm">{item._id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <img
                                        src={item.image || "https://via.placeholder.com/50"}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-md object-cover border"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setMode("edit")
                                            setSelected(item)
                                            setOpen(true)
                                        }}
                                    >
                                        Edit <Edit className="ml-2" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {/* Reusable Dialog */}
            <SpecializationDialog
                isLoading={updateLoading || addLoading}
                open={open}
                onOpenChange={setOpen}
                onSave={handleSave}
                initialData={selected}
                mode={mode}
            />
        </div>
    )
}
