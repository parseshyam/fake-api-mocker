const { schema, mockFakeAPI } = require("./schema");

// EXAMPLE 
const fakeSchema = {
  name: schema.isObject({
    firstName: schema.isEmail().done(),
    lastName: schema.isString().done(),
    uuid: schema.isUUID().done(),
    valie: schema.isObject({
      email: schema.isEmail().done(),
    }).rows(1).done()
  }).done(),
  image: schema.isObject({
    images: schema.isImage().rows(2).done(),
    name: schema.isDate().done(),
  }).done()
};


(async () => {
  console.log("MOCKING API CALL");
  const data = await mockFakeAPI(fakeSchema, 1000);
  console.log(data)
  console.log("MOCKING API SUCCESS")
})()