# Onboarding Wizard Backend

This project is the backend service for the onboarding wizard application. It provides APIs for managing user data, configurations, and the onboarding process.

---

## Features

- **User Authentication**: Login and registration with encrypted passwords.
- **Onboarding Steps**: Tracks and updates users' onboarding progress.
- **Dynamic Configurations**: Supports dynamic step configurations via API.
- **Supabase Integration**: Utilizes Supabase for database management.
- **RESTful API**: Exposes endpoints for frontend interaction.
- **Error Handling**: Provides structured error responses.

---

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Framework for building REST APIs.
- **Supabase**: Database as a service (PostgreSQL).
- **bcryptjs**: For password hashing.
- **dotenv**: Environment variable management.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: v16 or higher
- **npm**: Node package manager
- **Supabase**: Set up a Supabase project for the database.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/mohit1508/custom-onboarding-flow-backend
cd custom-onboarding-flow-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a .env file in the root directory and add the following variables:
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
SERVER_PORT=3000

### 4. Run the Development Server
```bash
npm run dev
```