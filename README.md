# PlanMyWedding.ai — frontend

Next.js 14 + TypeScript + Tailwind CSS frontend for an AI wedding planning marketplace.

## Setup

```
npm install
cp .env.example .env.local
npm run dev
```

## Frontend build roadmap (30 commits)

1. chore: init Next.js + TypeScript + Tailwind project scaffold
2. style: add global theme tokens and root layout
3. feat: add Navbar and Footer layout components
4. feat: add Vendor types and local mock data
5. feat: add VendorCard and skeleton loader components
6. feat: add HeroSection with auto-fading vendor collage
7. feat: add FeaturedVendors and HowItWorks sections
8. feat: add Categories and Testimonials sections
9. feat: add Stats and Newsletter sections
10. feat: assemble home page from all sections (7 sections total)
11. feat: add VendorFilterBar with search, location and sort
12. feat: build vendors explore page with filtering and pagination
13. feat: add vendor details page with overview, reviews and booking card
14. feat: add login page with demo login and Google sign-in button
15. feat: add register page with client-side validation
16. feat: add useAuth hook and ProtectedRoute wrapper
17. feat: add protected /items/add page with vendor submission form
18. feat: add protected /items/manage page with view and delete actions
19. feat: add chat types, ChatBubble and TypingIndicator components
20. feat: add ChatWindow component and /ai-chat page
21. feat: add RecommendationForm for AI planner inputs
22. feat: add /ai-planner page wiring recommendation form and results
23. feat: add About and Contact pages
24. feat: add blog listing page
25. feat: add axios API client and TanStack Query provider
26. feat: add Redux Toolkit store with auth slice and provider
27. feat: add useVendors query hook and EmptyState component
28. feat: add custom 404 not-found page
29. fix: add functional mobile hamburger menu to Navbar for full responsiveness
30. chore: wire NEXT_PUBLIC_API_URL and finalize README for handoff → **start backend here**

## Where the backend takes over

Everything above uses mock data (`src/lib/mock-vendors.ts`) and stubbed handlers
marked `// TODO`. Once the backend is live, replace these in order:

- `useVendors` hook → real `GET /api/vendors`
- `/items/add` submit handler → `POST /api/vendors`
- `/items/manage` delete handler → `DELETE /api/vendors/:id`
- `useAuth` hook → real `GET /api/auth/me`
- `ChatWindow.sendMessage` → streaming `POST /api/ai/chat`
- `ai-planner` submit handler → `POST /api/ai/recommend`

## Backend roadmap (15 commits) — see server README once created

1. chore: init Express + TypeScript + MongoDB project
2. feat: add env config and DB connection
3. feat: add User model and JWT auth (register/login)
4. feat: add Google OAuth login
5. feat: add auth middleware and error middleware
6. feat: add Vendor model and CRUD routes
7. feat: add vendor search, filter and pagination query logic
8. feat: add Booking model and routes
9. feat: add Review model and routes
10. feat: add LLM client wrapper (OpenAI/Gemini/Claude)
11. feat: add AI recommendation endpoint (POST /api/ai/recommend)
12. feat: add AI chat endpoint with conversation history (POST /api/ai/chat)
13. feat: add streaming support to chat endpoint (SSE)
14. test: add basic request validation and error handling across routes
15. chore: connect frontend .env to deployed backend URL and deploy
