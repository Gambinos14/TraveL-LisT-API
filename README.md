# TraveL-LisT-API

This app allows users to build their own custom destination lists to start
planning their next big travel adventure.

#### Important Links

Client repo: [TraveL-LisT-Client](https://github.com/Gambinos14/TraveL-LisT-Client)

#### Project Planning
I started by working on and testing the API authentication routes with some curl
scripts to ensure that the API was handling user requests correctly and
returning unique tokens to the client when a user logged in. From there, I made
all the CRUD routes require authentication so that the user token is required to
make any changes to the destinations collection in the MongoDB back-end. Once
all the destination routes were completed, I tested them out with some curl
scripts and then began creating the front-end to test the API with some AJAX
requests.

The first version of this application required just a simple back-end with two
models the destination model and the user model. Each destination has an owner
which references a user and a user owns many destinations which can easily be
retrived with an easy search on the destinations collection. Future versions
of this application could include routes for comments on a destination or routes
for the user to build multiple named lists of destinations.


#### User Stories
* As a user, I want to be able to interact with only my personal bucket list.
* As a user, I would like to be able to create an ordered list of my top bucket
list detinations.
* As a user, I would like that bucket list to be rendered in the same order every
time I log in.
* As a user, I would like to be able to change the order of the destinations in
my bucket list.

#### Technologies Used
* JavaScript
* Express.js
* MongoDB
* Mongoose
* Heroku

#### Future Updates
* Add a list model with a name, an array of destination IDs and an owner
* Add routes to CRUD a list
* Add a comment model with a name and body
* Add a coments array to the destination model with references to comment IDs
* Add comment routes to create comments and delete comments

#### Wireframe and ERD

Wireframe and ERD [imgur link](https://imgur.com/TvBtjZ5)
