// src/app/(pages)/page.tsx

import React from "react";
// Keep necessary imports for this component structure
import { Container, Box } from "@mui/material";

// Import types
import { Course, Series, VideoContent } from "@/types";

// Import the shared components
// import { Header } from "@/components/shared/Header";
import { HeroSection } from "@/components/shared/HeroSection";
// Import the NEW FeaturedContent component
import { FeaturedContent } from "@/components/shared/FeaturedContent";

// --- Direct Data Loading ---
import coursesData from "@/data/courses.json";
import seriesData from "@/data/series.json";
import videoContentData from "@/data/videoContent.json";
// --- End Data Loading ---

// --- The Home Page Component ---
export default async function HomePage() {
  // Process imported data
  const allCourses: Course[] = coursesData as Course[];
  const allSeries: Series[] = seriesData as Series[];
  const allVideos: VideoContent[] = videoContentData as VideoContent[];

  const featuredCourses = allCourses.slice(0, 3);
  const featuredSeries = allSeries.slice(0, 3);
  const featuredVideos = allVideos.slice(0, 3);

  const categories = [
    "TypeScript",
    "Next.js",
    "AI/ML",
    "Python",
    "DevOps",
    "UI/UX",
  ];

  const noContentFetched =
    featuredCourses.length === 0 &&
    featuredSeries.length === 0 &&
    featuredVideos.length === 0;

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ mb: 4 }}>
        <HeroSection />

        {/* Container that overlaps the hero slightly */}
        <Container
          maxWidth="lg"
          sx={{ mt: { xs: 4, md: -6 }, zIndex: 1, position: "relative" }}>
          {/* Render the new Client Component, passing data as props */}
          <FeaturedContent
            courses={featuredCourses}
            series={featuredSeries}
            videos={featuredVideos}
            categories={categories}
            hasError={noContentFetched}
          />
        </Container>
      </Box>
      {/* Add Footer component here */}
    </>
  );
}
