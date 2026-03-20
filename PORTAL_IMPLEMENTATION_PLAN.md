# 🏗️ Broker Web Portals – Implementation Plan (V1)

> **Stack:** React · TypeScript · Material UI (MUI)
> **Scope:** Role-based portal (Agent/Producer + Customer) added to the existing insurance website
> **Auth model:** Mock role-based auth (no backend — hardcoded demo credentials)
> **Data layer:** Static mock data with simulated async delays for realistic feel

---

## 📋 Overview

The portal is integrated directly into the existing project. Since there is no backend at this stage, the goal is to **build the full UI/UX experience using mock data** so the client can see, feel, and navigate the portal exactly as it will work in production. The mock layer is structured so that when the real backend is ready, only the service files need to be swapped out — all UI code stays the same.

---

## 🧱 Mock Data Strategy

> This section applies across all phases. Read before starting any work.

### How it works

- All data lives in `/src/portal/shared/mock/` as typed TypeScript files
- Service functions (e.g. `policyService.ts`) return `Promise<T>` using `setTimeout` to simulate a real API delay (~600–800ms)
- This means loading skeletons, error states, and async flows all work exactly as they will with a real backend
- Auth is simulated: hardcoded demo accounts with roles stored in `localStorage`

### Demo credentials (hardcoded)

```
Agent login:    agent@demo.com    / password: demo1234
Customer login: customer@demo.com / password: demo1234
```

- On login, the mock auth service checks the email, sets the role in `localStorage`, and redirects accordingly
- No real JWT is generated — a fake token string is stored to satisfy the `isAuthenticated` check
- A visible **"Demo Mode"** banner is shown in the portal `AppBar` so the client always knows this is a prototype

### File naming convention

```
/src/portal/shared/mock/
  mockPolicies.ts       ← 10–15 realistic policy records
  mockClaims.ts         ← 8–10 claim records across statuses
  mockPayments.ts       ← 12–15 payment records
  mockCommissions.ts    ← 10 commission records (agent use)
  mockNotifications.ts  ← 6–8 notifications (mix of types)
  mockUsers.ts          ← agent user + customer user profiles
  index.ts              ← barrel export
```

### Simulated async helper

```ts
// /src/portal/shared/mock/mockDelay.ts
export const mockDelay = <T>(data: T, ms = 700): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
```

Every service function wraps its return value in `mockDelay()` so the UI behaves identically to a real network call.

---

## ✅ Phase 1 — Foundation & Auth (Mock)

> Goal: Set up structure, routing, and a fully working mock login flow.

### 1.1 Project Structure

- [ ] Create `/src/portal/` directory to isolate all portal code from the main website
- [ ] Add subdirectories: `/agent/`, `/customer/`, `/shared/`, `/layouts/`, `/shared/mock/`
- [ ] Set up barrel exports (`index.ts`) for each subdirectory

### 1.2 Routing & Role Guards

- [ ] Install/confirm `react-router-dom` is available
- [ ] Define portal route tree:
  - `/portal/login`
  - `/portal/agent/*` — all agent routes
  - `/portal/customer/*` — all customer routes
- [ ] Create `ProtectedRoute` — checks `localStorage` for mock auth token, redirects to `/portal/login` if absent
- [ ] Create `RoleRoute` — reads role from `localStorage`, redirects on mismatch
- [ ] Post-login redirect: agent → `/portal/agent/dashboard`, customer → `/portal/customer/dashboard`

### 1.3 Mock Auth Service

- [ ] Create `/src/portal/shared/mock/mockAuthService.ts`:
  - [ ] `login(email, password)` — checks against hardcoded credentials, sets `{ token: 'mock-token', role, user }` in `localStorage`, returns after `mockDelay()`
  - [ ] `logout()` — clears `localStorage`, redirects to login
  - [ ] `getSession()` — reads and returns current session from `localStorage`
- [ ] Create `AuthContext` + `useAuth` hook backed by `mockAuthService`
- [ ] `AuthState` TypeScript interface: `{ user, role, token, isAuthenticated }`
- [ ] ⚠️ **Note for backend handoff:** Replace `mockAuthService.ts` with a real JWT-based service — `AuthContext` and `useAuth` do not change

### 1.4 Login Page

- [ ] Build `/portal/login` page:
  - [ ] Email + Password fields (MUI `TextField`)
  - [ ] "Show/hide password" toggle
  - [ ] Form validation: required fields, valid email format
  - [ ] Error state: "Invalid credentials" for wrong email/password
  - [ ] Loading spinner on submit button (uses `mockDelay` so it feels real)
  - [ ] "Forgot password?" link — navigates to a simple placeholder page
- [ ] Show demo credential hints below the form for easy client testing:
  ```
  🔵 Agent demo:    agent@demo.com / demo1234
  🟢 Customer demo: customer@demo.com / demo1234
  ```

### 1.5 Password Reset Pages (Placeholder)

- [ ] "Forgot Password" page: email input with a success message on submit — no real email sent
- [ ] "Reset Password" page: new password form — shows success and redirects to login
- [ ] Both pages clearly labelled as placeholder / coming soon in demo mode

### 1.6 Shared Portal Layout

- [ ] Create `PortalLayout` component (shared by both portals):
  - [ ] Top `AppBar`: logo, page title, notification bell, user name + role badge, logout button
  - [ ] **"⚡ Demo Mode"** chip in `AppBar` — amber colour, always visible
  - [ ] Collapsible side `Drawer` with role-specific nav links
  - [ ] Main content `<main>` area with consistent padding
  - [ ] Responsive: drawer collapses to hamburger on mobile (MUI `useMediaQuery`)
- [ ] Create `AgentNav` with links: Dashboard, Policies, Expiring Policies, Commissions
- [ ] Create `CustomerNav` with links: Dashboard, My Policies, Renewals, Claims, Payments

---

## ✅ Phase 2 — Shared Components & Mock Data Foundation

> Goal: Build the mock dataset and the reusable component kit before touching any portal pages.

### 2.1 TypeScript Interfaces & Types

- [ ] Define all shared types in `/src/portal/shared/types.ts`:
  - [ ] `Policy` — `{ id, policyNumber, product, customerName, customerId, startDate, endDate, status, premium }`
  - [ ] `Claim` — `{ id, claimNumber, policyId, policyNumber, dateOfIncident, description, status, timeline }`
  - [ ] `Payment` — `{ id, policyNumber, amount, date, status, method }`
  - [ ] `Commission` — `{ id, policyNumber, premiumAmount, rate, commissionAmount, paymentStatus, paymentDate }`
  - [ ] `Notification` — `{ id, type, message, date, read }`
  - [ ] `User` — `{ id, name, email, role, phone?, company? }`
  - [ ] `PolicyStatus`, `ClaimStatus`, `PaymentStatus` — TypeScript union types for all status values

### 2.2 Mock Data Files

- [ ] `/src/portal/shared/mock/mockPolicies.ts` — 12 policies:
  - Mix of statuses: Active (7), Expiring within 30 days (3), Expired (1), Cancelled (1)
  - Mix of products: Motor, Home, Life, Health
  - Realistic policy numbers, dates, customer names, premium amounts
- [ ] `/src/portal/shared/mock/mockClaims.ts` — 9 claims:
  - Statuses: Open (3), In Progress (3), Closed (3)
  - Each with a `timeline` array of 2–4 update entries
- [ ] `/src/portal/shared/mock/mockPayments.ts` — 14 payment records:
  - Statuses: Paid (9), Pending (3), Failed (2)
- [ ] `/src/portal/shared/mock/mockCommissions.ts` — 10 commission records:
  - Mix of Paid and Pending
- [ ] `/src/portal/shared/mock/mockNotifications.ts` — 7 notifications:
  - Types: policy expiring (3), payment pending (2), claim update (2)
  - 3 unread, 4 read
- [ ] `/src/portal/shared/mock/mockUsers.ts` — 2 user profiles (agent + customer)

### 2.3 Mock Service Layer

> These wrap mock data in `mockDelay()` and expose the same function signatures a real API service would use. The UI only ever calls these functions — it never imports mock data directly.

- [ ] `mockPolicyService.ts`:
  - `getPolicies(filters?)` → `Promise<Policy[]>`
  - `getPolicyById(id)` → `Promise<Policy>`
  - `getExpiringPolicies(days: 30 | 60 | 90)` → `Promise<Policy[]>`
- [ ] `mockClaimService.ts`:
  - `getClaims(filters?)` → `Promise<Claim[]>`
  - `getClaimById(id)` → `Promise<Claim>`
  - `submitClaim(data)` → `Promise<Claim>` — appends to in-memory array, returns new claim
- [ ] `mockPaymentService.ts`:
  - `getPayments(filters?)` → `Promise<Payment[]>`
- [ ] `mockCommissionService.ts`:
  - `getCommissions(filters?)` → `Promise<Commission[]>`
  - `getCommissionSummary()` → `Promise<{ totalPaid, totalPending }>`
- [ ] `mockNotificationService.ts`:
  - `getNotifications()` → `Promise<Notification[]>`
  - `markAsRead(id)` → `Promise<void>` — updates in-memory state
- [ ] `mockRenewalService.ts`:
  - `requestRenewal(policyId)` → `Promise<void>` — updates policy status to "Pending" in memory

### 2.4 Reusable UI Components

- [ ] **`SummaryCard`** — icon, label, value, optional colour variant prop
- [ ] **`DataTable`** — MUI `DataGrid` (Community) wrapper:
  - [ ] Column definitions via prop
  - [ ] Client-side pagination
  - [ ] Sortable columns
  - [ ] Search/filter toolbar slot
  - [ ] Loading skeleton state (shows `Skeleton` rows when `loading={true}`)
  - [ ] Empty state with icon + "No records found" message
- [ ] **`StatusChip`** — MUI `Chip` with colour map:
  - Active → green, Expired → grey, Cancelled → red, Pending → amber, Approved → green, Rejected → red, Open → blue, In Progress → amber, Closed → grey, Paid → green, Failed → red
- [ ] **`PageHeader`** — title, optional subtitle, optional right-side action button slot
- [ ] **`LoadingSkeleton`** — card skeleton (4-up grid) + table skeleton variants
- [ ] **`ErrorAlert`** — MUI `Alert` with error message + optional retry button
- [ ] **`ConfirmDialog`** — reusable MUI `Dialog`: title, body, confirm/cancel, loading state on confirm
- [ ] **`NotificationBell`** — `IconButton` with unread count `Badge`, dropdown `Popover` with mark-as-read

### 2.5 Custom Hooks

- [ ] `usePagination` — page, pageSize, total, handlers
- [ ] `useFilters` — generic filter state map + reset
- [ ] `useMockFetch<T>(serviceFn)` — calls service function on mount, returns `{ data, loading, error, refetch }`
- [ ] `useNotifications` — wraps `mockNotificationService`, exposes unread count + mark-as-read

---

## ✅ Phase 3 — Agent / Producer Portal

> All data comes from mock services. No backend calls.

### 3.1 Agent Dashboard (`/portal/agent/dashboard`)

- [ ] 4 `SummaryCard` components:
  - Total Portfolio → count of all policies
  - Commission Paid → from `getCommissionSummary().totalPaid`
  - Commission Pending → from `getCommissionSummary().totalPending`
  - Expiring (30 days) → count from `getExpiringPolicies(30)`
- [ ] Notifications panel — last 5 from `getNotifications()`
- [ ] "Premium vs Commission" section — static bar chart using mock commission data (Recharts or static SVG); labelled "Chart Preview"

### 3.2 Portfolio — Policy List (`/portal/agent/policies`)

- [ ] `useMockFetch` → `getPolicies()`
- [ ] `DataTable` columns: Policy Number, Customer Name, Product/Risk, Start Date, End Date, Status (`StatusChip`)
- [ ] Filter toolbar: status dropdown + free-text search on customer name / policy number
- [ ] "View Details" button per row → `/portal/agent/policies/:id`

### 3.3 Expiring Policies (`/portal/agent/expiring`)

- [ ] MUI `ToggleButtonGroup` for 30 / 60 / 90 days filter
- [ ] `useMockFetch` re-calls `getExpiringPolicies(days)` on toggle change
- [ ] `DataTable` columns: Policy Number, Customer Name, Product, End Date, Days Remaining, Status
- [ ] "Mark as followed up" toggle per row — updates in-memory state, chip changes to "Followed Up"
- [ ] "Notify Customer" button — disabled, MUI `Tooltip` says "Coming in V1.1"

### 3.4 Commissions (`/portal/agent/commissions`)

- [ ] Summary cards at top: Total Paid, Total Pending
- [ ] `useMockFetch` → `getCommissions()`
- [ ] `DataTable` columns: Policy Number, Premium Amount, Commission Rate, Commission Amount, Payment Status, Payment Date
- [ ] Filter by Payment Status (All / Paid / Pending)

### 3.5 Policy Details (`/portal/agent/policies/:id`)

- [ ] `useMockFetch` → `getPolicyById(id)`
- [ ] MUI `Tabs` with 5 tabs:
  - **Policy Info** — key-value grid
  - **Customer Info** — name, email, phone, address
  - **Premium Breakdown** — components table
  - **Payment History** — `DataTable` of payments for this policy
  - **Commission Details** — rate, amounts, status
- [ ] Back button → `/portal/agent/policies`
- [ ] Loading skeleton while fetching

---

## ✅ Phase 4 — Customer Portal

> All data comes from mock services filtered to the logged-in customer's records.

### 4.1 Customer Dashboard (`/portal/customer/dashboard`)

- [ ] 4 `SummaryCard` components:
  - Active Policies count
  - Expiring Policies count (next 30 days)
  - Open Claims count
  - Last Payment amount + date
- [ ] Notifications panel — last 5 from `getNotifications()`

### 4.2 My Policies (`/portal/customer/policies`)

- [ ] `useMockFetch` → `getPolicies()`
- [ ] `DataTable` columns: Policy Number, Product, Start Date, End Date, Status (`StatusChip`)
- [ ] "View Details" → `/portal/customer/policies/:id`
- [ ] "Download Documents" button — disabled, tooltip: "Coming Soon"

### 4.3 Policy Details (`/portal/customer/policies/:id`)

- [ ] Sections: Policy Info card, Premium Breakdown table, Payment History table
- [ ] Back button

### 4.4 Policy Renewal (`/portal/customer/renewals`)

- [ ] `useMockFetch` → `getExpiringPolicies(30)` by default
- [ ] Toggle: 30 / 60 / 90 days
- [ ] `DataTable` columns: Policy Number, Product, End Date, Days Remaining, Renewal Status
- [ ] "Request Renewal" per row:
  - Opens `ConfirmDialog`
  - On confirm: calls `requestRenewal(policyId)` with loading spinner
  - On success: row status updates to "Pending", MUI `Snackbar` toast confirms submission
- [ ] Already-requested rows show `StatusChip` "Pending" + disabled button

### 4.5 Claims (`/portal/customer/claims`)

- [ ] **Claims List:**
  - [ ] `useMockFetch` → `getClaims()`
  - [ ] `DataTable` columns: Claim Number, Policy Number, Status (`StatusChip`), Date
  - [ ] Filter by status
  - [ ] "View Details" per row
  - [ ] "Declare New Claim" button → opens slide-in MUI `Drawer` panel
- [ ] **Declare Claim Drawer:**
  - [ ] Policy selector — MUI `Select` from `getPolicies()` (active only)
  - [ ] Date of incident — MUI `DatePicker`
  - [ ] Description — `TextField` multiline
  - [ ] Attachments — file input (UI only — shows selected filenames, no real upload in mock)
  - [ ] Validation: policy + date + description required
  - [ ] Submit → `submitClaim(data)` → on success: close drawer, `Snackbar` "Claim submitted", new claim prepended to list
- [ ] **Claim Details (`/portal/customer/claims/:id`):**
  - [ ] Claim header card
  - [ ] MUI `Timeline` component with 2–4 update entries per claim
  - [ ] Documents section (mock filenames or "No documents yet")
  - [ ] Back button

### 4.6 Payments (`/portal/customer/payments`)

- [ ] `useMockFetch` → `getPayments()`
- [ ] `DataTable` columns: Policy Number, Amount, Date, Status (`StatusChip`), Payment Method
- [ ] Filter by status (All / Paid / Pending / Failed)
- [ ] Total paid summary card above table

---

## ✅ Phase 5 — Polish & Prototype Review

> Goal: Make the prototype clean, navigable, and demo-ready for the client.

### 5.1 Responsive Design

- [ ] Test all pages at 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] `DataTable` horizontal scroll on mobile
- [ ] Drawer collapses to hamburger on mobile
- [ ] Dashboard cards stack to single column on mobile (MUI `Grid` responsive props)
- [ ] Forms are fully usable on mobile

### 5.2 Empty & Error States

- [ ] All tables show icon + "No records found" when empty
- [ ] All `useMockFetch` calls show `ErrorAlert` with retry on error
- [ ] Dashboard `SummaryCard` shows `0` gracefully

### 5.3 Loading States

- [ ] All pages show `LoadingSkeleton` during the ~700ms mock delay
- [ ] Async action buttons show spinner + disabled state

### 5.4 Notifications

- [ ] `NotificationBell` shows unread count badge
- [ ] Clicking a notification marks it as read (badge decrements)

### 5.5 Demo UX Touches

- [ ] "⚡ Demo Mode" chip always visible in `AppBar`
- [ ] Login page shows demo credentials hint
- [ ] Disabled features use consistent `Tooltip`: **"Coming in a future release"**
- [ ] All currency values formatted consistently (e.g. `XAF 1,200,000`)
- [ ] All dates formatted consistently (e.g. `15 Mar 2025`)

### 5.6 Code Quality

- [ ] No TypeScript `any` types in portal code
- [ ] ESLint passes with no errors
- [ ] All mock service functions have a `// TODO: Replace with real API call` comment

---

## ✅ Phase 6 — Backend Handoff Preparation

> Goal: Ensure swapping mock → real is low-risk and well-documented.

- [ ] Document all mock service function signatures in `API_CONTRACT.md` — this becomes the spec for the backend team
- [ ] Ensure every component imports only from service files, never directly from mock data files
- [ ] Create a `REACT_APP_USE_MOCK` environment variable flag:
  - `true` → service files use mock implementations
  - `false` → service files use real Axios/fetch implementations
- [ ] Wire up real auth (JWT, cookie/localStorage, refresh logic)
- [ ] Swap mock services one by one — test each in isolation
- [ ] Remove demo credential hints from login page
- [ ] Remove "Demo Mode" banner from `AppBar`
- [ ] Final staging deploy → UAT sign-off → production

---

## 🗂️ Phase Summary

| Phase | Focus                  | Key Output                                           |
| ----- | ---------------------- | ---------------------------------------------------- |
| 1     | Foundation + Mock Auth | Login, role routing, layout, demo credentials        |
| 2     | Mock Data + Shared UI  | Mock dataset, service layer, component kit           |
| 3     | Agent Portal           | All agent screens wired to mock data                 |
| 4     | Customer Portal        | All customer screens wired to mock data              |
| 5     | Polish                 | Responsive, loading/empty/error states, demo UX      |
| 6     | Backend Handoff        | API contract doc, env flag swap, real service wiring |

---

## 📁 Folder Structure Reference

```
/src/portal/
├── layouts/
│   ├── PortalLayout.tsx
│   ├── AgentNav.tsx
│   └── CustomerNav.tsx
├── shared/
│   ├── types.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useMockFetch.ts
│   │   ├── usePagination.ts
│   │   ├── useFilters.ts
│   │   └── useNotifications.ts
│   ├── components/
│   │   ├── SummaryCard.tsx
│   │   ├── DataTable.tsx
│   │   ├── StatusChip.tsx
│   │   ├── PageHeader.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ErrorAlert.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── NotificationBell.tsx
│   ├── mock/
│   │   ├── mockDelay.ts
│   │   ├── mockUsers.ts
│   │   ├── mockPolicies.ts
│   │   ├── mockClaims.ts
│   │   ├── mockPayments.ts
│   │   ├── mockCommissions.ts
│   │   ├── mockNotifications.ts
│   │   ├── mockAuthService.ts
│   │   ├── mockPolicyService.ts
│   │   ├── mockClaimService.ts
│   │   ├── mockPaymentService.ts
│   │   ├── mockCommissionService.ts
│   │   ├── mockRenewalService.ts
│   │   ├── mockNotificationService.ts
│   │   └── index.ts
│   └── context/
│       └── AuthContext.tsx
├── agent/
│   ├── dashboard/AgentDashboard.tsx
│   ├── policies/AgentPolicies.tsx
│   ├── policies/AgentPolicyDetail.tsx
│   ├── expiring/ExpiringPolicies.tsx
│   └── commissions/Commissions.tsx
└── customer/
    ├── dashboard/CustomerDashboard.tsx
    ├── policies/CustomerPolicies.tsx
    ├── policies/CustomerPolicyDetail.tsx
    ├── renewals/PolicyRenewals.tsx
    ├── claims/Claims.tsx
    ├── claims/ClaimDetail.tsx
    ├── claims/DeclareClaimPanel.tsx
    └── payments/Payments.tsx
```

---

> 💡 **Key principle:** Every component talks to a service function. Every service function today returns mock data. Tomorrow it returns real API data. The UI never knows the difference.
