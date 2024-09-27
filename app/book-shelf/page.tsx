"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "@nextui-org/react"; // Importing Image from NextUI
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';

// Define types for the book data
interface Book {
  _id: string;
  ImgUrl: string | null;
  BookName: string;
  Isbn: string;
}

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // To store the selected book for the modal
  const { isOpen, onOpenChange } = useDisclosure(); // Handle modal state

  // Fetch the shelf books from the backend
  useEffect(() => {
    axios.get("http://localhost:5123/shelf-item")
      .then((response) => {
        setBooks(response.data.data); // Assuming the books are in the `data` array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shelf items:", error);
        setLoading(false);
      });
  }, []);

  // Function to delete a book
  const handleDeleteBook = async (bookId: string) => {
    try {
      await axios.delete(`http://localhost:5123/shelf-item/${bookId}`);
      setBooks(books.filter(book => book._id !== bookId)); // Update the local state
    } catch (error) {
      console.error("Error deleting book:", error);
      alert('Error deleting book. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Library Book Shelf</h1>
      <br />

      <div className="flex flex-wrap justify-center gap-4">
        {books.length > 0 ? (
          books.map((book: Book) => (
            <div key={book._id} className="flex flex-col items-center w-32">
              <img
                src={book.ImgUrl || ''}
                alt="Book cover"
                className="w-full h-auto mb-2"
                style={{ width: 300, borderRadius: 10 }}
                onClick={() => {
                  setSelectedBook(book);
                  onOpenChange(); // Open the modal to show book details
                }}
              />
              <p className="text-center text-sm text-gray-700">{book.BookName}</p>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            Book Details
          </ModalHeader>
          <ModalBody>
            {selectedBook && (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <img
                    src={selectedBook.ImgUrl || ''}
                    alt="Book cover"
                    className="w-32 h-auto"
                    style={{ borderRadius: 10 }}
                  />
                </div>
                <p><strong>Title:</strong> {selectedBook.BookName}</p>
                <p><strong>ISBN:</strong> {selectedBook.Isbn || "Not provided"}</p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={onOpenChange}>
              Close
            </Button>
            <Button
              color="danger"
              onClick={() => {
                if (selectedBook) {
                  handleDeleteBook(selectedBook._id);
                  onOpenChange(); // Close the modal after deletion
                }
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
