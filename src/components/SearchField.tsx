import { SearchFieldType } from "../types/SearchField";

export default function SearchField(properties: SearchFieldType) {
    return (
        <label className={"Search-Input"}>            
            <input type={"text"} value={properties.value} onChange={(event) => properties.onChange(event.currentTarget.value)} />
        </label>
    );
}
