# fake-api-mocker

**fake-api-mocker** is Schema based fake API mocker with `TypeScript` ready. With this you can create any nested `complex schema` and generate `tons of fake data` as per as `specified schema` and can be used at `client side` as well as `server side`.

The declared Schema are just like `Yup` lib Schema.
## Supported Schema as of now.
- ```isString()``` for random strings.
- ```isEmail()``` for random emails.
- ```isImage({ width: 200, height: 400 })``` for random images urls.
- ```isDate({ interval: 100000 })```  for timestamps.
- ```isUUID()``` for random UUID's.
- ```isObject({ /* pass new schema*/ })``` for random nested objects.
- ```isBoolean()``` for random boolean values.
- ```rows(count = 10, chunks = 0)``` for generating number of rows in chunks.
 default `count` value is `10` and `chunks` value is `0`.
- ```done()``` Indicates schema termination.
It's necessary to terminate each individual schema with .done() in the end otherwise it'll throw an error.

## To be added.
- ```isText()``` for random large text like `Lorem ipsum`.
- ```isGeo()``` for random geo coordinates `lat-long` tuples.
- ```isPhone({ code:'+91' })``` for random phone numbers.
- ```isIP({ type:'v4' })```  for random `ipv4` and `ipv6`.
- ```isSlug()``` for random Slugs.
.. Above are just vaugely at the top of my head :-/
 Yet lot more to be added :-D



## Install

Install with npm:

```sh
npm i fake-api-mocker --save
```

Install with yarn:

```sh
yarn add fake-api-mocker
```
## Imports with CommonJS or ES5
```js
const { schema, mockFakeAPI } = require("fake-api-mocker");
or 
import { schema, mockFakeAPI } from "fake-api-mocker";
```

## Basic Example

###### index.js
```js
const { schema, mockFakeAPI } = require("fake-api-mocker");

// Remember to terminate each individual schema with .done() in the end otherwise it'll throw an error.
const fakeSchema = {
  id: schema.isUUID().done(),
  name: schema.isObject({
    firstName: schema.isString().done(),
    lastName: schema.isString().done(),
  }).done(),
  email: schema.isEmail().done(),
  avatar: schema.isImage({ height: 320, width: 240 }).done(),
  isActive: schema.isBoolean().done(),
  joinedOn: schema.isDate().done()
};

(async () => {
  try {
    const data = await mockFakeAPI(fakeSchema, 1000);
    console.log(data)
  } catch (e) {
    console.log(e.message)
  }
})();
```
###### index.js (output)
```json
{
  "id": "be43687f-f2de-4427-b87b-ac78013b61c6",
  "name": {
    "firstName": "rtanumnpzz",
    "lastName": "npqfvpcsp"
  },
  "email": "btugwtegavo@yopmail.com",
  "avatar": "https://picsum.photos/240/320",
  "isActive": true,
  "joinedOn": 1632231989950
}
```
## Complex Nested Type.

1. For nested object you can simply nest it by chaining `.isObject()` which will accept a object `schema` as a argument 
for exapmle consider `name` has nested keys named `firstName` and `lastName`.

- For below JSON:-
```json
{
  "name": {
    "firstName": "rhzophn",
    "lastName": "huoljh"
  }
}
```

Schema will look like:-
###### index.js
```js
const { schema, mockFakeAPI } = require("fake-api-mocker");

// Remember to terminate each individual schema with .done() in the end otherwise it'll throw an error.
const fakeSchema = {
  name: schema.isObject({
    firstName: schema.isString().done(),
    lastName: schema.isString().done(),
  }).done(),
};
(async () => {
  try {
    const data = await mockFakeAPI(fakeSchema, 1000);
    console.log(data)
  } catch (e) {
    console.log(e.message)
  }
})()
```
 2. Consider the above same example but insted of having a single object you want array of objects. This is where the ```.rows()``` shines.
 `.rows(count = 10, chunks = 0)`  it takes `count` as it's 1st argument to populate that amount of objects inside an array. And an optional `chunks` as 2nd argument to populate data in chunks.
For instance:-
- `schema.isBoolean().rows(5)` will generate data as `[ true, false, true, false, false ]`
- `schema.isBoolean().rows(5, 2)` will generate data as `[ [ false, false ], [ true, true ], [ false ] ]`

For below JSON:-
```json
{
  "name": [
    {
      "firstName": "yuiywbl",
      "lastName": "pobgq"
    },
    {
      "firstName": "zpoiqifn",
      "lastName": "dassl"
    }
  ]
}
```

Schema will look like:-
###### index.js
```js
const { schema, mockFakeAPI } = require("fake-api-mocker");

// Remember to terminate each individual schema with .done() in the end otherwise it'll throw an error.
const fakeSchema = {
  name: schema.isObject({
    firstName: schema.isString().done(),
    lastName: schema.isString().done(),
  }).rows(2).done(), // Added .rows(2) will generate 2 object in an array
};

(async () => {
  const data = await mockFakeAPI(fakeSchema, 1000);
  console.log(data);
})()
```

3. For primitive types i.e `String, Boolean, Number`. Let's say you want array of `emails` or `timestamps` or `uuids`

For below JSON:-
```json
{
  "id_array": [
    "a2c3909b-5292-45cc-8a08-e0352b912955",
    "012659c5-0ae9-450c-b5b0-2bc9bd299271",
    "78e34b9c-0d14-4114-903d-6ebae1f168d3"
  ],
  "email_array": [
    "qcluwaose@yopmail.com"
  ],
  "timestamp_array": [
    1631479167348,
    1631479267348,
    1631479367348,
    1631479467348,
    1631479567348
  ]
}
```

Schema will look like:-
###### index.js
```js
const { schema, mockFakeAPI } = require("fake-api-mocker");

// Remember to terminate each individual schema with .done() in the end otherwise it'll throw an error.
const fakeSchema = {
  id_array: schema.isUUID().rows(3).done(),
  email_array: schema.isEmail({ isYopMail: true }).rows(1).done(),
  timestamp_array: schema.isDate({ interval: 100000 }).rows(5).done()
};

(async () => {
  const data = await mockFakeAPI(fakeSchema, 1000);
  console.log(JSON.stringify(data, null, 2))
})()
```