# Manu-Tech UniPod website

## Contact messages with Neon

1. Copy `.env.example` to `.env`.
2. Add the two connection strings from your Neon project:
   - `DATABASE_URL`: the pooled (`-pooler`) URL used by the contact API.
   - `DATABASE_URL_UNPOOLED`: the direct URL used only by Drizzle migrations.
3. Apply the versioned schema migration:

   ```bash
   npm run db:migrate
   ```

4. Start the frontend and contact API together:

   ```bash
   npm run dev
   ```

Open the Vite URL and visit `/contact`. The form posts to `/api/contact`, and its messages are stored in the `contact_messages` table.

For a deployed frontend and API on different domains, set `VITE_CONTACT_API_URL` to the API’s public origin and set `CONTACT_APP_ORIGIN` to the frontend origin.
