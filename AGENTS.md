# YNews Project Memory

## Project Overview
**YNews** is a modern web application built with TypeScript, featuring authentication and news functionality. The project uses a server-side architecture with Hono framework and SQLite database.

## Technology Stack

### Core Technologies
- **Runtime**: Bun (JavaScript runtime and package manager)
- **Language**: TypeScript
- **Framework**: Hono (lightweight web framework)
- **Database**: SQLite with LibSQL client
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth
- **Environment Management**: T3 Env with Zod validation

### Development Tools
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier with import sorting
- **Database Management**: Drizzle Kit
- **Containerization**: Docker Compose (PostgreSQL setup)

## Project Structure

```
ynews/
├── server/                 # Backend application
│   ├── api/               # API routes
│   │   ├── root.ts        # Main API router
│   │   └── routers/       # Route modules
│   │       └── auth.ts    # Authentication routes
│   ├── auth.ts            # Better Auth configuration
│   ├── adapter.ts         # Database adapter (LibSQL)
│   ├── db/                # Database layer
│   │   └── schema/        # Database schemas
│   │       ├── auth-schema.ts  # User, session, account, verification tables
│   │       └── post.ts         # Post schema (currently empty)
│   ├── index.ts           # Main server entry point
│   ├── types.d.ts         # TypeScript declarations
│   └── eslint.config.mts  # ESLint configuration
├── shared/                # Shared types and utilities
│   └── type.ts           # Common response types
├── drizzle/              # Database migrations (generated)
├── sqlite.db            # SQLite database file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── drizzle.config.ts    # Drizzle Kit configuration
├── env.ts              # Environment variables validation
├── docker-compose.yml   # PostgreSQL container setup
├── prettier.config.js   # Code formatting rules
├── index.http          # HTTP test requests
└── README.md           # Project documentation
```

## Key Features

### Authentication System
- **Provider**: Better Auth with email/password authentication
- **Database Tables**:
  - `user`: User profiles with email verification
  - `session`: User sessions with IP tracking
  - `account`: OAuth account linking
  - `verification`: Email verification tokens
- **Security**: Trusted origins configuration for CORS

### API Architecture
- **Framework**: Hono with TypeScript support
- **Routing**: Modular route structure (`/api/*`)
- **Error Handling**: Centralized error handling with custom error responses
- **Type Safety**: Full TypeScript integration with shared types

### Database Schema
- **Provider**: SQLite with LibSQL client
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Backup**: PostgreSQL setup available via Docker Compose

## Environment Configuration

### Required Environment Variables
```bash
# Database
DATABASE_URL=sqlite:./sqlite.db

# Authentication
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000

# Frontend
PUBLIC_FRONTEND_URL=http://localhost:3000
```

## Development Workflow

### Available Scripts
```bash
# Development
bun run dev              # Start development server with hot reload

# Database Management
bun run db:push          # Push schema changes to database
bun run db:generate      # Generate migration files
bun run db:migrate       # Run database migrations
bun run db:studio        # Open Drizzle Studio (database GUI)

# Code Quality
bun run format:write     # Format code with Prettier
bun run format:check     # Check code formatting
```

### Development Server
- **URL**: http://localhost:3000
- **Hot Reload**: Enabled with Bun's `--hot` flag
- **API Endpoints**: Available under `/api/*`

## Database Schema Details

### User Table
- `id`: Primary key (text)
- `name`: User's display name
- `email`: Unique email address
- `emailVerified`: Boolean verification status
- `image`: Optional profile image URL
- `createdAt`/`updatedAt`: Timestamps

### Session Table
- `id`: Primary key (text)
- `expiresAt`: Session expiration timestamp
- `token`: Unique session token
- `ipAddress`: Client IP address
- `userAgent`: Client user agent
- `userId`: Foreign key to user table

### Account Table
- OAuth provider integration fields
- Token management for external services
- Provider-specific account linking

### Verification Table
- Email verification token management
- Password reset functionality
- Token expiration handling

## Code Quality Standards

### TypeScript Configuration
- **Strict Mode**: Enabled with comprehensive type checking
- **Path Mapping**: `@/` aliases for server code, `@/shared/` for shared utilities
- **Modern Features**: ESNext target with latest language features

### Linting & Formatting
- **ESLint**: TypeScript-aware linting with Drizzle plugin
- **Prettier**: Import sorting and consistent formatting
- **Import Organization**: Structured import order (React → Hono → Drizzle → Third-party → Local)

## Deployment Considerations

### Database Options
1. **SQLite**: Default for development (file-based)
2. **PostgreSQL**: Production option via Docker Compose
3. **LibSQL**: Cloud-hosted SQLite alternative

### Environment Setup
- Environment variables validated with Zod schemas
- Separate client/server environment variable handling
- Production error message sanitization

## Current Status
- ✅ Authentication system implemented
- ✅ Database schema defined
- ✅ API structure established
- ✅ Development environment configured
- ⚠️ Post schema empty (news functionality pending)
- ⚠️ Frontend application not present

## Next Development Priorities
1. Implement post/news schema and API endpoints
2. Add frontend application (React/Next.js recommended)
3. Implement news fetching and management features
4. Add user profile management
5. Implement news categorization and search
6. Add real-time updates for news feeds

## Security Considerations
- Better Auth provides secure session management
- Environment variables properly validated
- CORS configured with trusted origins
- SQL injection protection via Drizzle ORM
- Error messages sanitized in production

## Performance Optimizations
- Bun runtime for fast startup and execution
- SQLite for lightweight database operations
- Hono framework for minimal overhead
- Hot reload for efficient development workflow