# InterviewAce: persistent production deployment

The application is one full-stack Next.js service. The browser calls relative routes such as `/api/health`, `/api/auth`, and `/api/attempts`; it does not contain an E2B URL. E2B links are temporary development previews and cannot be made permanent. Deploy the repository to a persistent Next.js host and connect a persistent PostgreSQL database.

## Recommended production setup

- Application/API: Vercel (or Railway/Render with Node.js)
- Database: Neon PostgreSQL, Supabase PostgreSQL, Railway PostgreSQL, or another persistent PostgreSQL service
- Required environment variable: `DATABASE_URL`

## Local setup

1. Install Node.js 20 or newer and PostgreSQL.
2. Create a database named `interviewace`.
3. Copy `.env.example` to `.env.local`.
4. Set `DATABASE_URL` to the database connection string.
5. Run `npm install`.
6. Apply the database schema: `npx drizzle-kit push`.
7. Start development: `npm run dev`.
8. Open `http://localhost:3000`.
9. Check `http://localhost:3000/api/health`. It should report `ok: true` and `database: connected`.

## Deploy with Vercel + Neon

1. Push this project to a GitHub repository.
2. Create a Neon project and copy its pooled PostgreSQL connection string.
3. In Vercel, import the GitHub repository as a Next.js project.
4. In Project Settings > Environment Variables, add `DATABASE_URL` for Production, Preview, and Development. Add `DB_POOL_MAX=5`.
5. From a trusted local terminal, set the same production `DATABASE_URL` and run `npx drizzle-kit push` once. This creates users, assessments, interviews, resumes, bookmarks, and agent history in the persistent database.
6. Deploy or redeploy the Vercel project.
7. Verify `https://YOUR-DOMAIN.vercel.app/api/health`.
8. Use the Vercel URL or attach a custom domain. That URL replaces all temporary `*.e2b.app` links.

Never commit `.env.local` or a production database password. Rotate a connection string immediately if it is exposed.

## Deploy with Railway

1. Create a Railway project and add PostgreSQL.
2. Add this repository as a service.
3. Set `DATABASE_URL` to Railway's PostgreSQL URL and `DB_POOL_MAX=10`.
4. Use `npm run build` as the build command and `npm run start` as the service start command.
5. Run `npx drizzle-kit push` in a Railway one-off shell or from a trusted local terminal using the Railway URL.
6. Generate a public domain and verify `/api/health`.

## API verification

Health:

`curl -i https://YOUR-DOMAIN/api/health`

Create an account:

`curl -i -X POST https://YOUR-DOMAIN/api/auth -H "Content-Type: application/json" -d '{"action":"signup","name":"Test Student","email":"student@example.com","password":"strongpass123"}'`

Login:

`curl -i -X POST https://YOUR-DOMAIN/api/auth -H "Content-Type: application/json" -d '{"action":"login","email":"student@example.com","password":"strongpass123"}'`

Read saved progress (replace the ID):

`curl -i "https://YOUR-DOMAIN/api/attempts?userId=1"`

## Persistence behavior

- Registered account passwords are stored as bcrypt hashes.
- Registered users' assessment attempts, interview sessions, SWOC reports, bookmarks, resumes, and Ace AI history are stored in PostgreSQL.
- Guest sessions are scored normally but deliberately are not persisted. The UI continues to work in guest mode and prompts users to register for saved history.
- The health endpoint performs a real database query and returns HTTP 503 with a safe diagnostic when PostgreSQL is unavailable.

## Troubleshooting

- `DATABASE_URL is required`: add the variable in the deployment host and redeploy.
- Health returns 503: verify credentials, IP/network rules, TLS settings, and run `npx drizzle-kit push`.
- Account exists after a redeploy: expected; this confirms persistence.
- An `e2b.app` link returns 403: the temporary sandbox expired. Use the deployed Vercel/Railway/custom-domain URL instead.
- Too many PostgreSQL connections: use the provider's pooled URL and keep `DB_POOL_MAX` at 5 for Vercel.
