import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, Calendar, MapPin } from "lucide-react";

const schools = [
  "School of Medicine",
  "School of Engineering",
  "School of Business",
  "School of Law",
  "School of Education",
];

const graduationYears = ["2020-2024", "2015-2019", "2010-2014", "Before 2010"];
const locations = ["Lusaka", "Copperbelt", "International", "Other Regions"];

export default function AlumniFilters() {
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
                <input type="checkbox" id={school} className="mr-2" />
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
                <input type="checkbox" id={year} className="mr-2" />
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
                <input type="checkbox" id={location} className="mr-2" />
                <label htmlFor={location} className="text-sm">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
