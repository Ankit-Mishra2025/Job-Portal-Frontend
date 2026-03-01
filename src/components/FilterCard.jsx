import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setsearchedQuery } from "@/redux/jobSlice";
import { X } from "lucide-react";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  const clearFilter = () => {
    setSelectedValue('');
  }

  useEffect(() => {
    dispatch(setsearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-base sm:text-lg text-gray-900">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <hr className="mb-4" />

      <RadioGroup onValueChange={changeHandler} value={selectedValue} className="space-y-5">
        {fitlerData.map((data, index) => (
          <div key={index}>
            {/* Filter Type Heading */}
            <h2 className="font-semibold text-sm sm:text-base text-gray-800 mb-2">
              {data.fitlerType}
            </h2>

            {/* Options */}
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                const isSelected = selectedValue === item;
                return (
                  <div
                    key={itemId}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg cursor-pointer transition-colors
                      ${isSelected
                        ? 'bg-purple-50 border border-purple-200'
                        : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    onClick={() => changeHandler(item)}
                  >
                    <RadioGroupItem value={item} id={itemId} className="text-[#6A38C2]" />
                    <Label
                      htmlFor={itemId}
                      className={`text-xs sm:text-sm cursor-pointer transition-colors ${
                        isSelected ? 'text-[#6A38C2] font-medium' : 'text-gray-600'
                      }`}
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>

            {/* Divider between sections */}
            {index < fitlerData.length - 1 && <hr className="mt-4" />}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;