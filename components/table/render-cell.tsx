import { User, Chip, Button } from "@nextui-org/react";
import React, { useState } from "react";
import Link from "next/link";
import { EditIcon } from "../icons/table/edit-icon"; // Assuming you have the EditIcon imported
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { users } from "./data";
import axios from "axios"

interface Props {
  user: (typeof users)[number];
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey]; // @ts-ignore
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [empty, setIsEmpty] = useState(true);

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the current date and the return date
  const currentDate = new Date();
  const returnDate = new Date(user.returnDate);

  // Function to check if the book is overdue
  const isBookOverdue = returnDate < currentDate;

  // Function to handle opening and closing the modal
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };



  const handleReturnBook = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5123/return-book/${id}`);
      console.log(response.data.message); // Handle success message
      // Optionally, refresh the student list or update the UI to reflect the deletion
    } catch (error) {
      console.error('Error returning book:', error.response.data.error); // Handle error
    }
  };



  switch (columnKey) {
    case "name":
      return (
        <div className="flex items-center gap-2">

          <User
            avatarProps={{ src: "" }}
            name={cellValue}
            style={{ cursor: "pointer" }}
          >
            {user.name}
          </User>
        </div>
      );
    case "age":
      return (
        <div className="flex items-center gap-2">

          <span style={{ cursor: "pointer" }}>{cellValue}</span>

        </div>
      );
    case "gradeSection":
      return (
        <div className="flex items-center gap-2">

          <span style={{ cursor: "pointer" }}>{user.grade}/{user.section}</span>

        </div>
      );
    case "returnDate":
      return (
        <div className="flex items-center gap-2">

          <span style={{ cursor: "pointer" }}>{new Date(user.returnDate).toLocaleDateString()}</span>

        </div>
      );
    case "status":
      return (
        <div className="flex items-center gap-2">
          <Chip
            size="sm"
            variant="flat"
            color={isBookOverdue ? "danger" : "success"}
            style={{ cursor: "pointer" }}
          >
            <span className="capitalize text-xs">
              {isBookOverdue ? "RedZone" : "Borrowed"}
            </span>
          </Chip>


          <Button onClick={onOpen} style={{ border: 'none', background: 'transparent', position: 'relative', left: 50 }}>
            <EditIcon size={20} fill="#979797" />
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Student Information</ModalHeader>
                  <ModalBody>
                    <p>Student Details: The student, <span style={{ fontWeight: "bold" }}>{user.name}</span>, is currently in <span style={{ fontWeight: "bold" }}>{user.gradeSection}</span>. They recently borrowed the book titled <span style={{ fontWeight: "bold" }}>{user.book}</span>," which they checked out on <br></br><span style={{ fontWeight: "bold" }}>{user.duration}</span>. </p>
                    <p>Book Return Date </p>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={isBookOverdue ? "danger" : "success"}
                      style={{ cursor: "pointer" }}
                    >
                      <span className="capitalize text-xs">
                        {isBookOverdue ? "Overdue" : "Borrowed"}
                      </span>
                    </Chip>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>

                    <a href="/">
                      <Button color="primary" onPress={() => { onClose(); handleReturnBook(user._id) }}>
                        Confirm To Return Book
                      </Button>
                    </a>

                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      );
    default:
      return cellValue;
  }
};
