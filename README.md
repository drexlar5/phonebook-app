# phonebook-app
A simple phonebook app

**Author:** Michael Agboola

**Environments**

Node version - v12.18.3 (LTS)

YARN version - v1.22.10

**This application uses the following technologies:**

- nodeJs
- expressJs
- mongoose
- jest
- supertest

**Install all dependencies**

```
yarn install
```

**Start the application**

```
yarn start
```

**Test the application**

```
yarn test
```

## User Authentication -

### Create User

**Endpoint** `http://localhost:3001/api/v1/register` - method (POST)

- Creates a User

**Payload**

```json
{
    "email": "demo@gmail.com",
    "password": "1234"
}
```

**Response format**

```json
{
    "error": false,
    "message": "User created."
}
```

### Authenticate User

**Endpoint** `http://localhost:3001/api/v1/login` - method (POST)

- Authenticates a User

**Payload**

```json
{
    "email": "demo@gmail.com",
    "password": "1234"
}
```

**Response format**

```json
{
    "error": false,
    "message": "User authenticated",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### application/json


##  Phonebook CRUD -

### Add Phonebook

**Endpoint** `http://localhost:3001/api/v1/phonebook/add` - method (POST)

- Creates phonebook and saves it to the database

**Authorization: Bearer <jwt-token>**

**Payload**

```json
{
    "name": "john doe",
    "email": "johndoe@gmail.com",
    "phone_numbers": [{
        "tag": "mobile",
        "number": "34567890"
    },{
        "tag": "home",
        "number": "45678901"
    },{
        "tag": "work",
        "number": "56789012"
    }
    ],
    "mailing_address": "Qubec, Canada."
}
```

**Response format**

```json
{
    "error": false,
    "message": "Phonebook created.",
    "data": {
        "phone_numbers": [
            "5fd95100ed74c34dbb361312",
            "5fd95100ed74c34dbb361313",
            "5fd95100ed74c34dbb361314"
        ],
        "_id": "5fd95100ed74c34dbb361315",
        "user": "5fd950aeed74c34dbb361311",
        "name": "john doe",
        "email": "johndoe@gmail.com",
        "mailing_address": "Qubec, Canada.",
        "__v": 0
    }
}
```

### Update Phonebook

**Endpoint** `http://localhost:3001/api/v1/phonebook/update` - method (PATCH)

- Updates phonebook record

**Authorization: Bearer <jwt-token>**

**Payload**

```json
{
    "name": "Don Pedro",
    "email": "johndoe123@yahoo.com"
}
```

**Response format**

```json
{
    "error": false,
    "message": "Phonebook updated.",
    "data": "Phonebook updated succesfully."
}
```

### Fetch Phonebook

**Endpoint** `http://localhost:3001/api/v1/phonebook/fetch?page=1&perPage=2&sort=desc` - method (GET)

- Fetches phonebooks from the database based on the query passed

**Authorization: Bearer <jwt-token>**

**Response format**
```json
{
    "error": false,
    "message": "Phonebook Fetched Successfully.",
    "data": {
        "currentPage": 1,
        "pages": 1,
        "totalData": 2,
        "phoneBooks": [
            {
                "phone_numbers": [
                    {
                        "_id": "5fd95100ed74c34dbb361312",
                        "tag": "mobile",
                        "number": "34567890"
                    },
                    {
                        "_id": "5fd95100ed74c34dbb361313",
                        "tag": "home",
                        "number": "45678901"
                    },
                    {
                        "_id": "5fd95100ed74c34dbb361314",
                        "tag": "work",
                        "number": "56789012"
                    }
                ],
                "_id": "5fd95100ed74c34dbb361315",
                "user": "5fd950aeed74c34dbb361311",
                "name": "john doe",
                "email": "johndoe@gmail.com",
                "mailing_address": "Qubec, Canada."
            },
            {
                "phone_numbers": [
                    {
                        "_id": "5fd95179ed74c34dbb361316",
                        "tag": "mobile",
                        "number": "67890123"
                    },
                    {
                        "_id": "5fd95179ed74c34dbb361317",
                        "tag": "home",
                        "number": "78901234"
                    }
                ],
                "_id": "5fd95179ed74c34dbb361318",
                "user": "5fd950aeed74c34dbb361311",
                "name": "jane doe",
                "email": "janedoe@gmail.com",
                "mailing_address": "Qubec, Canada."
            }
        ]
    }
}
```

### Delete Phonebook

**Endpoint** `http://localhost:3001/api/v1/phonebook/delete/:id` - method (DELETE)

- Deletes a phonebook record from the database

**Authorization: Bearer <jwt-token>**

**Response format**

```json
{
    "error": false,
    "message": "Phonebook deleted."
}
```

### application/json

### Get postman collection link [here](https://www.getpostman.com/collections/f89d2c0060d63de96c1d)

## The Design Principles used are:
 - Single Responsibility Principle
 - Dependency Inversion Principle
 - DRY Principle
 - KISS Principle
 - YAGNI Principle

### Single Responsibility Principle:
```
I utilized this principle since it makes my code simpler to actualize and forestalls unforeseen side-effects of future changes (when I roll out an improvement in one class or capacity it will be reflected on all the various classes or capacities that relies upon it).
```

### Dependency Inversion Principle:
```
I utilized this principle since I need my 'top-level' objects to be entirely stable and not delicate for change.
```

### DRY Principle:
```
I utilized this principle to make my code more composed and simpler to keep up. And furthermore spare my time at whatever point I need to change something later on. 
```

### KISS Principle:
```
I utilized this principle to make it simpler for other software engineers to envision the different parts of the applications, intellectually planning the potential impacts of any change.
```

### YAGNI Principle:
```
I utilized this principle since it abstains from investing energy on features that may not be used and helps me avoid feature creep.
```

## ================ Trade Off ================
- I used rest API instead of graphQl API for this application  to reduce complexity since the application is a simple one  that is not likely to change over time.

- I used MongoDB because of its schema flexibility to allow more fields to be added if need be.

## ================ Side Note ================

I would have added more test cases to offer more code coverage if i hade more time