# Portfolio Email Server Backend

A lightweight Express + TypeScript microservice to securely process developer portfolio contact forms and send emails using the Resend API.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [Resend](https://resend.com/) Account (to get a mail API key)

## Setup Instructions

1. **Install Dependencies**
   Navigate to this directory and run:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and configure the settings.

3. **Get a Resend API Key**
   To send emails over HTTPS without SMTP port restrictions:
   - Create a free account at [Resend](https://resend.com/).
   - Navigate to the **API Keys** tab in the sidebar.
   - Click **Create API Key**, give it a name (e.g. `Portfolio Contact`), select the *Sending access* role, and click **Add**.
   - Copy the generated API key (e.g., `re_abc123...`).
   - Paste it as `RESEND_API_KEY` in your `.env` file.

## Run Server Locally

- **Development Mode** (with ts-node-dev hot reload):
  ```bash
  npm run dev
  ```
  The server starts at `http://localhost:5000`. Verify health status at `http://localhost:5000/api/health`.

- **Production Build**:
  ```bash
  npm run build
  npm start
  ```
