// src/app/(pages)/test-users/page.tsx (Example page route)
"use client"; // Needs to be a client component for useEffect/useState

import React, { useState, useEffect } from "react";
import { User } from "@/types";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material"; // Using MUI components

export default function TestUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetching from the mock API route
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (e: any) {
        setError(e.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Test Users
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && !error && (
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
