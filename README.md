# fake-api-mocker

`fake-api-mocker` is Schema based fake API mocker.
## Install

Install with npm:

```sh
npm i fake-api-mocker --save
```

Install with yarn:

```sh
yarn add fake-api-mocker
```

## Example

Here is a basic example in use.

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
};

(async () => {
  const data = await mockFakeAPI(fakeSchema, 1000);
  console.log(data)
})()
```
```json
{
  "id": "f63cfe33-5c78-4be5-b943-9b5d6882e90a",
  "name": {
    "firstName": "oucqne",
    "lastName": "iopdlvi"
  },
  "email": "ibwvovq@yopmail.com",
  "avatar": "https://picsum.photos/240/320"
}
```
# Nested Schema [ Object or Array of [Objects or Primitive Types]  ]

1. For nested object you can simply nest it by chaining `.isObject()` which will accept a object schema as a parameter 
for exapmle consider `name` has `firstName` and `lastName` as nested fields.

For below json:-
```json
{
  "name": {
    "firstName": "rhzophn",
    "lastName": "huoljh"
  }
}
```

Schema will look like:-
```js
const { schema, mockFakeAPI } = require("fake-api-mocker");

// Remember to terminate each individual schema with .done() in the end otherwise it'll throw an error.
const fakeNestedSchema = {
  name: schema.isObject({
    firstName: schema.isString().done(),
    lastName: schema.isString().done(),
  }).done(),
};
(async () => {
  const data = await mockFakeAPI(fakeNestedSchema, 1000);
  console.log(JSON.stringify(data, null, 2))
})()
```
2. Consider the above same exapmle, but insted of having single object you want array of object. This can be achieved by specifying `.rows(10)` it takes number as an argument to populate that amount of objects inside array.

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
  console.log(JSON.stringify(data, null, 2))
})()
```

3. For primitive types. Lets say you want array of emails or timestamps or uuids

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