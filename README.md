# SOLVE CEO Dashboard

A production-ready Next.js 14 application with Supabase integration, featuring email-only authentication and protected routes.

## Features

- **Next.js 14 App Router**: Modern React framework with server and client components
- **Supabase Authentication**: Email-based login and user management
- **Protected Routes**: Middleware-based route protection with authentication checks
- **Database Integration**: Supabase Postgres with real-time capabilities
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **TypeScript**: Full type safety across the application

## Project Structure

```
solve-ceo-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage with health_check fetch
│   ├── globals.css              # Global styles
│   ├── login/
│   │   └── page.tsx             # Email login page
│   ├── dashboard/
│   │   └── page.tsx             # Protected dashboard page
│   └── auth/
│       └── callback/
│           └── route.ts         # OAuth callback handler
├── lib/
│   ├── supabase.ts              # Server-side Supabase client
│   └── supabase-client.ts       # Client-side Supabase client
├── types/
│   └── database.ts              # Database type definitions
├── middleware.ts                # Route protection middleware
├── supabase/
│   └── migrations/
│       └── create_health_check_table.sql  # Database schema
└── package.json                 # Dependencies

```

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ and pnpm
- Supabase account and project

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project:
- Go to **Project Settings > API**
- Copy the **Project URL** and **anon public** key

### 3. Create the health_check Table

In your Supabase dashboard:

1. Go to **SQL Editor**
2. Create a new query
3. Copy and paste the contents of `supabase/migrations/create_health_check_table.sql`
4. Click **Run**

Or use the SQL directly:

```sql
CREATE TABLE IF NOT EXISTS public.health_check (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(50) NOT NULL DEFAULT 'ok',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS health_check_created_at_idx ON public.health_check(created_at DESC);

ALTER TABLE public.health_check ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.health_check
  FOR SELECT
  USING (true);
```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### Homepage (`/`)
- Displays "SOLVE CEO Dashboard" title
- Shows database connection status
- Fetches and displays health_check records
- Features overview cards

### Login (`/login`)
- Email-based authentication
- Sign in and sign up functionality
- Redirects to dashboard on successful login

### Dashboard (`/dashboard`)
- Protected route (requires authentication)
- Displays logged-in user information
- Logout functionality
- Middleware redirects unauthenticated users to login

## Authentication Flow

1. User visits `/login`
2. Enters email and password
3. Supabase authenticates the user
4. Session is stored in browser cookies
5. Middleware checks authentication on protected routes
6. Unauthenticated users are redirected to `/login`

## Database Schema

### health_check Table

```sql
- id: UUID (primary key)
- status: VARCHAR(50) - Connection status
- created_at: TIMESTAMP - Record creation time
- updated_at: TIMESTAMP - Last update time
```

## Building for Production

```bash
pnpm build
pnpm start
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Other Platforms

The application is configured to build cleanly for any Node.js hosting platform:

```bash
npm run build
npm start
```

## Testing

Run tests with:

```bash
pnpm test
```

## Security Considerations

- Environment variables are prefixed with `NEXT_PUBLIC_` only for public Supabase keys
- Sensitive operations should use server-side code
- Row Level Security (RLS) is enabled on the health_check table
- Middleware protects routes from unauthorized access

## Troubleshooting

### "health_check table not found"
- Create the table in Supabase using the SQL migration script
- Ensure Row Level Security policies are configured

### Authentication not working
- Verify Supabase credentials in `.env.local`
- Check that the Supabase project is active
- Clear browser cookies and try again

### Build errors
- Ensure all environment variables are set
- Run `pnpm install` to update dependencies
- Check Node.js version (18+ required)

## License

MIT
