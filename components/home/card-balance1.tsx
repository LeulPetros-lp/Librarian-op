"use-client"
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Community } from "../icons/community";
import axios from "axios";

export const CardBalance1 = ({ borrowed, students }) => {


  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-10 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Borrowed Student</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{borrowed} students</span>
        </div>
        <div className="flex items-center gap-6">
          {/* <div>
            { students && <span className="text-white text-xs">{students[0] && students[0].name} ( {students[0] && students[0].grade}{students[0] && students[0].section} )</span>}
          </div>

          <div>

          { students && <span className="text-white text-xs">{students[1] && students[1].name} ( {students[1] && students[1].grade}{students[1] && students[1].section} )</span>}
          </div> */}
          <span className="text-white text-xs">See More....</span>
        </div>

        <div>

          {/* <span className="text-white text-xs">See More..</span> */}
        </div>
      </CardBody>
    </Card>
  );
};
