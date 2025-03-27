## Tech Stack (Frontend)

* **Framework:** [Next.js](https://nextjs.org/) (v14+ with App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **UI Library:** [Material-UI (MUI)](https://mui.com/) v5+
* **Styling:** [Emotion](https://emotion.sh/) (via MUI), CSS Modules (via Next.js `globals.css`)
* **Iconography:** [Lucide Icons](https://lucide.dev/)
* **Data Fetching (Initial):** Direct JSON imports / Next.js Route Handlers (Mock API)
* **Linting/Formatting:** ESLint (configured by `create-next-app`)

## Features Implemented (Initial Setup)

* **Responsive Layout:** Main application layout featuring a persistent, collapsible sidebar (Drawer) and a top AppBar using MUI components (`src/components/layout/MainLayout.tsx`).
* **Theming:**
    * Switchable **Light & Dark Modes**.
    * Custom MUI theme provider (`src/providers/CustomThemeProvider.tsx`) with a modern, engaging color palette (Blue primary, Magenta secondary).
    * Theme preference persisted in `localStorage`.
    * Theme toggle button integrated into the AppBar.
* **Mock API:**
    * Simulated API using Next.js Route Handlers (`src/app/api/`).
    * Serves static dummy JSON data for entities like Users, Roles, Courses, Series, etc.
* **Dummy Data:** Representative JSON data (`src/data/`) based on defined TypeScript interfaces (`src/types/`).
* **Core Data Structures:** Well-typed TypeScript interfaces for main application entities.
* **Component Structure:** Organized codebase with directories for shared UI (`ui`), shared application components (`shared`), feature-specific modules (`features`), providers, types, data, etc.
* **Example Home Page:** Demonstrates layout usage, direct data loading (for featured content), and usage of Client Components (`HeroSection`, `FeaturedContent`) for theme-dependent styling within a Server Component page structure.

## Project Structure
src/
├── app/              # Next.js App Router (pages, layouts, api routes)
│   ├── api/          # Mock API Route Handlers
│   ├── (pages)/      # Page components (using route groups)
│   └── layout.tsx    # Root layout (integrates theme & main layout)
├── components/
│   ├── layout/       # Main layout components (MainLayout.tsx)
│   ├── ui/           # App-agnostic, reusable UI elements
│   └── shared/       # App-specific shared components (Header, HeroSection, FeaturedContent, etc.)
├── config/           # Application configuration (e.g., navigation items)
├── data/             # Static dummy JSON data files
├── features/         # Feature-specific modules (e.g., course-list, video-player) - To be populated
├── hooks/            # Shared custom React hooks
├── lib/              # Shared utility functions, constants, etc.
├── providers/        # Global providers (CustomThemeProvider.tsx, ThemeRegistry.tsx)
└── types/            # Shared TypeScript types and interfaces (index.ts)
## Getting Started

### Prerequisites

* Node.js (v18 or later recommended)
* npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

1.  Start the Next.js development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) (or your specified port) in your browser.

## Mock API & Data

* During development, the application uses mock API endpoints defined in `src/app/api/`.
* These endpoints read directly from the static JSON files located in the `src/data/` directory.
* The structure of this data should conform to the TypeScript interfaces defined in `src/types/index.ts`.
* Initially, pages like the Home page may load data directly via JSON imports for simplicity in Server Components.

## Theming

* The application uses MUI with a custom theme defined in `src/providers/CustomThemeProvider.tsx` and `src/theme/palette.ts`.
* Light and Dark modes are supported and can be toggled using the button in the AppBar.
* The user's preference is saved in `localStorage`.

## Layout

* The primary application structure is provided by `src/components/layout/MainLayout.tsx`.
* This includes a permanent Drawer on the left (collapsible via buttons) and a fixed AppBar at the top.
* Page content is rendered within the main content area managed by this layout component.

## Next Steps / Future Enhancements

* Integrate with the actual backend API (Spring Boot) once available, replacing mock API calls/direct imports.
* Implement robust data fetching using libraries like React Query (TanStack Query) or SWR.
* Refine state management strategy (e.g., using Zustand or Redux Toolkit) as application complexity grows.
* Implement user authentication and Role-Based Access Control (RBAC).
* Develop feature modules (Course Discovery, Video Player, User Profiles, Admin Dashboard, etc.).
* Add comprehensive testing (unit, integration, end-to-end).
* Set up CI/CD pipelines.

