Stashdeck

Stashdeck is a modern bookmark and personal knowledge management platform designed for people who save links frequently and need a reliable way to organize and retrieve them.

It is built as a production-grade full-stack system, with a strong focus on architecture, clarity, and long-term maintainability.

Overview

Stashdeck provides a structured environment for managing bookmarks beyond basic browser storage.

Users can:

Save links with metadata

Organize bookmarks into collections

Add tags and notes

Search across saved content efficiently

The product is intentionally focused, predictable, and extensible.

Core Features
Authentication

Secure email and password authentication

Token-based session handling

Bookmark Management

Save and manage URLs

Metadata support (title, description)

Optional personal notes

Organization

Collections for grouping bookmarks

Flexible tag-based categorization

Search

Search by title, URL, tags, and notes

Fast and consistent query behavior

Architecture

Stashdeck uses a monorepo architecture to support multiple applications and shared tooling.

Repository Structure
stashdeck/
├─ apps/
│  ├─ web/        # Next.js web application
│  └─ api/        # Backend API
│
├─ packages/
│  ├─ types/              # Shared TypeScript types
│  ├─ eslint-config/      # Shared ESLint rules
│  ├─ typescript-config/  # Shared TS configs
│  └─ ui/                 # Shared UI components
│
├─ turbo.json
├─ package.json
└─ README.md

Technology Stack
Frontend

Next.js (App Router)

TypeScript

Backend

Node.js

TypeScript

Express

Tooling

Turborepo

Bun (package manager & runtime)

Infrastructure (planned)

PostgreSQL

Redis

Docker

Development Workflow

The project follows phase-based execution:

Foundation & tooling

Backend domain design

Web integration

Hardening & production readiness

Optional expansion

Each phase is completed fully before progressing.

Running the Project

From the repository root:

bun install
bun run dev


All applications are orchestrated using Turborepo.

Project Status

Monorepo foundation: ✅ Complete

Web application setup: ✅ Complete

Backend implementation: ⏳ In progress

Purpose

Stashdeck is built to demonstrate:

Real-world system design

Monorepo workflows

Clear separation of concerns

Production-oriented engineering practices

The goal is a codebase that is easy to navigate, easy to reason about, and easy to extend.