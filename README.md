# PrivacyGuard - Privacy Education Platform

A comprehensive privacy education and protection platform that empowers users to understand, assess, and enhance their digital privacy through interactive tools, secure deployment tracking, and advanced security recommendations.

## 🚀 Features

- **Interactive Privacy Education**: Structured courses on privacy fundamentals, Tor networking, and OpSec best practices
- **Privacy Assessment Tool**: Comprehensive questionnaire with personalized recommendations
- **Secure Web Proxy**: Safe browsing interface with configurable security settings
- **Privacy Tools Directory**: Curated collection of essential privacy tools and setup guides
- **Community Forum**: Authentication-gated discussions for privacy enthusiasts
- **3D Visualizations**: Immersive Three.js animations with cybersecurity theme

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with cybersecurity theme
- **Radix UI** components with shadcn/ui
- **Wouter** for lightweight routing
- **TanStack Query** for state management
- **Three.js** for 3D visualizations
- **Vite** for development and build

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Neon serverless
- **Drizzle ORM** for type-safe database operations
- **Replit Auth** for user authentication
- **Connect-pg-simple** for session management

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Replit account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jasonclarkagain/privacyguard.git
cd privacyguard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption secret
- `REPL_ID`: Replit application ID
- `REPLIT_DOMAINS`: Comma-separated domains for auth

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5000` to access the platform.

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── replitAuth.ts      # Authentication setup
├── shared/                 # Shared TypeScript schemas
└── components.json         # shadcn/ui configuration
```

## 🔐 Authentication

The platform uses Replit Auth for secure user authentication with PostgreSQL session storage. Users can access protected features like the community forum after logging in.

## 🎨 Design

Features a cybersecurity-themed interface with:
- Dark mode with matrix green accents
- Animated particle backgrounds
- 3D floating logos and visualizations
- Terminal-style UI elements
- Responsive design for all devices

## 🚀 Featured Tools

The platform prominently features two essential privacy tools:

1. **PGP Encryption Tool** - Advanced encryption and decryption for secure communications
2. **AnonFiles** - Anonymous file sharing with automatic deletion

## 📊 Database Schema

- **Users**: Authentication and profile data
- **Courses**: Educational content and modules
- **Privacy Tools**: Tool directory with ratings and guides
- **Assessments**: User privacy evaluations
- **Progress**: Learning progress tracking
- **Sessions**: Secure session management

## 🌐 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Database Migration
```bash
npm run db:push
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Jason Clark - [@jasonclarkagain](https://twitter.com/jasonclarkagain) - jasonclarkagain@gmail.com

Project Link: [https://github.com/jasonclarkagain/privacyguard](https://github.com/jasonclarkagain/privacyguard)

## 🙏 Acknowledgments

- [Replit](https://replit.com) for hosting and authentication
- [Neon](https://neon.tech) for PostgreSQL database
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [Three.js](https://threejs.org) for 3D visualizations