import MobileFilter from "@/components/mobile-doctor-filter";
import DoctorFilter from "@/components/module/doctor/DoctorFilter";
import DoctorListCard from "@/components/module/doctor/DoctorListCard";
import { useAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import { useSearchParams } from "react-router";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import DoctorCardSkeleton from "@/components/DoctorCardSkeleton";

const AllDoctor = () => {
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const specialization = searchParams.get("specialization.name") || undefined;
    const searchTerm = searchParams.get("searchTerm") || undefined;

    const { data: doctors, isLoading } = useAllDoctorsQuery({
        "specialization.name": specialization,
        searchTerm,
        limit: 5,
        page,
    });

    const totalPages = doctors?.meta?.totalPage;

    return (
        <div className="md:flex">
            <DoctorFilter setPage={setPage} />
            <MobileFilter />

            <div>
                {/* Grid section */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 md:p-10">
                    {isLoading
                        ? // Skeleton loader when fetching
                        Array.from({ length: 6 }).map((_, idx) => (
                            <DoctorCardSkeleton key={idx} />
                        ))
                        : doctors?.data?.map((doctor) => (
                            <DoctorListCard key={doctor._id} doctor={doctor} />
                        ))}
                </div>

                {/* Pagination */}
                {totalPages && totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    className={
                                        page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                                    }
                                    onClick={() => setPage(page - 1)}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <PaginationItem key={idx} className="cursor-pointer">
                                    <PaginationLink
                                        isActive={page === idx + 1}
                                        onClick={() => setPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {totalPages > 5 && <PaginationEllipsis />}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage(page + 1)}
                                    className={
                                        page === totalPages
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default AllDoctor;
