# Portfolio Email Server Backend

A lightweight Express + TypeScript microservice to securely process developer portfolio contact forms and send emails using Gmail App Passwords and Nodemailer.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A Google Account (to configure Gmail App Passwords)

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

3. **Get a Gmail App Password**
   To send emails using Gmail, you cannot use your regular account password due to security blocks. Instead:
   - Go to your [Google Account Console](https://myaccount.google.com/).
   - Go to **Security** on the left menu.
   - Under *How you sign in to Google*, ensure **2-Step Verification** is turned **ON**.
   - Search for **App passwords** or go directly to the App passwords setting.
   - Enter a name (e.g. `Developer Portfolio Website`) and click **Create**.
   - Copy the generated 16-character password (e.g., `abcd efgh ijkl mnop`).
   - Paste this 16-character string (without spaces) as `GMAIL_APP_PASSWORD` in your `.env` file.
   - Set `GMAIL_USER` to your Gmail address.

## Run Server Locally

- **Development Mode** (with ts-node-dev hot reload):
  ```bash
  npm run dev
  ```
  The server starts at `http://localhost:5000`. Verify health status at `http://localhost:5000/api/health`.

- **Production Build**:
  ```bash
  npm run build
  npm run start
  ```
