# TripAdCoba - About

### CRUD API

- **C**reate: POST endpoint at `/api/hotel` creates a new database entry with the hotel information provided in the request body
- **R**ead: GET endpoint at `/api/hotel/:hotelId` responds with the hotel information with the given hotel id
- **U**pdate: PUT endpoint at `/api/hotel/:hotelId` updates the database entry with the information provided in the request body, and responds with the newly updated hotel information
- **D**elete: DELETE endpoint at `/api/hotel/:hotelId` deletes the database entry with the given hotel id


### Postgres DBMS Set-Up

Since in Postgres, databases cannot be dropped or created during transactions, initial database setup needs to happen in the command line. After installing Postgres and verifying the CLI psql works, run the following command (Note: the code in brackets is optional and depends on your Postgres installation, whether you want to connect with a specific host or port, etc.):
> `psql [-U username -d database -h host -p port] -f server/db-postgres/config.sql`

Afterwards, you'll need to generate the mock data (which you can see in the server/db-postgres/seedData directory): `node server/db-postgres/generateData.js`
Then load it into the database: `node server/db-postgres/loadData.js`
