'use client';
import React, { useState, ChangeEvent } from 'react';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import axios from 'axios';

interface Book {
  key: string;
  cover_i?: number;
  author_name?: string[];
  title?: string;
  isbn?: string[];
}

const Page: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [addError, setAddError] = useState<string | null>(null);

  const fetchBooks = async (searchQuery: string) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}`);
      console.log(response.data); // Log the response data for debugging
      setBooks(response.data.docs);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        setError(error.message);
      } else {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      fetchBooks(query);
    }
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book); // Set the clicked book as the selected book
    onOpen(); // Open the modal
  };

  const handleAddBook = async () => {
    if (selectedBook) {
      try {
        // Extract necessary details for the book
        const bookDets = {
          title: selectedBook.title || 'Unknown Title',
          coverImageUrl: selectedBook.cover_i
            ? `https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg`
            : "https://bookshow.blurb.com/bookshow/cache/P14573326/md/cover_2.jpeg?access_key=6890e15bab68c1c63a894a2f8e21728a",
          isbn: selectedBook.isbn ? selectedBook.isbn[0] : "00000000000",
        };

        // Make the PUT request to add the book to the shelf
        const response = await axios.put('http://localhost:5123/add-shelf', { bookDets });

        if (response.status === 200) {
          console.log('Book added to shelf:', response.data);
          onOpenChange(); // Close the modal after success
        }
      } catch (err) {
        console.error('Error adding book to shelf:', err);
        setAddError('Failed to add book to shelf');
      }
    }
  };

  return (
    <div className="text-center p-10">
      <div className="flex justify-center space-x-4 mb-10">
        <Input
          isClearable
          className="w-full max-w-md"
          placeholder="Try: Lords of the ring"
          value={query}
          onChange={handleInputChange}
        />
        <Button color="primary" onPress={handleSearchClick}>Get Book</Button>
        <a href="/books/manual-add">
          <Button color="primary">Manual Add</Button>
        </a>
      </div>
      {loading ? (
        <p>Getting {query}...</p>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.key}
                className="flex flex-col items-center w-32"
                onClick={() => handleBookClick(book)} // Handle click event on image
                style={{ cursor: 'pointer' }}
              >
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt="Book cover"
                    className="w-full h-auto mb-2"
                    style={{ width: 300, borderRadius: 10 }}
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500" style={{ borderRadius: 10 }}>
                    No Image
                  </div>
                )}
                <p className="text-center text-sm text-gray-700">{book.title}</p>
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      )}

      {/* Modal for book confirmation */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            Confirm Book Addition
          </ModalHeader>
          <ModalBody>
            {selectedBook && (
              <div className="text-center">
                <p><strong>Title:</strong> {selectedBook.title}</p>
                <p><strong>Author:</strong> {selectedBook.author_name?.join(", ") || "Unknown Author"}</p>
              </div>
            )}
            {addError && <p className="text-red-500 mt-2">{addError}</p>}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onOpenChange}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddBook}>
              Confirm Add Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Page;
