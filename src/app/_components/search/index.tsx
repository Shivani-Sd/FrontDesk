/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";

import SearchIcon from "@components/assets/search";
import Check from "@assets/check.svg";
import Clear from "@assets/clear.svg";
import useDebounce from "@hooks/useDebounce";

interface SearchProps {
  placeholder: string;
  allItems: MutableRefObject<SearchItem[]>;
  currentFilteredItems: SearchItem[];
  chips: ReactNode | ((item: SearchItem) => JSX.Element);
  handleSelectItems: (selectedPeople: SearchItem[]) => void;
}

export type SearchItem = {
  id: number;
  value: string;
};

const GetSearchResult = ({
  item,
  selected,
  searchActive,
  chips,
  setSelectedItems,
}: {
  item: SearchItem;
  selected: boolean;
  searchActive: boolean;
  chips: ReactNode | ((item: SearchItem) => JSX.Element);
  setSelectedItems: Dispatch<SetStateAction<SearchItem[]>>;
}) => {
  const { id, value } = item;
  const [select, setSelect] = useState<boolean>(selected);

  const handleSelect = () => {
    if (searchActive) {
      if (select)
        setSelectedItems((prev) => prev.filter((item) => item.id !== id));
      else setSelectedItems((prev) => [...prev, item]);

      setSelect((prev) => !prev);
    }
  };

  const isReactNode = (
    chip: ReactNode | ((item: SearchItem) => JSX.Element)
  ): chip is React.ReactNode => {
    return typeof chip !== "function";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center gap-2">
        <div
          className={`w-[14px] h-[14px] min-w-[14px] flex justify-center items-center rounded-[4px] shadow-shadow_soft ${
            !searchActive || select
              ? "bg-pitch_black"
              : "bg-white border border-gray_border "
          }`}
          onClick={handleSelect}
          role="checkbox"
          aria-checked={select}
          aria-label={select ? "Deselect item" : "Select item"}
        >
          {searchActive && select && <Image src={Check} alt="Check" />}
        </div>
        <div className="text-sm font-normal text-dark_black line-clamp-1">
          {value}
        </div>
      </div>
      {isReactNode(chips) ? chips : chips(item)}
    </div>
  );
};

const Search: React.FC<SearchProps> = ({
  placeholder,
  allItems,
  currentFilteredItems,
  chips,
  handleSelectItems,
}) => {
  const { debounce } = useDebounce();

  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [selectedItems, setSelectedItems] =
    useState<SearchItem[]>(currentFilteredItems);

  const selectedItemIds = useMemo(
    () => selectedItems.map((item) => item.id),
    [selectedItems]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // Filter, sort and slice values according to the search text
  const handleSearch = () => {
    if (value)
      setItems(
        allItems.current
          .filter((item) =>
            item.value.toLowerCase().includes(value.toLowerCase())
          )
          .sort((a, b) => (a.value < b.value ? -1 : 1))
          .slice(0, 10)
      );
  };

  const handleClearSearch = () => {
    setValue("");
  };

  useEffect(() => {
    // Perform debounced search with 200ms delay
    debounce(handleSearch, 200);
  }, [value]);

  useEffect(() => {
    handleSelectItems(selectedItems);
  }, [selectedItems]);

  return (
    <>
      <div className="w-[350px] h-fit flex items-center gap-2 px-3 py-1 rounded-md border border-light_border">
        <SearchIcon />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          className={`w-full text-xs leading-5 text-md focus:outline-none text-${
            value ? "charcoal_black" : "gray_200"
          }`}
          onChange={handleChange}
          aria-label="Search"
        />
        <Image
          src={Clear}
          alt="Clear"
          onClick={handleClearSearch}
          aria-label="Clear search"
        />
      </div>

      {value && items.length ? (
        <div className="flex flex-col gap-3">
          <div
            className="text-xs font-normal leading-5 text-light_black"
            aria-live="polite"
          >
            Showing {items.length} results matching &lsquo;{value}&rsquo;
          </div>
          <div className="w-[350px] flex flex-col gap-2">
            {items.map((item, index) => (
              <GetSearchResult
                item={item}
                selected={selectedItemIds.includes(item.id)}
                searchActive
                chips={chips}
                setSelectedItems={setSelectedItems}
                key={`${item.id}-${index}`}
              />
            ))}
          </div>
        </div>
      ) : selectedItems.length ? (
        selectedItems.map((item, index) => (
          <GetSearchResult
            item={item}
            selected
            searchActive={false}
            chips={chips}
            setSelectedItems={setSelectedItems}
            key={`${item.id}-${index}`}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
