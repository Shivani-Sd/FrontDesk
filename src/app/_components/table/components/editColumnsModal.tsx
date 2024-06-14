/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { RootState } from "@store";
import { TableHeader } from "@types";
import { resetHeaders, setHeaders } from "@features/table/tableSlice";
import Check from "@assets/check.svg";

interface EditColumnsModalProps {
  setEditColumns: Dispatch<SetStateAction<boolean>>;
}

const GetModalItem = (tableHeaders: TableHeader[], index: number) => {
  const tableHeader = tableHeaders[index];

  const { id, descriptiveValue: header, hidden } = tableHeader;

  const [select, setSelect] = useState<boolean>(!hidden);

  const handleSelect = () => {
    setSelect((prev) => !prev);
  };

  // Update header object when selected or unselected
  useEffect(() => {
    tableHeaders[index] = {
      ...tableHeaders[index],
      hidden: !select,
    };
  }, [select]);

  return (
    <div className="flex items-center gap-2" key={id}>
      <div
        className={`w-[16px] h-[16px] min-w-[16px] flex justify-center rounded-[4px] shadow-shadow_soft ${
          select ? "bg-pitch_black" : "bg-white border border-gray_border "
        }`}
        onClick={handleSelect}
        role="checkbox"
        aria-checked={select}
        aria-label={select ? "Deselect column" : "Select column"}
      >
        {select && <Image src={Check} alt="Check" />}
      </div>
      <div className="w-full flex gap-2 px-3 py-1.5 rounded-md border border-light_border">
        <div className="text-sm leading-6 text-smokey_black font-medium">
          {header}
        </div>
      </div>
    </div>
  );
};

const EditColumnsModal = forwardRef<HTMLDivElement, EditColumnsModalProps>(
  ({ setEditColumns }, ref) => {
    const dispatch = useDispatch();

    const tableHeaders = useRef<TableHeader[]>(
      _.cloneDeep(useSelector((root: RootState) => root.tableSlice.headers))
    );

    // Update store with new hidden columns
    const handleApply = () => {
      dispatch(setHeaders(tableHeaders.current));
      setTimeout(() => {
        setEditColumns(false);
      }, 100);
    };

    // Update store to reset columns
    const handleReset = () => {
      dispatch(resetHeaders());
      setTimeout(() => {
        setEditColumns(false);
      }, 100);
    };

    return (
      <div
        className="w-[320px] flex flex-col gap-4 absolute top-[60px] right-0 z-10 rounded-xl p-4 bg-white border border-light_border"
        ref={ref}
        role="dialog"
        aria-labelledby="edit-columns-dialog"
      >
        <div className="flex flex-col gap-2">
          <div
            className="text-base text-black font-medium"
            id="edit-columns-dialog"
          >
            Edit Columns
          </div>
          <div className="text-sm text-smokey_black font-normal">
            Select the columns to rearrange
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {tableHeaders.current.map((_, index) =>
            GetModalItem(tableHeaders.current, index)
          )}
        </div>
        <div className="flex gap-3">
          <button
            className="w-full flex justify-center items-center gap-2.5 px-3 py-1 rounded-md border border-light_border"
            onClick={handleReset}
            role="button"
            aria-label="Reset to Default"
          >
            <div className="text-sm leading-6 text-smokey_black font-medium button">
              Reset to Default
            </div>
          </button>
          <button
            className="w-full flex justify-center items-center gap-2.5 px-3 py-1 rounded-md bg-light_black button"
            onClick={handleApply}
            role="button"
            aria-label="Apply Changes"
          >
            <div className="text-sm leading-6 text-white font-medium">
              Apply
            </div>
          </button>
        </div>
      </div>
    );
  }
);

EditColumnsModal.displayName = "EditColumnsModal";

export default EditColumnsModal;
