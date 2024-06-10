/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { Check } from "@assets";
import { Status, TableHeader, TableHeaders, TableRow } from "@types";
import { formatDate } from "@utils";
import Dot from "@components/assets/dot";

interface RowProps {
  row: TableRow;
  tableHeaders: TableHeader[];
  selectAll: boolean;
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

const Row: React.FC<RowProps> = ({ row, tableHeaders, selectAll }) => {
  const tableHeaderNames: TableHeaders[] = tableHeaders.map(
    (tableHeader) => tableHeader.name
  );

  const [select, setSelect] = useState<boolean>(false);

  const cells = useMemo(() => {
    let cells: Cell[] = [];

    Object.keys(row).forEach((cell) => {
      if (tableHeaderNames.includes(cell as TableHeaders)) {
        const tableHeader = tableHeaders.find(
          (tableHeader) => tableHeader.name === cell
        );

        if (tableHeader)
          cells.push({
            value: row[cell as keyof TableRow],
            header: tableHeader,
          });
      }
    });

    return cells;
  }, [row, tableHeaders]);

  const handleSelect = () => {
    setSelect((prev) => !prev);
  };

  useEffect(() => {
    setSelect(selectAll);
  }, [selectAll]);

  return (
    <div className="h-[40px] flex justify-start items-center gap-4 px-4 py-2 border-b border-dark_border">
      <div
        className={`w-[14px] h-[14px] min-w-[14px] flex justify-center items-center rounded-[4px] shadow-shadow_gray ${
          select ? "bg-pitch_black" : "bg-white border border-gray_border "
        }`}
        onClick={handleSelect}
      >
        {select && <Image src={Check} alt="Check" />}
      </div>
      {cells.map((cell) => getTableCell(cell))}
    </div>
  );
};

export default Row;
