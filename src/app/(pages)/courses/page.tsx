// src/app/(app)/courses/[courseId]/page.tsx

'use client'
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation"; // To handle course not found
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
// Assuming direct JSON import for mock data (replace with API call later)
import coursesData from "@/data/courses.json";
import usersData from "@/data/users.json";
import { Course, User } from "@/types"; // Import your types
// Import Lucide icons
import {
  BookOpen,
  User as UserIcon,
  BarChart,
  ListChecks,
  PlayCircle,
  ArrowLeft,
} from "lucide-react";

// --- Mock Data Fetching Function ---
// Replace this with your actual API fetching logic
async function getCourseData(
//   courseId: string
): Promise<{ course: Course; instructor: User | null } | null> {
  const course = (coursesData as Course[]).find((c) => c.id === `course_ts101`);
  if (!course) {
    return null;
  }
  // Find instructor details
  const instructor =
    (usersData as User[]).find((u) => u.id === course.instructorId) || null;
  return { course, instructor };
}
// --- End Mock Data Fetching ---

// Server Component for the Course Detail Page
export default async function CoursePage({
}: {
  
}) {
  const data = await getCourseData(params.courseId);

  // Handle course not found
  if (!data) {
    notFound(); // Triggers the 404 page
  }

  const { course, instructor } = data;
  const firstLessonHref =
    course.contentIds.length > 0 ? `/watch/${course.contentIds[0]}` : "#"; // Link to first lesson/video

  return (
    // Using Box instead of Container might give more width control within MainLayout
    <Box sx={{ py: 4 }}>
      {" "}
      {/* Add some vertical padding */}
      {/* Back Button (Optional) */}
      <Button
        component={Link}
        href="/courses" // Or wherever your course list is
        startIcon={<ArrowLeft size={18} />}
        sx={{ mb: 3 }}>
        Back to Courses
      </Button>
      {/* Header Section with Playful Dialog */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 4 },
          mb: 4,
          overflow: "hidden",
          position: "relative",
        }}>
        {/* Optional decorative element */}
        <BookOpen
          size={100}
          style={{
            position: "absolute",
            right: -20,
            top: -10,
            opacity: 0.05,
            color: "primary.main",
          }}
        />

        {/* --- PLAYFUL DIALOG --- */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Level Up: {course.title} ✨
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {`Welcome to the learning environment! Let's explore the modules, debug concepts together, and build something awesome. 🚀
`}{" "}
        </Typography>
        {/* --- END PLAYFUL DIALOG --- */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
          }}>
          {/* Instructor Info */}
          {instructor && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={instructor.avatarUrl || undefined}
                sx={{ width: 32, height: 32 }}>
                {!instructor.avatarUrl && <UserIcon size={18} />}
              </Avatar>
              <Typography variant="subtitle1">
                Taught by {instructor.name}
              </Typography>
            </Box>
          )}
          {/* Difficulty Chip */}
          <Chip
            icon={<BarChart size={16} />}
            label={course.difficultyLevel}
            color={
              course.difficultyLevel === "beginner"
                ? "success"
                : course.difficultyLevel === "intermediate"
                ? "warning"
                : "error"
            }
            variant="outlined"
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          {course.description}
        </Typography>

        {/* Start Course Button */}
        <Button
          component={Link}
          href={firstLessonHref}
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<PlayCircle />}
          sx={{ mt: 2 }}
          disabled={!firstLessonHref || firstLessonHref === "#"} // Disable if no lessons
        >
          Start Course
        </Button>
      </Paper>
      {/* Modules/Lessons Section */}
      <Grid container spacing={4}>
        <Grid item size={{ xs: 12 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <ListChecks /> Course Content (The Roadmap)
          </Typography>
          <Paper elevation={1} sx={{ p: 2 }}>
            {/* Check if there are modules defined */}
            {course.modules && course.modules.length > 0 ? (
              <List disablePadding>
                {course.modules.map((module, index) => (
                  // Assuming module ID relates to content or use contentIds directly
                  // For demo, link uses first contentId or placeholder based on module index if needed
                  <ListItem
                    key={module.id}
                    disablePadding
                    divider={index < course.modules.length - 1}>
                    <ListItemButton
                      component={Link}
                      // This linking logic might need refinement based on your data structure
                      // e.g., linking to /courses/[courseId]/module/[moduleId] or directly to first lesson of module
                      href={`/watch/${course.contentIds[index] || "#"}`} // Example link to corresponding lesson
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Typography variant="h6" color="text.secondary">
                          {index + 1}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText
                        primary={module.title}
                        // secondary={`Placeholder for module description or duration`}
                      />
                      <PlayCircle color={theme.palette.action.active} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : course.contentIds && course.contentIds.length > 0 ? (
              // Fallback if no modules, just list contentIds (less ideal structure)
              <List disablePadding>
                {course.contentIds.map((contentId, index) => (
                  <ListItem
                    key={contentId}
                    disablePadding
                    divider={index < course.contentIds.length - 1}>
                    <ListItemButton
                      component={Link}
                      href={`/watch/${contentId}`}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Typography variant="h6" color="text.secondary">
                          {index + 1}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary={`Lesson ${index + 1}`} />{" "}
                      {/* Placeholder title */}
                      <PlayCircle color={theme.palette.action.active} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary" sx={{ p: 2 }}>
                Course content details coming soon!
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Optional: Add Prerequisites, Related Courses, etc. sections here */}
      </Grid>
    </Box>
  );
}
