"use client";

import React, { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Calendar, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


const graduationYears = ["2020-2024", "2015-2019", "2010-2014", "Before 2010"];
const locations = ["Lusaka", "Copperbelt", "International", "Other Regions"];

interface AlumniFiltersProps {
  schools: string[];
}

export default function AlumniFilters({ schools }: AlumniFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string[]>) => {
      const current = new URLSearchParams(searchParams.toString());

      // Clear existing filter params
      current.delete("schools");
      current.delete("years");
      current.delete("locations");

      // Add new filter params
      Object.entries(params).forEach(([key, values]) => {
        if (values.length > 0) {
          current.set(key, values.join(","));
        }
      });

      return current.toString();
    },
    [searchParams]
  );

  const handleApplyFilters = () => {
    const selectedSchools = Array.from(
      document.querySelectorAll('input[name="school"]:checked')
    ).map((cb) => (cb as HTMLInputElement).value);
    const selectedYears = Array.from(
      document.querySelectorAll('input[name="year"]:checked')
    ).map((cb) => (cb as HTMLInputElement).value);
    const selectedLocations = Array.from(
      document.querySelectorAll('input[name="location"]:checked')
    ).map((cb) => (cb as HTMLInputElement).value);

    const queryString = createQueryString({
      schools: selectedSchools,
      years: selectedYears,
      locations: selectedLocations,
    });

    router.push(`/alumni?${queryString}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-3">
            <School className="h-4 w-4" /> Schools
          </h3>
          <div className="space-y-2">
            {schools.map((school) => (
              <div key={school} className="flex items-center">
                <input
                  type="checkbox"
                  id={school}
                  name="school"
                  value={school}
                  className="mr-2"
                  defaultChecked={searchParams.get("schools")?.includes(school)}
                />
                <label htmlFor={school} className="text-sm">
                  {school}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-3">
            <Calendar className="h-4 w-4" /> Graduation Year
          </h3>
          <div className="space-y-2">
            {graduationYears.map((year) => (
              <div key={year} className="flex items-center">
                <input
                  type="checkbox"
                  id={year}
                  name="year"
                  value={year}
                  className="mr-2"
                  defaultChecked={searchParams.get("years")?.includes(year)}
                />
                <label htmlFor={year} className="text-sm">
                  {year}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-3">
            <MapPin className="h-4 w-4" /> Location
          </h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <div key={location} className="flex items-center">
                <input
                  type="checkbox"
                  id={location}
                  name="location"
                  value={location}
                  className="mr-2"
                  defaultChecked={searchParams
                    .get("locations")
                    ?.includes(location)}
                />
                <label htmlFor={location} className="text-sm">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
