/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import { Status, TableHeader, TableHeaders, TableRow } from "@types";
import { formatDate } from "@utils";
import { RootState } from "@store";
import Check from "@assets/check.svg";
import Dot from "@components/assets/dot";

interface RowProps {
  index: number;
  row: TableRow;
  tableHeaders: TableHeader[];
  selectAll: boolean;
  rowsLoading: boolean;
  setRowsLoading?: Dispatch<SetStateAction<boolean>>;
}

interface Cell {
  value: string | number | boolean | Date;
  header: TableHeader;
}

const getTableCell = (cell: Cell) => {
  const { value, header } = cell;
  const { id, width, hidden } = header;

  const statusColorMap = {
    [Status.Active]: {
      background: "#f0fdf9",
      color: "#15803D",
    },
    [Status.Inactive]: {
      background: "#f1f5f9",
      color: "#334155",
    },
    [Status.Lead]: {
      background: "#eff6ff",
      color: "#3B82F6",
    },
  };

  let chip = "";
  let backgroundColor = "";
  let color = "";
  let date = "";

  if (header.name === TableHeaders.Status) {
    const statusColorObject = statusColorMap[Status[value as Status]];
    chip =
      "flex items-center gap-1 rounded-2xl pr-2 pl-1.5 py-0.5 text-" +
      statusColorObject.color;

    backgroundColor = statusColorObject.background;
    color = statusColorObject.color;
  }

  if (value instanceof Date) {
    date = formatDate(value);
  }

  return (
    <div
      className="flex flex-1 justify-start gap-1.5 pr-2"
      style={{
        minWidth: `${width}px`,
        display: `${hidden ? "none" : "flex"}`,
      }}
      key={`${id}: ${value}`}
      role="cell"
    >
      <div
        className={`text-xs font-medium leading-5 text-dark_black ${chip}`}
        style={{ backgroundColor: backgroundColor }}
      >
        {chip && <Dot fill={color} />}
        <div>{`${header.name === TableHeaders.PayerPhone ? "+91 " : ""}${String(
          date || value
        )}`}</div>
      </div>
    </div>
  );
};

const Row: React.FC<RowProps> = ({
  index,
  row,
  tableHeaders,
  selectAll,
  rowsLoading,
  setRowsLoading,
}) => {
  const tableHeaderNames: TableHeaders[] = tableHeaders.map(
    (tableHeader) => tableHeader.name
  );

  const filters = useSelector(
    (root: RootState) => root.waitlistSlice.filteredWaitlist
  );

  const [select, setSelect] = useState<boolean>(false);
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Worker) {
      const worker = new Worker(new URL("src/app/_worker.js", import.meta.url));

      worker.postMessage({ row, tableHeaders, tableHeaderNames });

      worker.addEventListener("message", (event) => {
        setCells(event.data);
      });

      return () => {
        worker.terminate();
        if (setRowsLoading)
          setTimeout(() => {
            setRowsLoading(false);
          }, 200);
      };
    }
  }, [row, tableHeaders, filters, setRowsLoading]);

  const handleSelect = () => {
    setSelect((prev) => !prev);
  };

  useEffect(() => {
    setSelect(selectAll);
  }, [selectAll]);

  return (
    <div
      className={`h-[40px] flex justify-start items-center gap-4 px-4 py-2 ${
        !rowsLoading ? "border-b border-dark_border" : ""
      }`}
      role="row"
      aria-rowindex={index + 1}
    >
      {!rowsLoading && (
        <>
          <div role="cell">
            <div
              className={`w-[14px] h-[14px] min-w-[14px] flex justify-center items-center rounded-[4px] shadow-shadow_soft ${
                select
                  ? "bg-pitch_black"
                  : "bg-white border border-gray_border "
              }`}
              onClick={handleSelect}
              role="checkbox"
              aria-checked={select}
              aria-label={select ? "Deselect row" : "Select row"}
            >
              {select && (
                <Image src={Check} alt="Check" width={12} height={12} />
              )}
            </div>
          </div>
          {cells.map((cell) => getTableCell(cell))}
        </>
      )}
    </div>
  );
};

export default Row;
