## Application Architecture

The application follows a layered structure:

Client (React UI)
↓
Next.js Server Layer
↓
Prisma ORM
↓
PostgreSQL Database

## Project Structure

src/
├─ app/ → Next.js routes
├─ components/ → reusable UI components
├─ lib/ → utilities and helpers
├─ prisma/ → database schema
└─ tests/ → automated tests

## Data Model

The core entities of the system are:

Sessions
└─ Notes

## Technical Decisions

Next.js was chosen for fullstack capabilities and simple deployment.

Prisma is used as ORM to simplify database access and migrations.

PostgreSQL was chosen for reliability and relational data modeling.
