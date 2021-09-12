const { generateRandomData } = require("./generator");
function Schema() { };

Schema.prototype.isString = function () {
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    type: "isString"
  })
}
Schema.prototype.isDate = function ({ interval } = { interval: 0 }) {
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    type: "isDate",
    interval
  })
}
Schema.prototype.isUUID = function () {
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    type: "isUUID",
  })
}
Schema.prototype.isEmail = function ({ isYopMail } = { isYopMail: true }) {
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    type: "isEmail",
    isYopMail
  })
}
Schema.prototype.isImage = function ({ width, height } = { width: 200, height: 300 }) {
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    type: "isImage",
    height,
    width
  })
}
Schema.prototype.isObject = function (schema) {
  if (typeof schema !== "object")
    throw new Error("Schema supposed to be an object")
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    type: "isObject",
    schema: schema
  })
}
Schema.prototype.len = function (len = 10) {
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    len
  })
}
Schema.prototype.rows = function (rows = 10) {
  return Object.assign(new Schema(), this, {
    ...(this && this.schema),
    rows,
  })
}
Schema.prototype.done = function () {
  return JSON.stringify(this)
}
const schema = new Schema();

const mockFakeAPI = (schema, timeout = 0) => {
  const tempObject = {};
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        for (const [key, value] of Object.entries(schema)) {
          tempObject[key] = generateRandomData(value)
        }
        resolve(tempObject);
      } catch (error) {
        reject(error)
      }
    }, timeout);
  })
}

module.exports = { schema, mockFakeAPI }