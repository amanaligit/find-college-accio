# Search College

Searching for a college could be very hard especially when we have a lot of
choices. But it is very necessary to choose the right one and be aware of all the
options. Now that we are in college and are familiar with what issues we all faced,
we should try to help others. We can create a robust server that can handle some
of their problems.

## Details
Our server should search according to all the parameters specified by the user
The search should be case-insensitive.

Schema, Model and connector are already provided for you to use.

We want to send the data stored in a collection named collegerecords
Structure of the data can be understood by having a look at data.js
The server is supposed to send data in the same structure, it can query over
this data but should not manipulate it.

After npm install, you can create the college database on your system using
command node ./createDatabase.js. Make sure to edit your own monogDB URI in config.json before doing this so that you can use your own database.

We are supposed to expose one endpoint on http://locahost:8080

## GET http://locahost:8080/findColleges

This request accepts the following parameters: name, state, city,
minPackage, maxFees, course and exams such that:

name=ABC filter if the college name contains ABC

state=DEF filter if the state in which the college is located contains DEF

city=ABC filter if the city in which the college is located contains ABC

minPackage=10.5 filter if the college's average package is greater
then or equals to 10.5 lac/annum

maxFees=10 filter if the college's total fees is less then or equals to 10
lac

course=ABC filter if the college provides ABC course

exam=DEF filter if the college accepts admission through DEF exam.

The server should be able to handle invalid values for minPackage, maxFees,
any value other then positive number is considered invalid here.
Whole code should be written app.js
Hint: try to use regex in monogDB.

make sure that you serialize the JSON in exactly this format and exactly this order of keys:
 ```
 {
        "exam": [
            "CAT",
            "GMAT"
        ],
        "name": "Indian Institute of Management",
        "city": "Bangalore",
        "state": "Karnataka",
        "course": "PGPM",
        "maxFees": 23.15,
        "minPackage": 40.5
 }
 ```
dont add/delete/rename the entries and dont modify the database given to you as the tests are hardcoded.