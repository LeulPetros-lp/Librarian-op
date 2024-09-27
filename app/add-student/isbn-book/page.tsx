"use client";
import React, { useEffect, useState } from 'react';
import { Image, Input, Autocomplete, AutocompleteItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useRouter } from 'next/navigation';




interface BookDetails {
  title: string;
  coverImageUrl: string;
  isbn: string;
}

type Duration = '3-days' | '1-week' | '2-week' | '1-month';
type Age = number;
type bookOption = string;

interface ReturnDate {
  day: number;
  month: number;
  year: number;
}

interface ShelfItem {
  _id: string;
  BookName: string;
}

export default function Page() {


  const router = useRouter();





  const [bookDets, setBookDetails] = useState<BookDetails | null>(null);
  const [isbn, setIsbn] = useState<string>('');
  const [duration, setDuration] = useState<Duration | null>(null);
  const [returnDate, setReturnDate] = useState<ReturnDate | null>(null);
  const [age, setAge] = useState<Age | ''>('');
  const [grade, setGrade] = useState<number | ''>('');
  const [section, setSection] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isGood, setIsGood] = useState<Boolean>(true);
  const [shelf, setShelf] = useState<ShelfItem[]>([]);
  const [bookOption, setBookOption] = useState<bookOption>('');
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [empty, setIsEmpty] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();






  const handleAddStudentClick = () => {
    // Check if any field is empty
    if (!name.trim() || !age || !isbn.trim() || !grade || !section.trim() || !duration) {
      setIsEmpty(true); 
      onOpen()
    } else {
      setIsEmpty(false);
      onOpen();
    }
  };



  const getBook = async () => {
    if (!isbn.trim()) {
      console.log('ISBN is empty');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5123/api/book/${isbn}`);
      console.log('API Response:', response.data);

      if (response.data && response.data.title) {
        const bookDetails: BookDetails = {
          title: response.data.title,
          coverImageUrl: response.data.coverImageUrl,
          isbn: isbn
        };
        setBookDetails(bookDetails);
      } else {
        setBookDetails({ title: 'Book Not Found', coverImageUrl: '', isbn: isbn });
      }
    } catch (error) {
      console.error('There was an error with the API request!', error);
      setBookDetails({ title: 'Book Not Found', coverImageUrl: '', isbn: isbn });
    }
  };

  const handleDuration = (key: string) => {
    if (['3-days', '1-week', '2-week', '1-month'].includes(key)) {
      setDuration(key as Duration);
    } else {
      console.error('Invalid duration key');
    }
  };

  useEffect(() => {
    const calc_return_date = () => {
      let date_col = new Date();

      switch (duration) {
        case '3-days':
          date_col.setDate(date_col.getDate() + 3);
          break;
        case '1-week':
          date_col.setDate(date_col.getDate() + 7);
          break;
        case '2-week':
          date_col.setDate(date_col.getDate() + 14);
          break;
        case '1-month':
          date_col.setMonth(date_col.getMonth() + 1);
          break;
        default:
          console.log("Invalid duration");
          return null;
      }

      const day = date_col.getDate();
      const month = date_col.getMonth() + 1;
      const year = date_col.getFullYear();

      setReturnDate({ day, month, year });
    };

    if (duration) calc_return_date();
  }, [duration]);



  const done_btn = async () => {
    try {
      const response_data_push = await axios.post("http://localhost:5123/add-student", {
        bookDets,
        name,
        age,
        grade,
        section,
        duration,
        returnDate,
        isGood
      });

      console.log(response_data_push);


    } catch (err_db) {
      console.error('Error submitting data:', err_db);
    }
  };

  const add_shelf = async () => {
    try {
      const add_shelf = await axios.put("http://localhost:5123/add-shelf", {
        bookDets
      });
      console.log(add_shelf);
    } catch (err) {
      console.error('Error adding to shelf:', err);
    }
  };

  useEffect(() => {
    const get_shelf = async () => {
      try {
        const response = await axios.get("http://localhost:5123/shelf-item");
        setShelf(response.data.data);
      } catch (err) {
        console.error('Error fetching shelf items:', err);
      }
    };
    get_shelf();
  }, []);

  return (
    <div className='p-12'>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: 50, position: 'relative', left: 100 }}>
        <Image
          isZoomed
          width={400}
          alt="Book Cover"
          src={bookDets?.coverImageUrl || "https://covers.openlibrary.org/b/id/7898938-L.jpg"}
        />

        <div style={{ width: '400px', position: 'relative', left: 200 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 2, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{ marginBottom: '10px', display: 'block' }}>Student Fullname</label>
                <Input
                  type='text'
                  placeholder='Student Fullname'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ width: 80 }}>
                <label style={{ marginBottom: '10px', display: 'block' }}>Age</label>
                <Input
                  type='text'
                  placeholder='Age'
                  value={age !== '' ? String(age) : ''}
                  onChange={(e) => setAge(e.target.value !== '' ? parseInt(e.target.value) : '')}
                />
              </div>
            </div>
          </div>
          <br />

          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1, marginBottom: 20 }}>
              <label style={{ marginBottom: '10px', display: 'block' }}>Isbn code</label>
              <Input
                placeholder='Isbn code'
                type='number'
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
            </div>

            <Button color='primary' style={{ position: 'relative', top: 30 }} onClick={getBook}>
              Get Book
            </Button>


          </div>
          <label style={{ marginBottom: '10px', display: 'block' }}>Book Name</label>
          <div style={{ width: 400 }}>
            <Input
              placeholder='Book Name'
              type='text'
              value={bookDets?.title}
              fullWidth
              onChange={(e) => setIsbn(e.target.value)}
              isDisabled
            />
          </div>
          <div style={{ width: 500 }}>
            {/* <Autocomplete 
            variant={'bordered'}
            defaultItems={shelf}
            label="Select an animal" 
            className="max-w-xs" 
            width={600}
            onChange={(e) => setBookOption(e.target.value)}
          >
            {(item) => <AutocompleteItem key={item._id}>{item.BookName}</AutocompleteItem>}
          </Autocomplete> */}
          </div>

          <br />
          <Button fullWidth color="primary" onClick={add_shelf}>
            Add to Shelf
          </Button>
          <br />
          <br></br>
          <br></br>

          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1, marginBottom: 20 }}>
              <label style={{ marginBottom: '10px', display: 'block' }}>Grade</label>
              <Input
                type='text'
                placeholder='Grade'
                value={grade !== '' ? String(grade) : ''}
                onChange={(e) => setGrade(e.target.value !== '' ? parseInt(e.target.value) : '')}
              />
            </div>
            <div style={{ width: 100, marginBottom: 20 }}>
              <label style={{ marginBottom: '10px', display: 'block' }}>Section</label>
              <Input
                type='text'
                placeholder='Section'
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
            </div>
          </div>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                fullWidth
                style={{ position: 'relative', bottom: 5, marginBottom: 5 }}
              >
                {!duration ? " Borrow Duration" : duration}
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={handleDuration} aria-label="Static Actions">
              <DropdownItem key="3-days">3 days</DropdownItem>
              <DropdownItem key="1-week">1 week</DropdownItem>
              <DropdownItem key="2-week">2 weeks</DropdownItem>
              <DropdownItem key="1-month">1 month</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <br />
          {/* <Button fullWidth color="primary" onClick={done_btn}>
            Submit
          </Button> */}
          <Button
            fullWidth
            color="primary"
            onPress={handleAddStudentClick}  // Trigger popover or modal
          >
            Add student
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{empty ? "Please make sure you filled every input" : "Confirm Student Addition"}</ModalHeader>
                  <ModalBody>
                    <p>Do you want to add the student with the following details?</p>
                    <p>Name: {name}</p>
                    <p>Age: {age}</p>
                    <p>Grade: {grade}, Section: {section}</p>
                    <p>Duration: {duration}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <a href='/'>
                      <Button color="primary" onPress={() => { onClose(); done_btn(); }}>
                        Confirm To Add Student
                      </Button>
                    </a>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>


          <br />
          {returnDate && (
            <p style={{ position: 'relative' }}>
              The book should be returned by {returnDate.day}/{returnDate.month}/{returnDate.year}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
