import FilterSkeleton from "@/components/FliterSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllSpecializationQuery } from "@/redux/features/doctor/doctorApi";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router";

const DoctorFilter = ({ setPage }: { setPage: (number:number) => void }) => {
    const { data, isLoading } = useGetAllSpecializationQuery();
    const [searchParam, setSearchParam] = useSearchParams();
    const selectedSpecialize = searchParam.get("specialization.name") || undefined;
    const searchValue = searchParam.get("searchTerm") || undefined;

    if (isLoading) {
        return <FilterSkeleton />
    }

    const resetFilter = () => {
        const params = new URLSearchParams(searchParam);
        params.delete("specialization.name");
        params.delete("searchTerm");
        setSearchParam(params);
    };

    const handleSpecializationFilter = (value: string) => {
        const params = new URLSearchParams(searchParam);
        params.set("specialization.name", value);
        setSearchParam(params);
        setPage(1)

    };
    const handleSearchFilter = (value: string) => {
        const params = new URLSearchParams(searchParam);
        params.set("searchTerm", value);
        setSearchParam(params);
    };

    return (
        <aside className="w-full lg:w-1/4 md:block hidden min-h-screen p-4 border-r bg-gray-50 dark:bg-gray-900 space-y-4">
            {/* Reset Button */}
            <div className="flex justify-end">
                <Button variant="link" size="sm" onClick={resetFilter}>
                    Reset
                </Button>
            </div>

            {/* Search Input */}
            <div className="relative bg-white">
                <Input
                    value={searchValue ? searchValue : ""}
                    onChange={(e) => handleSearchFilter(e.target.value)}
                    className="peer ps-9"
                    placeholder="Search by name"
                    type="text"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
                    <Search size={16} aria-hidden="true" />
                </div>
            </div>

            {/* Specialization List */}
            <div className="space-y-2">
                {data?.map((specialize) => {
                    const isSelected = selectedSpecialize === specialize.name;
                    return (
                        <Button
                            key={specialize._id}
                            variant={isSelected ? "default" : "outline"}
                            className="w-full justify-start capitalize"
                            onClick={() => handleSpecializationFilter(specialize.name)}
                        >
                            {specialize.name}
                        </Button>
                    );
                })}
            </div>
        </aside>
    );
};

export default DoctorFilter;
