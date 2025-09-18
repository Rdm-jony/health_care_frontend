import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useGetSingleDoctorQuery } from "@/redux/features/doctor/doctorApi"
import { Link, useLocation, useParams } from "react-router"
import { Skeleton } from "@/components/ui/skeleton"
import DoctorSlots from "@/components/module/doctor/DoctorsBookingSlots"
import { Info } from "lucide-react"
import { useGetMeQuery } from "@/redux/features/auth/authApi"

export default function DoctorDetailsPage() {
  const location = useLocation()
  const { id } = useParams()
  const { data: user } = useGetMeQuery(undefined)
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
              className="w-full h-full object-cover rounded-l-2xl bg-primary"
            />
          </div>

          {/* Right Side: Doctor Info */}
          <div className="w-full md:w-2/3 self-end border">
            <CardHeader className="p-6">
              <CardTitle className="text-2xl font-bold capitalize">
                {`Dr. ${doctor.user?.name}`}
              </CardTitle>
              <p className="text-muted-foreground font-semibold">
                {doctor.specialization?.name || "Specialist"} • {doctor.degree || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                {doctor.experience || 0} years experience • ${doctor.fees || 0} per session
              </p>
            </CardHeader>

            <CardContent className="p-6 space-y-6 ">
              {/* About Section */}
              <section>
                <h3 className="text-lg font-semibold flex gap-2 items-center">About <Info size={20} /></h3>
                <p className="text-muted-foreground text-sm">
                  {doctor.about || "No description available."}
                </p>
              </section>

              <Separator />
              <h2 className="text-xl font-semibold">Book Appointment</h2>
              {
                user ? <DoctorSlots doctor={doctor} /> : <p className="text-sm">Please Sign In for appointment <Link to="/login" className="text-primary font-semibold underline" state={location.pathname}>Sign In</Link></p>
              }

              {/* Contact Section */}

            </CardContent>
          </div>
        </div>

      </Card>
    </div>
  )
}
