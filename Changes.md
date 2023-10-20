#Frontend
    - [ ] Everything.
    - [ x ] Basic calls for PPI.
      - [ x ] Change display to table for all three
          - [ x ] Instruments
              - [ x ] Add search functionality
              - [ x ] Implement pagination
              - [ ] Implement Filter & Actions 
        - [ x ] Implement Search functionality.
        - [ x ] Functionality for adding instruments to packs.
    - [ ] Modularizing more


#Backend
    Routes have been completed.
    Instruments have no-doubling verification.
    Packs can have instruments.
        When packs are called, instruments come for the ride.
    Procedures can have packs.
    Procedures can have instruments.
        When Procedures are called, packs and instruments come with.

    Added onHand to inventory, notes to Packs using Alembic.
    - [ x ] Consider backend pagination for instruments. Expecting ~1,039,000 characters, which may mean long loading times, but that is for the future.
    - [ x ] Pagination for backend (packs, instruments, procedures) implemented.

    - [ x ] CRUD for Packs, Procedures, and Instruments.
    - [ x ] Similar UI/UX (tables) across all PPI, with similar functionality.

#ToDo:
    -[ ] Validation
    -[ ] Smoother error handling
    -[ ] UI/UX Improvements.
    -[ ] Modularize More?
    -[ ] Double check naming conventions (this is madness).
    -[ X ] Pictures to packs
    -[ X ] Manufacturer on instruments
    -[ X ] SN on instruments
        -[ X ] Refactor routes for PackPics, Manufacturer, SNs. 