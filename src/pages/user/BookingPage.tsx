import BookingCard from "@/components/module/booking/BookingCard";
import { useGetUserBookingQuery } from "@/redux/features/booking/bookingApi";

const BookingPage = () => {
    const { data, isLoading } = useGetUserBookingQuery()
    if (isLoading) {
        return <p>loading</p>
    }
    console.log(data)
    return (
        <div>
            {
                data?.map(booking => <BookingCard key={booking?._id} booking={booking} />)
            }
        </div>
    );
};

export default BookingPage;