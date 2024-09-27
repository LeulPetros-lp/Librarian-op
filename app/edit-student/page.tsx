// pages/user/[id].tsx

"use client"; // This line makes the component a Client Component

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function UserDetailPage() {
  const router = useRouter();
  const { query } = router; // Get the query object
  const { id } = query; // Extract the user ID from the query object
  const [loading, setLoading] = useState(true); // Loading state

  // Effect to handle loading state
  useEffect(() => {
    // Check if the id is available
    if (id) {
      setLoading(false); // Set loading to false when the ID is available
    }
  }, [id]);

  // Render loading state or user details
  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching the ID
  }

  return (
    <div>
      <h1>User ID: {id}</h1>
      <p>Student has returned their book?</p>
    </div>
  );
}

export default UserDetailPage;
