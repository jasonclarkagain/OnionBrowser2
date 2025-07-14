# PrivacyGuard - Privacy Education Platform

## Overview

PrivacyGuard is a comprehensive privacy education platform that combines interactive learning with practical tools. The application provides privacy courses, security assessments, tool recommendations, and a secure web proxy - all designed to help users enhance their digital privacy knowledge and skills.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom cybersecurity theme (dark mode with matrix green accents)
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Data Layer**: Drizzle ORM with PostgreSQL (using Neon serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **Development**: Hot module replacement via Vite integration

### Key Components

#### Privacy Education System
- **Courses**: Structured learning modules with progress tracking
- **Content Types**: Privacy fundamentals, Tor networking, OpSec best practices
- **Progress Management**: User progress persistence and completion tracking
- **Difficulty Levels**: Beginner, intermediate, and advanced content

#### Privacy Assessment Engine
- **Question System**: Multi-choice assessments with scoring
- **Recommendations**: Personalized privacy improvement suggestions
- **Result Storage**: Assessment history and progress tracking
- **Categories**: Password security, authentication, browsing habits, data protection

#### Privacy Tools Directory
- **Tool Categories**: Browsers, VPNs, password managers, messaging apps, extensions, operating systems
- **Rating System**: 5-star rating with essential tool flagging
- **Setup Guides**: Step-by-step installation and configuration instructions
- **Feature Tracking**: Comprehensive feature lists for tool comparison

#### Secure Web Proxy
- **Proxy Service**: Server-side web proxy with configurable security settings
- **Request Filtering**: JavaScript, cookies, and image loading controls
- **URL Validation**: Security checks for safe browsing
- **Analytics**: Request logging and performance statistics

## Data Flow

1. **Course Management**: Courses → User Progress → Completion Tracking
2. **Assessment Flow**: Questions → User Responses → Scoring → Recommendations
3. **Tool Discovery**: Categories → Tool Listings → Setup Guides → External Downloads
4. **Proxy Requests**: URL Input → Validation → Proxy Processing → Content Delivery
5. **Contact System**: Form Submission → Message Storage → Admin Notification

## External Dependencies

### Database & Storage
- **Neon PostgreSQL**: Serverless PostgreSQL for production data storage
- **Drizzle ORM**: Type-safe database queries and migrations
- **Memory Storage**: Development fallback with in-memory data persistence

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Consistent icon library
- **Custom Theme**: Cybersecurity-focused design with matrix green highlights

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Development server with HMR and build optimization
- **ESBuild**: Fast TypeScript compilation for production
- **PostCSS**: CSS processing with Tailwind integration

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Assets**: Client build serves from Express static middleware

### Environment Configuration
- **Development**: Vite dev server with Express API proxy
- **Production**: Express serves both API and static frontend
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Scripts
- `npm run dev`: Development with hot reloading
- `npm run build`: Production build (frontend + backend)
- `npm run start`: Production server
- `npm run db:push`: Database schema deployment

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with shared TypeScript schemas between frontend and backend for type safety
2. **Vite Integration**: Custom Vite setup allows SSR-like development experience while maintaining SPA deployment
3. **Drizzle ORM**: Chosen for type-safe database operations and PostgreSQL compatibility
4. **Memory Storage Fallback**: Development-friendly storage layer that can be easily swapped for database storage
5. **Component-Based Architecture**: Modular UI components for reusability and maintainability
6. **Theme System**: Custom cybersecurity aesthetic with CSS variables for consistent branding

## Recent Updates (December 2024)

### Database Integration (Latest)
- **PostgreSQL Database**: Migrated from memory storage to PostgreSQL database with persistent data
- **Database Schema**: Complete table structure for users, courses, assessments, tools, proxy logs, and contact messages
- **Drizzle ORM**: Full implementation with type-safe database operations and query building
- **Auto-Seeding**: Database automatically populates with default courses and privacy tools on startup
- **Data Persistence**: All user interactions, assessments, and progress now permanently stored

### Navigation & Link Fixes
- Fixed nested anchor tag warnings by replacing `<a>` tags with `<span>` elements inside Link components
- Made all navigation links functional across the application
- Added Privacy Policy page accessible from footer links
- Connected all home page feature cards to their respective pages

### Privacy Tools Updates
- Added PGP Encryption Tool and AnonFiles as the first two recommended tools
- Updated tool categories to include "encryption" and "file-sharing"
- Enhanced tool descriptions with detailed features and setup guides
- All download links now functional with external URL opening

### Three.js Visual Enhancements (Latest)
- **Matrix Background**: Animated particle system with floating geometric shapes and matrix rain effect
- **3D Logo**: Floating shield logo with orbiting rings in the navbar for dynamic branding
- **Data Visualization**: Interactive 3D bar charts for privacy assessment score breakdown
- **Network Visualization**: Real-time 3D network topology showing proxy routing paths
- **Particle Field**: Connected particle system for immersive background effects
- **Performance Optimized**: Efficient rendering with requestAnimationFrame and proper cleanup

### Complete Feature Set
- ✓ PostgreSQL database with persistent storage
- ✓ Fully functional navigation system
- ✓ Interactive privacy assessment with scoring
- ✓ Comprehensive privacy tools catalog
- ✓ Secure web proxy interface (excludes .onion sites)
- ✓ Educational course system with progress tracking
- ✓ Contact form and community features
- ✓ Privacy policy and legal compliance pages
- ✓ Responsive cybersecurity-themed design
- ✓ All internal links working correctly
- ✓ Immersive Three.js 3D visualizations and animations