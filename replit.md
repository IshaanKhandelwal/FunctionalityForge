# CreativeFlow - Creative Agency Automation Platform

## Overview

CreativeFlow is an all-in-one SaaS platform designed to automate and streamline creative agency workflows. The application provides five core modules: Project Management, Asset Management, Marketing Campaign Automation, Client Communications, and Resource Tracking. Built as a full-stack TypeScript application, it combines a React frontend with an Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing (chosen over React Router for minimal bundle size)
- Vite as the build tool and development server for fast HMR and optimized production builds

**UI Component System**
- shadcn/ui component library built on Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with a custom design system
- Design philosophy balances professional SaaS aesthetics with creative agency flair
- Custom CSS variables system for theme management (light/dark mode support via CSS classes)
- Component structure follows "New York" style variant from shadcn/ui

**State Management**
- TanStack Query (React Query) for server state management and caching
- Custom query client with configured defaults (no automatic refetching, infinite stale time)
- Local component state via React hooks for UI-only state

**Form Handling**
- React Hook Form for performant form state management
- Zod schemas for runtime validation (shared between frontend and backend)
- @hookform/resolvers for integrating Zod with React Hook Form

**Design System**
- Typography: System font stack for native performance
- Spacing: Tailwind unit system (2, 4, 6, 8, 12, 16, 20, 24, 32)
- Color system: HSL-based with semantic color tokens defined in CSS variables
- Border radius: Custom scale (lg: 9px, md: 6px, sm: 3px)
- Interactive states: Custom hover/active elevation system using opacity overlays

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the entire backend
- Custom middleware for request logging with response capture

**API Design**
- RESTful API structure with resource-based endpoints
- JSON request/response format
- Error handling with appropriate HTTP status codes
- Request validation using Zod schemas (shared with frontend via `@shared` directory)

**Code Organization**
- Monorepo structure with `client/`, `server/`, and `shared/` directories
- Shared schema definitions in `shared/schema.ts` used by both client and server
- Path aliases configured (`@/` for client, `@shared/` for shared code)

**Development/Production Split**
- Development: Vite dev server proxied through Express for HMR
- Production: Express serves pre-built static files from `dist/public`
- esbuild bundles server code for production deployment

### Data Layer

**Database**
- PostgreSQL as the primary database (via Neon serverless driver)
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with TypeScript types inferred from Drizzle schemas

**Schema Design**
- Core entities: Users, Projects, Assets, Campaigns, Messages, FeedbackItems, TeamMembers, ProjectProfitability
- UUID primary keys generated via `gen_random_uuid()`
- Timestamp fields for created_at tracking
- Text/varchar fields for flexible content storage
- Integer and decimal fields for numeric data (progress, utilization, financial metrics)

**Data Access Pattern**
- Storage abstraction layer (`server/storage.ts`) defining interface for all data operations
- In-memory implementation for development/testing
- CRUD operations for all major entities
- Async/await patterns throughout

**Migrations**
- Drizzle Kit for schema migrations
- Migration files stored in `./migrations` directory
- Push-based deployment via `npm run db:push`

### Authentication & Authorization

**Current State**
- User schema defined with username/password fields
- No authentication middleware currently implemented
- Session management prepared via `connect-pg-simple` dependency

**Planned Architecture**
- Session-based authentication (express-session + PostgreSQL store)
- Password hashing (bcrypt or similar, dependency already included)
- Protected routes with authentication middleware

### External Dependencies

**UI & Styling**
- @radix-ui/* (v1.x): Headless UI primitives for accessible components
- tailwindcss (latest): Utility-first CSS framework
- class-variance-authority: Type-safe component variant management
- lucide-react: Icon library
- embla-carousel-react: Carousel/slider functionality

**Data & State Management**
- @tanstack/react-query (v5): Server state management
- react-hook-form (v7): Form state and validation
- zod (latest): Schema validation library
- drizzle-orm (v0.39): TypeScript ORM
- drizzle-zod: Zod schema generation from Drizzle schemas

**Database**
- @neondatabase/serverless (v0.10): PostgreSQL serverless driver
- connect-pg-simple (v10): PostgreSQL session store

**Build & Development**
- vite (latest): Frontend build tool
- esbuild: Server code bundling
- tsx: TypeScript execution for development
- typescript (v5): Type system

**Utilities**
- date-fns (v3): Date manipulation
- clsx & tailwind-merge: Utility for conditional className merging
- nanoid: Unique ID generation

### Build & Deployment

**Development**
- `npm run dev`: Starts Express server with Vite dev middleware
- Hot module replacement for frontend changes
- Automatic server restart via tsx watch mode

**Production Build**
- `npm run build`: 
  - Vite builds client to `dist/public`
  - esbuild bundles server to `dist/index.js`
- `npm start`: Runs production server from bundled code

**Environment Variables**
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment flag (development/production)

### Testing Strategy

**Current State**
- No test framework currently configured
- TypeScript provides compile-time type checking

**Testing Hooks**
- Test IDs added to key interactive elements (data-testid attributes)
- Prepared for E2E testing with Playwright or Cypress