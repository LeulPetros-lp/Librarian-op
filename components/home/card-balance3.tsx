import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";


type stock = Number;

export const CardBalance3 = ({ stock }: any) => {





  return (
    <a href="/book-shelf">
      <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
        <CardBody className="py-5 overflow-hidden">
          <div className="flex gap-2.5">
            <Community />
            <div className="flex flex-col">
              <span className="text-white">BookShelf ( Stock )</span>
            </div>
          </div>
          <div className="flex gap-2.5 py-2 items-center">
            <span className="text-white text-xl font-semibold">
              {stock} Books
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white text-xs">Check Stock</span>
          </div>

        </CardBody>
      </Card>
    </a>
  );
};
