"use client"

import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from 'next/image';
import isbnCover from "./images.png"; // Ensure this path is correct
import { useState, useEffect } from "react";
import quotesData from "./quotes";

export default function App() {
    const [quote, setQuote] = useState(null); // Initialize state for a single quote

    // Set a random quote when the component mounts
    useEffect(() => {
        const randomNum = Math.floor(Math.random() * quotesData.length);
        setQuote(quotesData[randomNum]); // Set the random quote
    }, []);

    if (!quote) {
        return <div>Loading...</div>; // Optionally render a loading state
    }

    return (
        <div>
            <div>

                <h1 style={{ textAlign: 'center', paddingTop: 100, paddingBottom: 60, fontSize: 20 }}>
                    <strong>{quote.quote}</strong><br />
                    — {quote.author}, From {quote.book}
                </h1>


                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <a href="/add-student/isbn-book" style={{ padding: 0, margin: 0 }}>
                        <div style={{ width: 400 }}>
                            <Card className="py-4">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <small className="text-default-500">The book has an isbn code</small>
                                    <h4 className="font-bold text-large">Isbn Code</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/EAN-13-ISBN-13.svg/1920px-EAN-13-ISBN-13.svg.png" // Use the imported image here
                                        width={400}
                                        height={400} // You need to specify height for next/image
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </a>


                    <a href="/add-student/manual-book" style={{ padding: 0, margin: 0 }}>
                        <div style={{ width: 400 }}>
                            <Card className="py-4">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <small className="text-default-500">Choose the book from the book shelf</small>
                                    <h4 className="font-bold text-large">From Book Shelf</h4>
                                </CardHeader>
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src="https://img-new.cgtrader.com/items/111824/1e31c2e2fe/children-book-collection-3d-model-c4d.jpg"
                                        width={400}
                                        height={190} // You need to specify height for next/image
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </a>
                </div>



            </div>
        </div>
    );
}
