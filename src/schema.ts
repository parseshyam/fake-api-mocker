import { generateRandomData } from "./generator";

class Schema {
  schema = {}
  rows(rows = 10) {
    return Object.assign(new Schema(), this, {
      ...(this && this.schema),
      rows,
    })
  }
  isString() {
    return Object.assign(new Schema(), this, {
      ...(this && this.schema),
      type: "isString"
    })
  }
  isImage({ width, height } = { width: 200, height: 300 }) {
    return Object.assign(new Schema(), this, {
      ...(this && this.schema),
      type: "isImage",
      height,
      width
    })
  }
  isDate({ interval } = { interval: 0 }) {
    return Object.assign(new Schema(), this, {
      ...(this && this.schema),
      type: "isDate",
      interval
    })
  }
  isUUID() {
    return Object.assign(new Schema(), this, {
      ...(this && this.schema),
      type: "isUUID",
    })
  }
  isObject(schema: object) {
    if (typeof schema !== "object")
      throw new Error("Schema supposed to be an object")
    return Object.assign(new Schema(), this, {
      ...(this && this.schema),
      type: "isObject",
      schema: schema
    })
  }
  isEmail({ isYopMail } = { isYopMail: true }) {
    return Object.assign(new Schema(), this, {
      ...(this && this.schema),
      type: "isEmail",
      isYopMail
    })
  }
  done() {
    return JSON.stringify(this)
  }
}

export const schema = new Schema();

export const mockFakeAPI = (schema: { [key: string]: string }, timeout = 0) => {
  const tempObject = {} as any;
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
