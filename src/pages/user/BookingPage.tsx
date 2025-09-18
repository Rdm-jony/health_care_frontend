import BookingCardSkeleton from "@/components/BookingCardSkeleton";
import BookingCard from "@/components/module/booking/BookingCard";
import { useGetUserBookingQuery } from "@/redux/features/booking/bookingApi";

const BookingPage = () => {
    const { data, isLoading } = useGetUserBookingQuery();

    return (
        <div className="space-y-6">
            {isLoading ? (
                <>
                    <BookingCardSkeleton />
                    <BookingCardSkeleton />
                    <BookingCardSkeleton />
                </>
            ) : (
                data?.map((booking) => (
                    <BookingCard key={booking?._id} booking={booking} />
                ))
            )}
        </div>
    );
};

export default BookingPage