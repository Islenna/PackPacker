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
    - [ ] Removed Draggable - it's throwing DOM errors.


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