/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import _ from "lodash";

import { Check } from "@assets";
import { TableHeader, TableRow, Waitlist } from "@types";
import { RootState } from "@store";
import Row from "./components/row";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";

interface TableProps {
  sidebarCollapsed: boolean;
}

const getTableHeader = (header: TableHeader) => {
  const { id, value, icon, width, hidden } = header;

  return (
    <div
      className="flex-1 gap-1.5 pr-2 max-w-full"
      style={{
        minWidth: `${width}px`,
        display: hidden ? "none" : "flex",
      }}
      key={id}
    >
      <Image src={icon} alt={value} />
      <div className="text-xs font-medium leading-5 text-gray_100">{value}</div>
    </div>
  );
};

const Table: React.FC<TableProps> = ({ sidebarCollapsed }) => {
  const tableHeaders = useSelector(
    (root: RootState) => root.tableSlice.headers
  );

  const waitlist = useSelector(
    (root: RootState) => root.waitlistSlice.filteredWaitlist
  );

  const currentWaitlist = useRef<Waitlist[]>(
    waitlist.map((waitlist) => ({ ...waitlist, hidden: false }))
  );
  const [offset, setOffset] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [rows, setRows] = useState<TableRow[]>(
    currentWaitlist.current.slice(offset - 1, offset + limit - 1)
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

  useEffect(() => {
    setRows(waitlist.slice(offset - 1, offset + limit - 1));
  }, [offset, limit, waitlist]);

  return (
    <div
      className="flex flex-col gap-0 rounded-md shadow-shadow_light bg-white"
      style={{
        width: `calc(100vw - ${sidebarCollapsed ? "64" : "228"}px)`,
        marginLeft: `${sidebarCollapsed ? "64" : "228"}px`,
      }}
    >
      <Toolbar />
      <div className="w-full flex flex-col gap-2 px-4 py-3">
        <div className="w-full h-[67.7vh] rounded-md overflow-auto border border-light_border">
          <div className="flex justify-start items-center gap-4 px-4 py-2 border-b border-dark_border">
            <div
              className={`w-[14px] h-[14px] min-w-[14px] flex justify-center items-center rounded-[4px] shadow-shadow_soft ${
                selectAll
                  ? "bg-pitch_black"
                  : "bg-white border border-gray_border "
              }`}
              onClick={handleSelectAll}
            >
              {selectAll && <Image src={Check} alt="Check" />}
            </div>
            {tableHeaders.map((header) => getTableHeader(header))}
          </div>
          {rows.map((row) => (
            <Row
              row={row}
              tableHeaders={tableHeaders}
              selectAll={selectAll}
              key={row.id}
            />
          ))}
        </div>
      </div>
      <Footer
        totalData={waitlist.length}
        offset={offset}
        limit={limit}
        setOffset={setOffset}
        setLimit={setLimit}
      />
    </div>
  );
};

export default Table;
