import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="
        group
        w-full
        h-full
        p-4 sm:p-5 lg:p-6
        rounded-xl
        bg-white
        border border-gray-100
        shadow-sm
        hover:shadow-xl
        cursor-pointer
        transition-all duration-300
        hover:-translate-y-1
        flex flex-col
        justify-between
        gap-3
        min-h-[180px]
      "
    >
      {/* Top Content */}
      <div className="space-y-2">
        {/* Company Info */}
        <div>
          <h1 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-900 line-clamp-1">
            {job?.company?.name}
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
            India
          </p>
        </div>

        {/* Job Title & Description */}
        <div>
          <h1 className="font-bold text-base sm:text-lg lg:text-xl text-gray-800 line-clamp-1 group-hover:text-[#6A38C2] transition-colors">
            {job?.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {job?.description}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <Badge className="text-blue-700 text-xs sm:text-sm" variant="ghost">
          {job?.jobType}
        </Badge>

        <Badge className="text-[#F83002] text-xs sm:text-sm" variant="ghost">
          {job?.position} Positions
        </Badge>

        <Badge className="text-[#7209b7] text-xs sm:text-sm" variant="ghost">
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;