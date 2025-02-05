import debounce from "@utils/functions";
import React, { useState } from "react";

const RangeSelector: React.FC = ({
  onChange,
  value = 500,
}: {
  onChange: () => {};
  value: number;
}) => {
  const [rangeValue, setRangeValue] = useState(value);
  return (
    <div>
      <div className="range flex items-center justify-between">
        <span>0/-</span>
        <span>{value}/-</span>
      </div>
      <input
        id="default-range"
        type="range"
        min={50}
        max={10000}
        step={100}
        value={rangeValue}
        onChange={(e) => {
          setRangeValue(parseInt(e.target.value));
          debounce(() => {
            onChange(e);
          }, 500)();
        }}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
      />
    </div>
  );
};

export default RangeSelector;
