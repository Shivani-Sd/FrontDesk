/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import { CalendarOutlined, Check, Hash, Status, UserOutlined } from "@assets";
import { Waitlist } from "@types";
import { RootState } from "@store";
import Row from "./components/row";
import Footer from "./components/footer";
import Toolbar from "./components/toolbar";

export enum TableHeaders {
  CreatedOn = "createdOn",
  Payer = "payer",
  Status = "status",
  Email = "email",
  PayerPhone = "payerPhone",
  Services = "services",
  Scheduled = "scheduled",
}

enum TableHeaderValues {
  CreatedOn = "Created On",
  Payer = "Payer",
  Status = "Status",
  Email = "Email",
  PayerPhone = "Payer Phone",
  Services = "Services",
  Scheduled = "Scheduled",
}

export interface TableHeader {
  id: number;
  name: TableHeaders;
  value: TableHeaderValues;
  icon: string | StaticImport;
  width: number;
}

export interface TableRow extends Waitlist {
  hidden: boolean;
}

interface TableProps {
  sidebarCollapsed: boolean;
}

const tableHeaders: TableHeader[] = [
  {
    id: 1,
    name: TableHeaders.CreatedOn,
    value: TableHeaderValues.CreatedOn,
    icon: CalendarOutlined,
    width: 172,
  },
  {
    id: 2,
    name: TableHeaders.Payer,
    value: TableHeaderValues.Payer,
    icon: UserOutlined,
    width: 152,
  },
  {
    id: 3,
    name: TableHeaders.Status,
    value: TableHeaderValues.Status,
    icon: Status,
    width: 136,
  },
  {
    id: 4,
    name: TableHeaders.Email,
    value: TableHeaderValues.Email,
    icon: Hash,
    width: 200,
  },
  {
    id: 5,
    name: TableHeaders.PayerPhone,
    value: TableHeaderValues.PayerPhone,
    icon: Hash,
    width: 146,
  },
  {
    id: 6,
    name: TableHeaders.Services,
    value: TableHeaderValues.Services,
    icon: Hash,
    width: 200,
  },
  {
    id: 7,
    name: TableHeaders.Scheduled,
    value: TableHeaderValues.Scheduled,
    icon: CalendarOutlined,
    width: 170,
  },
];

const getTableHeader = (header: TableHeader) => {
  const { id, value, icon, width } = header;

  return (
    <div
      className="flex gap-1.5 pr-2"
      style={{ minWidth: `${width}px` }}
      key={id}
    >
      <Image src={icon} alt={value} />
      <div className="text-xs font-medium leading-5 text-gray_100">{value}</div>
    </div>
  );
};

const Table: React.FC<TableProps> = ({ sidebarCollapsed }) => {
  const waitlists = useSelector((root: RootState) => root.waitlistSlice).map(
    (waitlist) => ({ ...waitlist, hidden: false })
  );

  const [offset, setOffset] = useState<number>(1);
  const [limit, setLimit] = useState<number>(15);
  const [rows, setRows] = useState<TableRow[]>(
    waitlists.slice(offset - 1, offset + limit - 1)
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
  };

  useEffect(() => {
    setRows(waitlists.slice(offset - 1, offset + limit - 1));
  }, [offset, limit]);

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
        <div className="w-full rounded-md overflow-auto border border-light_border">
          <div className="flex justify-between items-center gap-4 px-4 py-2 border-b border-dark_border">
            <div
              className={`w-[14px] h-[14px] min-w-[14px] flex justify-center items-center rounded-[4px] shadow-shadow_gray ${
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
        offset={offset}
        limit={limit}
        setOffset={setOffset}
        setLimit={setLimit}
      />
    </div>
  );
};

export default Table;
