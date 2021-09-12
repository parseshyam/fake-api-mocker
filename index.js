const { schema, mockFakeAPI } = require("./schema");

// EXAMPLE 
const fakeSchema = {
  id_array: schema.isUUID().rows(3).done(),
  email_array: schema.isEmail({ isYopMail: true }).rows(1).done(),
  timestamp_array: schema.isDate({ interval: 100000 }).rows(5).done()
};


(async () => {
  console.log("MOCKING API CALL");
  const data = await mockFakeAPI(fakeSchema, 1000);
  console.log(JSON.stringify(data, null, 2))
  console.log("MOCKING API SUCCESS")
})()