# PackPacker — ToDo.md

---

## 🖥️ Frontend

- [ ] Everything.
- [x] Basic calls for PPI.
  - [x] Change display to table for all three:
    - [x] Instruments
      - [x] Add search functionality
      - [x] Implement pagination
      - [ ] Implement Filter & Actions
    - [x] Packs
    - [x] Procedures
  - [x] Search functionality implemented
  - [x] Functionality for adding instruments to packs
- [ ] Modularize components further
- [ ] UI/UX improvements
- [ ] Validation (form inputs, etc.)
- [ ] Smoother error handling
- [ ] Double-check naming conventions (this is madness)
- [x] 🔐 Create Login page (frontend)
- [x] 🔐 Create Register page (frontend)
- [x] Handle and store JWT usertoken (localStorage or cookie)
- [x] Add login/logout logic (conditional UI)
- [ ] De-clutter Tailwind
- [x] Create Clinics
- [x] Tie clinics to packs/procedures
- [x] Tie users to clinics
- [x] Protect clinics, IE: Concord shouldn't access Dublin, RWC shouldn't access Campbell - unless superuser.
- [x] Create user roles.
---

## 🛠️ Backend

- ✅ Routes for CRUD:
  - Instruments (no-duplicate check)
  - Packs (can contain instruments)
  - Procedures (can contain packs and/or instruments)
- ✅ When packs or procedures are fetched, related instruments/packs are returned
- ✅ Pagination for PPI implemented
- ✅ Alembic migrations:
  - Added `on_hand` to inventory
  - Added `notes` to Packs
  - Added `manufacturer` and `serial_number` to instruments
  - Added picture support to packs
- [x] 🔐 Create `User` model
- [x] 🔐 Create `Hospital` model (for future multi-clinic support)
- [x] 🔐 Register route (`/register`)
- [x] 🔐 Login route (`/login`)
- [x] 🔐 Password hashing (using `passlib`)
- [x] 🔐 JWT-based auth
- [x] Protect routes that should require auth
- [x] Seed a superuser.

---

## 🧪 Future Polish

- [x] Role-based access (admin/tech)
- [x] Hospital scoping (users tied to a single clinic's data)
- [ ] Onboarding/training view mode
- [ ] Demo mode with dummy login
- [x] Authenticated image upload (packs and instruments)
