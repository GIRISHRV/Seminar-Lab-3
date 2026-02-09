# Digital Identity Builder

Seminar Template :)

## Features
- Checks for existing profile in Supabase
- Glassmorphism onboarding form and profile card
- Compact UI with gradients and icons
- Reset Profile button for testing

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- @supabase/supabase-js

## Setup
1. Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key.
2. Run `npm install` if dependencies are missing.
3. Run `npm run dev` to start the app.

## Database
See `schema.sql` for the profiles table and RLS policy. Demo policies allow anyone to insert/delete for testing.

## Testing
- Use the Reset Profile button to test form flow.
- All features and UI verified.

---

