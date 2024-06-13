import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Columns, Download, Filter as FilterIcon, Refresh } from "@assets";
import Filter from "@components/filter";
import Search from "@components/assets/search";
import EditColumnModal from "./editColumnModal";

enum SummaryItemName {
  Waitlists = "All Waitlists",
  NewlyAdded = "Newly Added",
  Leads = "Leads",
}

interface SummaryItem {
  name: SummaryItemName;
  count: number;
}

const summaryItems: SummaryItem[] = [
  {
    name: SummaryItemName.Waitlists,
    count: 100,
  },
  {
    name: SummaryItemName.NewlyAdded,
    count: 50,
  },
  {
    name: SummaryItemName.Leads,
    count: 20,
  },
];

const getSummaryItems = (summaryItem: SummaryItem) => {
  const { name, count } = summaryItem;

  return (
    <div
      className="min-w-[125px] flex flex-1 items-baseline gap-1.5 rounded-md px-3 py-2.5 border border-light_border"
      key={name}
    >
      <div className="text-xs font-semibold leading-5 text-left text-smokey_black">
        {name}
      </div>
      <div className="text-[10px] font-medium leading-4 text-left text-gray_100">
        {count}
      </div>
    </div>
  );
};

const Toolbar: React.FC = () => {
  const filterRef = useRef<HTMLDivElement>(null);
  const editColumnRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState<boolean>(false);
  const [editColumns, setEditColumns] = useState<boolean>(false);

  const handleEditColumns = () => {
    setEditColumns((prev) => !prev);
  };

  const handleFilter = () => {
    setFilter((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        filterRef &&
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      )
        setFilter(false);
      else if (
        editColumnRef &&
        editColumnRef.current &&
        !editColumnRef.current.contains(e.target as Node)
      )
        setEditColumns(false);
    };

    document.addEventListener("mousedown", (e) => handleClickOutside(e));

    return () => {
      document.removeEventListener("mousedown", (e) => handleClickOutside(e));
    };
  }, []);

  return (
    <div className="w-full h-fit">
      <div className="w-full h-fit px-4 py-3 text-xl font-semibold text-left">
        Waitlist
      </div>
      <div className="flex flex-col gap-4 px-4 py-3">
        <div className="max-w-[1108px] min-h-[40px] flex flex-wrap gap-[15px] justify-between">
          {summaryItems.map((summaryItem) => getSummaryItems(summaryItem))}
        </div>
        <div className="flex items-center flex-wrap justify-between">
          <div className="w-[599px] relative">
            <div
              className="w-max flex gap-1.5 rounded-md px-3 py-1.5 bg-light_blue"
              onClick={handleFilter}
            >
              <Image src={FilterIcon} alt="Filter" priority />
              <div className="text-xs font-medium leading-5 text-left text-smokey_black">
                Add Filter
              </div>
            </div>
            {filter && <Filter setFilter={setFilter} ref={filterRef} />}
          </div>
          <div className="flex gap-4 flex-wrap relative">
            <div className="w-[230px] flex items-center gap-2.5 px-3 py-2 shadow-shadow_dark">
              <Search
                mainProps={{ width: 12, height: 12 }}
                pathProps={{ stroke: "#64748B", strokeWidth: "1.4" }}
              />
              <div className="text-xs font-medium leading-5 text-gray_200">
                Search client
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Image src={Refresh} alt="Refresh" priority />
              <Image
                src={Columns}
                alt="Edit Columns"
                priority
                onClick={handleEditColumns}
              />
              {editColumns && (
                <EditColumnModal
                  setEditColumns={setEditColumns}
                  ref={editColumnRef}
                />
              )}
              <Image src={Download} alt="Download" priority />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
