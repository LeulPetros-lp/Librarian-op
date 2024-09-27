"use client";
import React, { useState } from 'react';
import { Image, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import axios from "axios"

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [bookName, setBookName] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [language, setLanguage] = useState<string>("English");


  const add_shelf = async () => {
    try {
      const add_shelf = await axios.put("http://localhost:5123/shelf-manual", {
        bookName,bookAuthor
      });
      console.log(add_shelf);
    } catch (err) {
      console.error('Error adding to shelf:', err);
    }
  };


  return (
    <div className='p-12'>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: 50, position: 'relative', left: 100 }}>
        <div
          style={{
            width: 400,
            height: 550,
            backgroundColor: '#FF2D55',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: 'white',
            fontSize: 25,
            padding: 10,
          }}
        >
          {bookName}
          <br />
          <p style={{ fontSize: 15, position: 'relative', top: 20 }}>- {bookAuthor}</p>
        </div>

        <div style={{ width: '400px', position: 'relative', left: 200 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 2, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{ marginBottom: '10px', display: 'block' }}>Book Title</label>
                <Input
                  type='text'
                  placeholder='Book Title'
                  onChange={(e) => setBookName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <br />

          <label style={{ marginBottom: '10px', display: 'block' }}>Book Author</label>
          <div style={{ width: 400 }}>
            <Input
              placeholder='Book Author'
              type='text'
              fullWidth
              onChange={(e) => setBookAuthor(e.target.value)}
            />
          </div>

          <br />
          <div style={{ display: 'flex', gap: 20 }}>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  fullWidth
                  style={{ position: 'relative', bottom: 5, marginBottom: 5 }}
                >
                  {language}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Select Language">
                <DropdownItem key="amharic" onClick={() => setLanguage("Amharic")}>
                  Amharic
                </DropdownItem>
                <DropdownItem key="english" onClick={() => setLanguage("English")}>
                  English
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <br />
          <Button
            fullWidth
            color="primary"
            onClick={add_shelf} // Open modal when clicked
          >
            Add Book
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Please make sure you filled every input: Confirm Book Addition
                  </ModalHeader>
                  <ModalBody>
                    {/* You can add any content you want here */}
                  </ModalBody>
                  <ModalFooter>
                    <a href='/'>
                    <Button color="primary" onClick={() => {add_shelf}} onPress={() => { onClose(); }}>
                        Confirm To Add Book
                      </Button></a>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
