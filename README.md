# Tic tac toe

This is approach for the DDD style of the game. 
Application structure was divided into 3 layers:

- Domain - contains the business logic
- Application - contains the application logic
- Infrastructure - contains the infrastructure

I've covered some of the DDD concepts, but there is still a lot of work to do.
General requirements was tested using jest.

General abstraction for the database is now running files under the RepositoryInterface pattern, which might be moved into the database.
Game state calculation. Winning, loosing is based on observer pattern, but it might emit event and process it in async way. Time was tight, so I've used simple approach.

Current test suite contains: 
- 7 test suites 
- 29 tests overall

## Dependencies

Project is based on the following dependencies:
- nestjs 
- uuid package

## Installation 
For the development I've used node 18

run npm install

## Run the app

Server should run on 8080 port

run npm dev:start

## Test the app

run npm test 

## Manual tests 

Project contains requests.json which is Insomnia v4 collection. 