# Task Manager App

## Overview

The **Task Manager App** is a React-based application designed to help users manage their tasks efficiently. It allows users to create, filter, and search tasks, as well as prioritize them based on importance. The app is built with modern tools and libraries, ensuring a smooth and responsive user experience.

Checkout the app hosted on Netlify here: https://taskmanager-monterosa.netlify.app/

---

## Features

- **Task Management**:
  - Add, edit, and delete tasks.
  - Assign priorities to tasks (Low, Medium, High).

- **Search Functionality**:
  - Quickly find tasks using the search bar.

- **Filtering**:
  - Filter tasks by priority (All, Low, Medium, High).

- **Task Ordering**:
  - Seamless task ordering with drag and drop functionality.

- **Responsive Design**:
  - Optimized for both desktop and mobile devices.

---

## Tech Stack

- **Frontend**:
  - React (with TypeScript)
  - TailwindCSS for styling
  - Radix UI for accessible components

- **State Management**:
  - Context API

- **Testing**:
  - Jest and React Testing Library for unit tests

- **Build Tool**:
  - Vite

---

## Folder Structure

```plaintext
src/
├── App.tsx                # Main app component
├── index.css              # Global styles
├── main.tsx               # App entry point
├── vite-env.d.ts          # Vite environment types
├── assets/                # Static assets
├── components/            # Reusable components
│   ├── Filter/            # Task filter component
│   ├── Search/            # Search bar component
│   ├── Tasks/             # Task-related components
│   ├── ui/                # UI primitives (button, input, etc.)
├── context/               # Context for state management
├── lib/                   # Utility functions
└── __tests__/             # Unit tests for components