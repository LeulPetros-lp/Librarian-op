"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { columns } from "./data";
import { RenderCell } from "./render-cell";
import axios from "axios";

export const TableWrapper = () => {
  const [students, setStudents] = useState([]); // Initialize state to hold students data
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true);

    // Fetch data from the database
    axios
      .get("http://localhost:5123/list-students")
      .then((response) => {
        console.log(response.data.data);
        setStudents(response.data.data); // Update state with fetched students data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={students}>
          {(item) => (
            <TableRow key={item && item._id}>
              {(columnKey) => (
                <TableCell>
                  {/* Pass the data as props to RenderCell */}
                  <RenderCell user={item} columnKey={columnKey} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add Student button */}
      <a href="/add-student">
        <Button color="primary" style={{ width: 1420 }}>
          Add Student
        </Button>
      </a>
    </div>
  );
};
