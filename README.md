# TripAdCoba - About

### CRUD API

- **C**reate: POST endpoint at `/api/hotel` creates a new database entry with the hotel information provided in the request body
- **R**ead: GET endpoint at `/api/hotel/:hotelId` responds with the hotel information with the given hotel id
- **U**pdate: PUT endpoint at `/api/hotel/:hotelId` updates the database entry with the information provided in the request body, and responds with the newly updated hotel information
- **D**elete: DELETE endpoint at `/api/hotel/:hotelId` deletes the database entry with the given hotel id


### Postgres DBMS Set-Up

Since in Postgres, databases cannot be dropped or created during transactions, initial database setup needs to happen in the command line. After installing Postgres and verifying the CLI psql works, run the following command (Note: the code in brackets is optional and depends on your Postgres installation, whether you want to connect with a specific host or port, etc.): `psql [-U username -d database -h host -p port] -f server/db-postgres/config.sql`.

Afterwards, you'll need to generate the mock data (which you can see in the server/db-postgres/seedData directory): `node server/db-postgres/generateData.js`, then load it into the database: `node server/db-postgres/loadData.js`.


### Cassandra DBMS Set-Up

In order to run multiple nodes from one machine for our cluster, we'll be using the ccm package: https://github.com/riptano/ccm. After installing Cassandra and ensuring the CLI cqlsh works, install ccm's dependencies and ccm itself. Before setting up a new cluster, make sure a Cassandra process isn't currently running (if installed with brew, run `brew services stop cassandra`). Then you can set up a new cluster with four nodes with the command: `ccm create about_cluster -v [your cassandra version] -n 3 -s`. To check the status of your cluster and its nodes, run `ccm status`.

Next, configure the database by running `cqlsh -f server/db-cassandra/config.cql` (we can't configure with the NodeJS driver, since the driver needs to connect to a keyspace first).

To generate the data into the server/db-cassandra/seedData directory, run `node server/db-cassandra/generateData.js`, and then run `node server/db-cassandra/loadData.js` to seed the database.
