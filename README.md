# Centro Pinturerías - E-commerce & Static Web Platform

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Framework](https://img.shields.io/badge/Framework-Astro%20v5-orange)
![UI](https://img.shields.io/badge/UI-React%2018%20%7C%20Radix-blue)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC)

Welcome to the **Centro Pinturerías** project repository. This platform serves as a modern, high-performance static web application and e-commerce front-end for a paint retail business. Designed with a focus on speed, accessibility, and user experience, the application provides customers with tools to calculate material needs, browse products, and seamlessly contact sales via WhatsApp.

---

## 🏗️ Architecture & Tech Stack

This project leverages a modern Jamstack architecture, utilizing the "Islands Architecture" pattern provided by Astro to ship zero JavaScript by default, only hydrating interactive React components where necessary.

### Core Technologies:
- **[Astro (v5)](https://astro.build/)**: The core framework for generating blazingly fast static HTML.
- **[React (v18)](https://react.dev/)**: Used for complex, interactive UI islands (e.g., Paint Calculator, Dynamic Forms).
- **[Tailwind CSS (v4)](https://tailwindcss.com/)**: Utility-first CSS framework for rapid, responsive UI development.
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible component primitives used as the foundation for our design system.
- **[Framer Motion](https://www.framer.com/motion/)**: For fluid and performant complex animations.

### Project Structure:
```text
/
├── public/           # Static assets (images, fonts, favicon)
├── src/
│   ├── components/   # Reusable UI components (React & Astro)
│   ├── context/      # React Context for global state management
│   ├── layouts/      # Global application layouts
│   ├── pages/        # Astro file-based routing
│   └── styles/       # Global CSS and Tailwind configurations
├── guidelines/       # Internal development and design guidelines
├── astro.config.mjs  # Astro configuration
└── package.json      # Dependencies and scripts
```

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `bun` installed on your machine.

### Installation

1. Clone the repository (if applicable) or navigate to the project directory:
   ```bash
   cd centro_pinturerias
   ```

2. Install the project dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:4321` to view the project.

---

## 🗺️ Product Roadmap & Features

Below is the current development roadmap, categorized by complexity and business value.

### 🔴 High Priority / Complex Features
- **Paint Calculator Engine**: Development of the core calculation logic (surface area, yield, coats required) coupled with an interactive, validated React form UI.
- **Functional Contact Integration**: Integration of contact forms with serverless handlers (e.g., Formspree / Netlify Forms) including robust state management (loading, success, error) and field validation.
- **Dynamic News Articles**: Implementation of dynamic routing and detail pages for individual news/blog entries.

### 🟡 Medium Complexity
- **Client-Side Search**: Functional product filtering (by name, category, brand) with URL state synchronization (`/tienda?q=...`).
- **WhatsApp Checkout Integration**: Dynamic message generation binding selected products to a WhatsApp redirect (`wa.me`). Applies across Shop, Paints, Coatings, and Decor sections.
- **Branch Management System**: Integration of dynamic maps and location data for the 3 retail branches.
- **Real-Time Store Status**: Dynamic "Open/Closed" badge calculation based on the user's local time and store hours.
- **Legal Pages**: Scaffolding for Terms & Conditions and Privacy Policy.
- **Product Decision Tree**: An interactive guide helping users select the right product based on surface and use-case.

### 🟢 Quick Wins & Refinements
- **Navigation Wiring**: Connecting all Header dropdowns and Footer links to their respective active routes.
- **UI Polish**: Transforming generic buttons (e.g., "See all products") into semantic navigation anchors.
- **Asset Updates**: Updating placeholder WhatsApp numbers and social media links with production data.
- **Favicon Implementation**: Adding the `favicon.svg` to the public directory.

### ⏳ Blocked / Pending External Data
- **Product Detail Pages (PDP)**: Awaiting structured product technical sheets and data from the client to generate dynamic detail views.

---

## 🤝 Development Guidelines

Please refer to the `/guidelines` directory for specific instructions regarding component architecture, styling conventions, and Git workflow. 

Ensure all new interactive components are built accessibly (utilizing Radix primitives where applicable) and follow the established Tailwind design tokens.

---

*Designed and developed with performance and scalability in mind.*
