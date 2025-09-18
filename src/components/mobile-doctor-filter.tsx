
import { Input } from "@/components/ui/input"
import { Filter, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select"
import { useGetAllSpecializationQuery } from "@/redux/features/doctor/doctorApi";
import { useSearchParams } from "react-router";
import { Button } from "./ui/button";

export default function MobileFilter() {
  const { data, isLoading } = useGetAllSpecializationQuery();
  const [searchParam, setSearchParam] = useSearchParams()
  const selectedSpecialize = searchParam.get("specialization.name") || undefined;
  const searchValue = searchParam.get("searchTerm") || undefined;


  const resetFilter = async () => {
    const params = new URLSearchParams(searchParam);
    params.delete("specialization.name");
    params.delete("searchTerm");
    setSearchParam(params)

  }

  const handeSpecializationFilter = (value: string) => {
    const params = new URLSearchParams(searchParam);
    params.set("specialization.name", value)
    setSearchParam(params)

  }
  const handleSearchFilter = (value: string) => {
    const params = new URLSearchParams(searchParam);
    params.set("searchTerm", value);
    setSearchParam(params);
  };
  return (
    <div className="*:not-first:mt-2 my-5 md:hidden">
      <div className="flex justify-end">
        <Button variant="link" size="sm" onClick={resetFilter}> Reset</Button>

      </div>
      <div className="flex rounded-md shadow-xs">
        <div className="relative">
          <Input value={searchValue ? searchValue : ""}
            onChange={(e) => handleSearchFilter(e.target.value)} className="peer ps-9" placeholder="search by name" type="email" />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <Search size={16} aria-hidden="true" />
          </div>
        </div>
        <Select disabled={isLoading} value={selectedSpecialize ? selectedSpecialize : ""} onValueChange={handeSpecializationFilter}>
          <SelectTrigger className="w-1/3 bg-white" >

            <Filter />
            filter
          </SelectTrigger>
          <SelectContent >
            {
              data?.map(specialize => <SelectItem key={specialize._id} value={specialize?.name as string} className="capitalize">{specialize?.name}</SelectItem>
              )
            }

          </SelectContent>
        </Select>

      </div>
    </div>
  )
}
