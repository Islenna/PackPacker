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
- [x] Handle and store JWT token (localStorage or cookie)
- [x] Add login/logout logic (conditional UI)
- [ ] De-clutter Tailwind
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
- [ ] 🔐 Create `User` model
- [ ] 🔐 Create `Hospital` model (for future multi-clinic support)
- [ ] 🔐 Register route (`/register`)
- [ ] 🔐 Login route (`/login`)
- [ ] 🔐 Password hashing (using `passlib`)
- [ ] 🔐 JWT-based auth
- [ ] Protect routes that should require auth

---

## 🧪 Future Polish

- [ ] Role-based access (admin/tech)
- [ ] Hospital scoping (users tied to a single clinic's data)
- [ ] Onboarding/training view mode
- [ ] Demo mode with dummy login
- [ ] Authenticated image upload (packs)
