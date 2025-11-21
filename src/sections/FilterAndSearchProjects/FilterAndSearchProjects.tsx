import { Search } from "lucide-react";
import React from "react";

const FilterAndSearchProjects = () => {
  return (
    <>
      {/* Filter and Search */}
      <section className="p-14 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Showing projects info */}
            <div className="flex items-center gap-2 text-sm sm:text-base text-orange-600 font-medium">
              <span>Showing 6 projects</span>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-orange-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 shadow-sm w-full"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 w-full sm:w-auto">
                <select className="flex-1 px-4 py-2 border border-orange-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 shadow-sm">
                  <option>All Categories</option>
                  <option>Sustainability</option>
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                </select>
                <select className="flex-1 px-4 py-2 border border-orange-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 shadow-sm">
                  <option>All Stages</option>
                  <option>Concept</option>
                  <option>Development</option>
                  <option>Testing</option>
                  <option>Launch</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterAndSearchProjects;
