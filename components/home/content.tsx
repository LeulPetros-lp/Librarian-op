'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";

interface Student {
  _id: string;
  name: string;
  age: number;
  book: string;
  grade: string;
  section: string;
  duration: string;
  status?: string;
}

export const Content: React.FC = () => {
  const [borrowed, setBorrowed] = useState<number>(0);
  const [redzone, setRedZone] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [response, setResponse] = useState<Student[]>([]);

  useEffect(() => {
    // First, update student statuses
    axios.put("http://localhost:5123/update-student-status")
      .then(() => {
        // Then, fetch updated student data
        axios.get("http://localhost:5123/list-students")
          .then((response) => {
            const data = response.data.data as Student[];
            setResponse(data);

            let borrowedCount = 0;
            let redzoneCount = 0;

            data.forEach((item) => {
              if (item.isGood) {
                borrowedCount++;
              } else {
                redzoneCount++;
              }
            });

            setBorrowed(borrowedCount);
            setRedZone(redzoneCount);
          }).catch((error) => {
            console.log(error);
          });
      }).catch((error) => {
        console.error('Error updating student statuses:', error);
      });

    // Fetch stock (books on shelf)
    axios.get("http://localhost:5123/shelf-item")
      .then((response) => {
        let stockCount = 0;
        response.data.data.forEach((item) => {
          stockCount++;
        });
        setStock(stockCount);
      }).catch((error) => {
        console.error('Error fetching shelf items:', error);
      });
  }, []);

  return (
    <div className="h-full px-2">
      <div className="flex flex-col items-center gap-4 pt-3 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Recent Data</h3>
            <div className="flex justify-center items-center h-90">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                <CardBalance1 borrowed={borrowed + redzone} students={response} />
                <CardBalance2 redzone={redzone} students={response} />
                <CardBalance3 stock={stock} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full py-5 px-2 max-w-[90rem] mx-auto gap-3">
          <div className="flex flex-wrap justify-between items-center">
            <h3 className="text-center text-xl font-semibold">Students</h3>
          </div>
          <TableWrapper />
        </div>
      </div>
    </div>
  );
};
