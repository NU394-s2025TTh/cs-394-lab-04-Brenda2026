[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/sHeDF2OL)
# Collaborative Note-Taking Application Lab

This repository contains the starter code for a lab assignment focused on building a collaborative note-taking application using React, TypeScript, and Firebase.

## Prerequisites

- Node.js (version 20 or later)
- npm (version 10.x or higher, comes with Node.js 20)
- Firebase project configured for the emulator

## Installation

```bash
npm install
```

## Lab Instructions

Please refer to [lab-assignment.md](lab-assignment.md) for detailed instructions on how to complete the lab assignment. This document outlines the learning objectives, requirements, and grading criteria. It also provides detailed information about the 'todos' you need to implement in the codebase and tests you need to pass.

## Firebase Setup

Make sure to set up the Firebase emulator following the instructions in the [Northwestern CS 394 Guide on Firebase](https://courses.cs.northwestern.edu/394/guides/firebase-notes.php#data-binding). Also, ensure you have configured the environment variables in the `.env` file with your Firebase project credentials.

## Running the Application

```bash
firebase emulators:start
```

```bash
npm run dev
```

## Testing

```bash
npm test
```

## Make sure both build and test pass for the lab assignment.

```bash
npm run grade
```

## File Structure

Here's a list of the key files in the repository:

**Root Files:**

The only file you need to change in the root directory is the `.env.local` file. The rest of the files are configuration files and should not be changed.

- `README.md`: This file, providing an overview of the project.
- `lab-assignment.md`: Detailed instructions for the lab assignment.
- `vite.config.ts`: Configuration file for Vite.
- `tsconfig.json`: TypeScript configuration file.
- `tsconfig.node.json`: TypeScript configuration file for Node.js.
- `package.json`: npm package file.
- `firebase.json`: Firebase configuration file.
- `firestore.rules`: Firestore security rules.
- `firestore.indexes.json`: Firestore indexes configuration.
- `.firebaserc`: Firebase project configuration.
- `.prettierrc.cjs`: Prettier configuration file.
- `eslint.config.cjs`: ESLint configuration file.
- `.gitignore`: Specifies intentionally untracked files that Git should ignore.
- `.prettierignore`: Specifies files that Prettier should ignore.
- `student-guide.md`: Student guide for Firebase and triple binding.
- `.env.local`: Environment variables for Firebase configuration **(should be filled with your Firebase project credentials)**.
- **Source Files (src/):**

- `main.tsx`: Main application entry point. **no need to change**
- `App.tsx`: Main application component. **no need to change**
- `App.css`: Styles for the main application component. **no need to change**
- `firebase-config.ts`: Firebase configuration and initialization. **no need to change**
- `index.css`: Global styles. **no need to change**
- `vite-env.d.ts`: TypeScript environment declarations for Vite. **no need to change**
- `components/`: Directory containing React components. **(you will need to change these files)**
  - `NoteEditor.tsx`: Component for creating and editing notes.
  - `NoteList.tsx`: Component for displaying a list of notes.
  - `NoteItem.tsx`: Component for displaying an individual note.
- `services/`: Directory containing service functions. **(you will need to change these files)**
  - `noteService.ts`: Service for interacting with Firebase.
- `types/`: Directory containing TypeScript types. **no need to change**

  - `Note.ts`: TypeScript type definition for a note. **no need to change**

  # Creating .env.local file

  Put the following in a .env.local file in the root of the project:

  ```
  VITE_FIREBASE_API_KEY=your_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_APP_ID=your_app_id
  ```

  Replace the values with your Firebase project credentials. You can find these in your Firebase console under Project Settings > General > Your apps. on the [Firebase console](https://console.firebase.google.com/). This file is ignored and not checked into version control, so you can safely store your credentials here.

## Available Scripts

Below is a list of available npm scripts and their descriptions:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application using TypeScript and Vite.
- `npm run serve`: Previews the built application.
- `npm run test`: Runs tests using Vitest with the UI enabled.
- `npm run test:no-ui`: Runs tests using Vitest without the UI.
- `npm run grade`: Builds the application and runs tests without the UI, used for grading.
- `npm run lint:fix`: Automatically fixes linting issues in the `src` directory.
- `npm run lint:format`: Formats code in the project.
- `npm run lint`: Runs both formatting and linting fixes.
- `npm run start-emulators`: Starts the Firebase emulators.
- `npm run type-check`: Runs TypeScript type checking.
- `npm run prepare`: Sets up Husky for Git hooks.
- `npm run kill-emulators`: Kills processes running on ports 5000, 8080, 9099, and 5001: use if you need to restart the emulator.

## Linting and es-lint-disable-next-line

Often, the exercise file will give you a function definition without an implementation; usually this is a hint and structured in a way the tests expect. To keep it so the file can be used and linted before you implement; i disabled the linter for that line. You can do this by adding the following comment above the function definition. so you will see

```javascript
// eslint-disable-next-line <some rule>>
functionName() {
  // function implementation
}
```

This will allow you to keep the linter happy while you implement the function. You can also use this to disable the linter for a specific line of code, but be careful with this as it can lead to code that is not linted properly. you can remove these as you implement.
