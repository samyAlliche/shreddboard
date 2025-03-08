// src/components/DatePickerButton.tsx
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "./icons/CalendarIcon";

interface DatePickerButtonProps {
  onDatePick: (date: Date) => void;
  currentDate: Date;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  onDatePick,
  currentDate,
}) => {
  const [expirationDate, setExpirationDate] = useState<Date>(currentDate);
  const CalendarButton = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void; className?: string }
  >(({ onClick, className }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className={`p-2 rounded-full hover:scale-110 duration-150 ease-in-out transform flex items-center justify-center ${className}`}
    >
      <CalendarIcon />
    </button>
  ));

  return (
    <DatePicker
      selected={expirationDate}
      //minDate={new Date()}
      onChange={(date: Date | null) => {
        if (date) {
          setExpirationDate(date);
          onDatePick(date);
        }
      }}
      // Use the custom input as the button trigger for the native calendar
      customInput={<CalendarButton />}
      withPortal
    />
  );
};

export default DatePickerButton;
