import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useGetSingleDoctorQuery } from "@/redux/features/doctor/doctorApi"
import { useParams } from "react-router"
import { Skeleton } from "@/components/ui/skeleton"
import DoctorSlots from "@/components/module/doctor/DoctorsBookingSlots"

export default function DoctorDetailsPage() {
  const { id } = useParams()
  const { data: doctor, isLoading } = useGetSingleDoctorQuery(id, { skip: !id })

  if (isLoading) {
    return (
      <div className="w-full p-6">
        <Card className="w-full shadow-md border rounded-2xl p-6 flex gap-6">
          <Skeleton className="w-1/3 h-[300px] rounded-xl" />
          <div className="w-2/3 space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </Card>
      </div>
    )
  }

  if (!doctor) {
    return <p className="p-6 text-center text-muted-foreground">No doctor found</p>
  }

  return (
    <div className="w-full p-6">
      <Card className="w-full shadow-xl border rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Doctor Image */}
          <div className="w-full md:w-1/4 h-[300px]">
            <img
              src={doctor.user?.picture || "/placeholder.png"}
              alt={doctor.user?.name || "Doctor"}
              className="w-full h-full object-cover rounded-l-2xl"
            />
          </div>

          {/* Right Side: Doctor Info */}
          <div className="w-full md:w-2/3 self-end">
            <CardHeader className="p-6">
              <CardTitle className="text-2xl font-bold">
                {doctor.user?.name || "Unknown Doctor"}
              </CardTitle>
              <p className="text-muted-foreground">
                {doctor.specialization?.name || "Specialist"} • {doctor.degree || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                {doctor.experience || 0} years experience • ${doctor.fees || 0} per session
              </p>
            </CardHeader>

            <CardContent className="p-6 space-y-6 ">
              {/* About Section */}
              <section>
                <h3 className="text-lg font-semibold">About</h3>
                <p className="text-muted-foreground">
                  {doctor.about || "No description available."}
                </p>
              </section>

              <Separator />

              {/* Contact Section */}
              {/* <section>
                <h3 className="text-lg font-semibold">Contact</h3>
                <ul className="space-y-1 text-muted-foreground">
                  {doctor.user?.email && <li>Email: {doctor.user.email}</li>}
                  {doctor.user?.phone && <li>Phone: {doctor.user.phone}</li>}
                  {doctor.user?.gender && <li>Gender: {doctor.user.gender}</li>}
                  {doctor.user?.address && <li>Address: {doctor.user.address}</li>}
                </ul>
              </section> */}
            </CardContent>
          </div>
        </div>
        <DoctorSlots doctor={doctor} />
      </Card>
    </div>
  )
}
