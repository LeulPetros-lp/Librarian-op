import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

interface Student {
  name: string;
  grade: string;
  section: string;
  isGood?: string;
}

interface CardBalance2Props {
  redzone: number;
  students: Student[];
}

export const CardBalance2: React.FC<CardBalance2Props> = ({ redzone, students }) => {
  // Filter out students in the "Red Zone"
  const redZoneStudents = students.filter((student) => student.isGood === "Red Zone");

  // Limit to 3 students
  const displayedStudents = redZoneStudents.slice(0, 3);

  return (
    <Card className="xl:max-w-sm bg-danger rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">RedZone Students</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">
            {redzone} students
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <span className="text-white text-xs">See More....</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
