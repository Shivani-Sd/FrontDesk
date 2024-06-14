/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import _ from "lodash";

import { TableHeader, TableRow, Waitlist } from "@types";
import { RootState } from "@store";
import Check from "@assets/check.svg";
import Loader from "@components/loader";
import Toolbar from "./components/toolbar";
import Footer from "./components/footer";
import Row from "./components/row";

interface TableProps {
  sidebarCollapsed: boolean;
}

// Function to render table header cells
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
      role="columnheader"
      aria-colindex={id}
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
  const [rowsLoading, setRowsLoading] = useState<boolean>(true);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

  useEffect(() => {
    // Update rows according to new offset, limit or filters
    setRows(waitlist.slice(offset - 1, offset + limit - 1));
    setRowsLoading(true);
  }, [offset, limit, waitlist]);

  return (
    <div
      className="flex flex-col gap-0 rounded-md shadow-shadow_light bg-white"
      style={{
        width: `calc(100vw - ${sidebarCollapsed ? "64" : "228"}px)`,
        marginLeft: `${sidebarCollapsed ? "64" : "228"}px`,
      }}
      role="main"
      aria-label="Main Content"
    >
      <Toolbar />
      <div className="w-full flex flex-col gap-2 px-4 py-3">
        <div
          className={`w-full rounded-md border border-light_border relative ${
            rowsLoading ? "overflow-hidden" : "overflow-auto"
          }`}
          role="table"
          aria-label="Table Data"
        >
          <div
            className="flex justify-start items-center gap-4 px-4 py-2 border-b border-dark_border"
            role="row"
          >
            <div role="cell">
              <div
                className={`w-[14px] h-[14px] min-w-[14px] flex justify-center items-center rounded-[4px] shadow-shadow_soft ${
                  selectAll
                    ? "bg-pitch_black"
                    : "bg-white border border-gray_border "
                }`}
                onClick={handleSelectAll}
                role="checkbox"
                aria-checked={selectAll}
                aria-label={selectAll ? "Deselect all" : "Select all"}
              >
                {selectAll && <Image src={Check} alt="Check" />}
              </div>
            </div>
            {tableHeaders.map((header) => getTableHeader(header))}
          </div>
          <div role="rowgroup">
            {rows.map((row, index) => (
              <Row
                index={index}
                row={row}
                tableHeaders={tableHeaders}
                selectAll={selectAll}
                rowsLoading={rowsLoading}
                setRowsLoading={
                  index === rows.length - 1 ? setRowsLoading : undefined
                }
                key={row.id}
              />
            ))}
          </div>
          {rowsLoading && <Loader />}
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
