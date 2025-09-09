import { useTaskContext } from "../../context/TaskContext";
import { Filter as FilterIcon } from "iconsax-reactjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = () => {
  const { setPriority, priority } = useTaskContext();

  const handleChange = (value: string) => {
    setPriority(value);
  };

  return (
    <Select onValueChange={handleChange} value={priority}>
      <SelectTrigger className="w-[120px] hover:cursor-pointer">
        <FilterIcon size={18} />
        <SelectValue defaultValue={"all"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem title="All" value="all">
          All
        </SelectItem>
        <SelectItem title="Low" value="low">
          Low
        </SelectItem>
        <SelectItem title="Medium" value="medium">
          Medium
        </SelectItem>
        <SelectItem title="High" value="high">
          High
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Filter;
