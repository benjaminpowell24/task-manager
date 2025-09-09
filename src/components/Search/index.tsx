import { Input } from "@/components/ui/input";
import { useTaskContext } from "@/context/TaskContext";

export const Search = () => {
  const { searchTerm, setSearchTerm } = useTaskContext();

  return (
    <Input
      id="search"
      type="search"
      placeholder="Search tasks..."
      autoComplete="off"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default Search;
