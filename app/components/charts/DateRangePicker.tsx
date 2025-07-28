"use client";

import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangePickerProps {
  value: { start: Date; end: Date };
  onChange: (range: { start: Date; end: Date }) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (ranges: any) => {
    onChange({
      start: ranges.selection.startDate,
      end: ranges.selection.endDate,
    });
  };

  const selectionRange = {
    startDate: value.start,
    endDate: value.end,
    key: "selection",
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        {value.start.toLocaleDateString()} - {value.end.toLocaleDateString()}
      </button>

      {showPicker && (
        <div className="absolute z-10 mt-1 right-0 bg-white shadow-lg rounded-md">
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
          />
        </div>
      )}
    </div>
  );
}