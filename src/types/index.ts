// Types.ts

/**
 * Defines possible content visibility states.
 */
export type Visibility = 'public' | 'private' | 'unlisted';

/**
 * Defines the types of video content available on the platform.
 */
export type VideoContentType = 'course' | 'series' | 'episode' | 'vlog' | 'song' | 'movie' | 'standalone'; // Added 'standalone' for flexibility

/**
 * Represents user roles within the application for RBAC.
 */
export interface Role {
  id: string; // e.g., 'role_admin', 'role_instructor', 'role_student'
  name: 'admin' | 'instructor' | 'student'; // Enforces specific role names
}

/**
 * Represents a user of the application.
 */
export interface User {
  id: string; // e.g., 'user_12345'
  name: string;
  email: string;
  roleId: Role['id']; // Reference to the Role ID
  avatarUrl?: string; // Optional avatar image URL
  // Add other relevant user profile fields later (e.g., bio, social links)
}

/**
 * Base interface for all video content.
 * Other content types will extend or compose this.
 */
export interface VideoContent {
  id: string; // e.g., 'content_abcde'
  title: string;
  description: string;
  type: VideoContentType; // Discriminator field
  thumbnailUrl: string;
  duration: number; // Duration in seconds
  uploadDate: string; // ISO 8601 date string (e.g., "2025-03-26T10:00:00Z")
  visibility: Visibility;
  creatorId: User['id']; // Reference to the User ID of the creator/uploader
  tags?: string[]; // Optional tags for searching/filtering
}

/**
 * Represents a structured course composed of modules (simplified here).
 * Extends VideoContent but primarily acts as a container/descriptor.
 * Note: A Course itself might not be *directly* playable like a single video,
 * but it shares metadata like title, description, thumbnail.
 * Alternatively, it could have an introductory video represented by the base fields.
 */
export interface Course extends Omit<VideoContent, 'type'> {
  type: 'course';
  // Simplified module structure for now. Could be more complex later.
  modules: Array<{
    id: string; // e.g., 'module_xyz'
    title: string;
    order: number;
    // Could contain 'lessonIds' or similar later
  }>;
  instructorId: User['id']; // Explicit instructor reference
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  // Consider adding total estimated duration, prerequisites, etc. later
  contentIds: string[]; // IDs of VideoContent (episodes/lessons) belonging to this course
}

/**
 * Represents a series of related video content (e.g., a multi-part tutorial).
 */
export interface Series {
  id: string; // e.g., 'series_pqrst'
  title: string;
  description: string;
  thumbnailUrl: string; // Series often have their own branding
  creatorId: User['id'];
  // Contains references to Episodes or other VideoContent IDs that belong to it.
  // Using IDs facilitates normalization in state management.
  episodeIds: Array<VideoContent['id']>;
  // Could add 'genre', 'releaseYear', etc. later
}

/**
 * Represents a single episode, typically part of a Series or potentially a Course.
 * Extends VideoContent as it is a playable video entity.
 */
export interface Episode extends Omit<VideoContent, 'type'> {
  type: 'episode';
  seriesId?: Series['id']; // Optional: An episode might belong to a series
  courseId?: Course['id']; // Optional: An episode might belong to a course (as a lesson)
  episodeNumber?: number; // Order within a series
  seasonNumber?: number; // Optional: For series with seasons
}

// Example of a standalone video type (Vlog, Song, Movie, etc.)
// Uses the base VideoContent interface directly or slightly extended.
export interface Vlog extends Omit<VideoContent, 'type'> {
    type: 'vlog';
    // Add any vlog-specific fields if needed
}

export interface Movie extends Omit<VideoContent, 'type'> {
    type: 'movie';
    // Add movie-specific fields (e.g., genre, director, cast) if needed
}

// etc. for Song, Standalone...

// type UserRole = 'admin' | 'instructor' | 'student' | 'guest';

// Define a more complete User type for the context
// interface UserData {
//   id: string; // Add other relevant fields later
//   name: string;
//   role: UserRole;
// }