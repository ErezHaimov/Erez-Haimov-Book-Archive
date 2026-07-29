# My Book Archive

This Book Archive project demonstrates a **production-minded frontend approach** to application development.
Beyond front-end design, it involves **API integration** to create, read, update, and delete personal book records, complex **state management** for CRUD operations, and a responsive, card-based catalog UI.
It highlights my ability to build a fully functional single-page application that bridges the gap between raw data and a responsive, user-centric interface.

## Useful navigation

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Getting Started](#getting-started)
- [Features](#features)
- [My process](#my-process)
  - [Technologies](#technologies)
  - [Ongoing Development](#ongoing-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

- **CRUD & Persistence:** Implement Create, Read, Update, and Delete functionality against a mock REST API, so changes are reflected both on the server and in the UI in real time.
- **API Integration:** Fetch the initial book catalog from an external mock REST API (MockAPI) and map it into the application's internal data structure.
- **Dynamic Catalog:** Display books as styled cards (image, title, author, action buttons) in a responsive grid.
- **Favorites System:** Toggle a book's "favorite" status with a heart icon, updating both the UI and the server via a PUT request.
- **Client-side Search:** Filter the catalog in real time by book title as the user types.
- **Responsive Grid Design:** Utilize CSS Grid for a structured, column-based layout that remains fluid across mobile and desktop devices.
- **Modal-based Forms:** Add and edit books through a modal form, without navigating away from the single-page catalog view.

### Screenshot

![Site Screenshot](pictures/Screenshots/site-screenshot-lightmode.png)
![Site Screenshot](pictures/Screenshots/site-screenshot-darkmode.png)

### Links

- Live Site URL: [https://ErezHaimov.github.io/Erez-Haimov-Book-Archive/](https://ErezHaimov.github.io/Erez-Haimov-Book-Archive/)
- Repository: [https://github.com/ErezHaimov/Erez-Haimov-Book-Archive](https://github.com/ErezHaimov/Erez-Haimov-Book-Archive)

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/ErezHaimov/Erez-Haimov-Book-Archive.git
cd Erez-Haimov-Book-Archive
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

> Note: The app expects a MockAPI resource named `books` with fields `title`, `author`, `description`, `coverImage`, and `isFavorite`. Update the `baseURL` in `src/services/api-service.ts` with your own MockAPI endpoint before running.

## Features

- Add, edit, and delete books from a personal catalog
- Mark/unmark books as favorites with a live-updating heart icon
- Real-time search/filter by book title
- Responsive card-based grid layout depending on screen size
- Initial catalog data fetched from an external REST API (MockAPI)
- Modal-based forms for creating and editing books
- Loading and error states for all API operations
- Dark/Light mode with persistence across sessions

## My process

### Technologies

- **React** – For building a component-based, single-page application.
- **TypeScript** – For type-safe data models (`BookRequest` / `BookResponse`) and safer API integration.
- **Vite** – As the build tool and development server.
- **Tailwind CSS** – For utility-first, responsive styling.
- **Flowbite React** – For pre-built, accessible UI components (Cards, Modals, Inputs, Spinners).
- **Axios** – For a centralized, configurable API service layer (base URL, timeout, headers).
- **React Icons** – For intuitive UI iconography (favorite heart, edit, delete).
- **MockAPI** – As a mock REST backend with persistent, database-backed storage.

### Ongoing Development

I plan to extend this project with the following improvements:

- Sorting the catalog (by title, author, or favorite status)
- Pagination or infinite scroll for larger catalogs
- Unit tests for core logic functions (API service, filtering)

### Useful resources

- [MockAPI](https://mockapi.io/) - Used for creating and hosting the mock `books` REST resource.
- [Flowbite React](https://flowbite-react.com/) - For ready-made, accessible UI components.
- [Tailwind CSS](https://tailwindcss.com/) - For utility-based responsive styling.
- [React Icons](https://react-icons.github.io/react-icons/) - For UI iconography.
- [Picsum Photos](https://picsum.photos/) - For placeholder book cover images.

## Author

- GitHub - [ErezHaimov](https://github.com/ErezHaimov)
- LinkedIn - [erez-haimov](https://www.linkedin.com/in/erez-haimov/)
