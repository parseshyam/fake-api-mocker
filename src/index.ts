
// const { schema, mockFakeAPI } = require("./schema");
export { schema, mockFakeAPI } from "./schema"
// EXAMPLE
// const { schema, mockFakeAPI } = require("./schema");
// const fakeSchema = {
//   id_array: schema.isUUID().rows(3).done(),
//   email_array: schema.isEmail({ isYopMail: true }).rows(1).done(),
//   timestamp_array: schema.isDate({ interval: 100000 }).rows(5).done(),
//   name: schema.isObject({
//     firstName: schema.isString().done(),
//     lastName: schema.isString().done()
//   }).rows(2).done(),
//   isPublished: schema.isBoolean().rows(10).done()
// };
// (async () => {
//   console.log("MOCKING API CALL");
//   const data = await mockFakeAPI(fakeSchema, 1000); // Schema and Resolve-Timeout (default 0);
//   console.log(JSON.stringify(data, null, 2))
//   console.log("MOCKING API SUCCESS")
// })();