import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import Image from "next/image";

import { Schedule } from "@assets";
import ChevronLeft from "@assets/chevron-left.svg";
import ChevronRight from "@assets/chevron-right.svg";

interface DatePickerProps {
  initialValue: Date | null;
  disabled: boolean;
  handleChange: (value: Date) => void;
}

type CustomHeaderProps = {
  monthDate: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
};

const getCustomHeader = ({
  monthDate,
  increaseMonth,
  decreaseMonth,
}: CustomHeaderProps) => (
  <div className="flex bg-white">
    <div
      className="min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] flex justify-center items-center rounded-md border border-dark_grey_border shadow-shadow_minimal"
      onClick={decreaseMonth}
    >
      <Image src={ChevronLeft} alt="Chevron Left" />
    </div>
    <div className="w-full flex justify-center items-center font-inter font-medium text-sm text-jet_black">
      {format(monthDate, "MMMM")}
    </div>
    <div
      className="min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] flex justify-center items-center rounded-md border border-dark_grey_border shadow-shadow_minimal"
      onClick={increaseMonth}
    >
      <Image src={ChevronRight} alt="Chevron Right" />
    </div>
  </div>
);

const DatePicker: React.FC<DatePickerProps> = ({
  initialValue,
  disabled,
  handleChange,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(
    initialValue ? format(initialValue, "dd MMM yyyy") : "Pick a date"
  );
  const [includeDates, setIncludeDates] = useState<Date[]>(
    getDatesForMonth(new Date())
  );

  function getDatesForMonth(date: Date) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    return eachDayOfInterval({ start, end });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (value: Date | null) => {
    if (value) {
      setValue(format(value, "dd MMM yyyy"));
      handleChange(value);
    }
  };

  const handleMonthChange = (date: Date) => {
    setIncludeDates(getDatesForMonth(date));
  };

  return (
    <ReactDatePicker
      disabled={disabled}
      showPopperArrow={false}
      onCalendarOpen={handleOpen}
      onCalendarClose={handleClose}
      onChange={handleValueChange}
      onMonthChange={handleMonthChange}
      includeDates={includeDates}
      customInput={
        <div
          className={`border-2 ${
            open ? "rounded-lg border-gray_100" : "border-transparent"
          }`}
        >
          <div className="flex gap-2 rounded-md px-4 py-2 shadow-shadow_minimal border border-light_border">
            <Image src={Schedule} alt="Schedule" />
            <div className="text-sm font-normal text-gray_500">{value}</div>
          </div>
        </div>
      }
      renderCustomHeader={getCustomHeader}
    />
  );
};

export default DatePicker;
