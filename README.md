<div align="center">

# 💍 PlanMyWedding.ai — Frontend

**An AI-powered wedding planning marketplace. Discover vendors, plan your event, and chat with a streaming AI assistant.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://planmywedding-client-et7k-eta.vercel.app/)
[![Backend Repo](https://img.shields.io/badge/Backend-Repository-blue?style=for-the-badge)](https://github.com/mndbobby61-blip/planmywedding-server)

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

</div>

---

## 📖 Overview

PlanMyWedding.ai is a full-stack wedding planning platform where couples can browse and book wedding vendors, read reviews, and get personalized recommendations from an AI planner. This repository contains the **frontend**, built with Next.js and TypeScript. It talks to a separate Express.js REST API.

| Part | Repository |
| --- | --- |
| Frontend (this repo) | [planmywedding-client](https://github.com/mndbobby61-blip/planmywedding-client) |
| Backend API | [planmywedding-server](https://github.com/mndbobby61-blip/planmywedding-server) |

**Live site:** https://planmywedding-client-et7k-eta.vercel.app/

---

## ✨ Features

### For everyone
- **Landing page** with a hero section, featured vendors, how-it-works, categories, testimonials, stats and newsletter sections
- **Vendor explorer** with search, location filter, sorting and pagination
- **Vendor details page** with overview, reviews and a booking card
- **AI Chat assistant** with live streaming responses
- **AI Planner** where users enter their wedding preferences and get personalized vendor recommendations
- **About, Contact and Blog pages**, plus a custom 404 page
- **Fully responsive** layout with a working mobile hamburger menu

### For signed-in users
- **Authentication:** email/password register and login, plus Google sign-in
- **Protected routes:** pages like `/items/add` and `/items/manage` are only available after login
- **Add a vendor:** submission form with client-side validation
- **Manage vendors:** view and delete your own listings

---

## 🧰 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 14, React |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Global state | Redux Toolkit (auth slice) |
| Server state & caching | TanStack Query |
| HTTP client | Axios |
| Deployment | Vercel |

---

## 🏗️ How It Works

```
┌──────────────────────┐   HTTPS / JSON   ┌──────────────────────┐   ┌──────────────┐
│  Next.js Frontend    │ ───────────────▶ │  Express.js REST API │──▶│   MongoDB    │
│  (this repository)   │ ◀─────────────── │  (planmywedding-     │   └──────────────┘
│                      │   SSE streaming  │   server)            │   ┌──────────────┐
└──────────────────────┘                  └──────────────────────┘──▶│  OpenAI API  │
                                                                     └──────────────┘
```

- **Data fetching:** an Axios client is wrapped by TanStack Query hooks (for example `useVendors`), which handle caching, loading and error states.
- **Auth state:** a Redux Toolkit auth slice and a `useAuth` hook keep the current user in sync. A `ProtectedRoute` wrapper redirects unauthenticated visitors to the login page.
- **AI chat:** the chat window sends messages to the backend and renders the response as it streams in.
- **UI:** reusable components such as `VendorCard`, skeleton loaders, `EmptyState`, `ChatBubble` and `TypingIndicator` keep the interface consistent.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or newer
- npm
- The [backend server](https://github.com/mndbobby61-blip/planmywedding-server) running locally or deployed

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mndbobby61-blip/planmywedding-client.git
cd planmywedding-client

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the PlanMyWedding backend API |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |

---

## 🗺️ Pages

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page |
| `/vendors` | Public | Explore vendors with search, filter and pagination |
| `/vendors/[id]` | Public | Vendor details, reviews and booking |
| `/login`, `/register` | Public | Authentication |
| `/ai-chat` | Public | Streaming AI chat assistant |
| `/ai-planner` | Public | AI-powered vendor recommendations |
| `/about`, `/contact`, `/blog` | Public | Information pages |
| `/items/add` | 🔒 Protected | Add a new vendor |
| `/items/manage` | 🔒 Protected | View and delete your vendors |

---

## 🖼️ Screenshots

<!-- Add your screenshots to docs/screenshots/ and update the file names below -->

| Home | Vendors |
| --- | --- |
| ![Home](docs/screenshots/home.png) | ![Vendors](docs/screenshots/vendors.png) |

| Vendor Details | AI Chat |
| --- | --- |
| ![Vendor Details](docs/screenshots/vendor-details.png) | ![AI Chat](docs/screenshots/ai-chat.png) |

---

## ☁️ Deployment

The app is deployed on **Vercel**. To deploy your own copy:

1. Push the repository to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add `NEXT_PUBLIC_API_URL` under **Project Settings → Environment Variables**, pointing to your deployed backend.
4. Deploy.

---

## 👨‍💻 Author

**Md. Rabbi Sarder**
Full Stack Developer

- 🌐 Portfolio: [rabbi-main-portfolio.vercel.app](https://rabbi-main-portfolio.vercel.app)
- 💼 LinkedIn: [md-rabbi-sarder-rabbi](https://www.linkedin.com/in/md-rabbi-sarder-rabbi-3691453b6/)
- 🐙 GitHub: [@mndbobby61-blip](https://github.com/mndbobby61-blip)
- 📧 Email: mdbobby51@gmail.com

---

<div align="center">

⭐ If you like this project, consider giving it a star!

</div>
