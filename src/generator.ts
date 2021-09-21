import { IStringifiedSchema, IParsedSchema } from './global';
export const generateRandomData = (key: string, stringifySchema: string,) => {
  if (typeof stringifySchema !== "string") {
    throw new Error(`Error while parsing schema for key named => ${key} \nDid you forgot to append .done() at the end ? `)
  }
  const {
    // General params
    type,
    rows,
    chunks = 0,
    schema = {} as IStringifiedSchema,

    // Image params
    width = 200,
    height = 300,

    // Date params
    interval = 0,
  }: IParsedSchema = JSON.parse(stringifySchema);
  switch (type) {
    case 'isString':
      if (rows && rows > 0) {
        const array = [];
        let chunkArray = [];
        let split = 0;
        if (rows && chunks && rows >= chunks) {
          split = chunks;
        }
        for (let index = 0; index < rows; index++) {
          if (!split) {
            array.push(Math.random().toString(36).replace(/[^a-z]+/g, ''));
            continue;
          }
          if (chunkArray.length === split) {
            array.push(chunkArray);
            chunkArray = [];
            chunkArray.push(Math.random().toString(36).replace(/[^a-z]+/g, ''))
          } else {
            chunkArray.push(Math.random().toString(36).replace(/[^a-z]+/g, ''))
          }
        }
        chunkArray.length && array.push(chunkArray);
        return array;
      } else {
        return Math.random().toString(36).replace(/[^a-z]+/g, '')
      }
    case 'isEmail':
      if (rows && rows > 0) {
        const array = [];
        let chunkArray = [];
        let split = 0;
        if (rows && chunks && rows >= chunks) {
          split = chunks;
        }
        for (let index = 0; index < rows; index++) {
          if (!split) {
            array.push(Math.random().toString(36).replace(/[^a-z]+/g, '') + '@yopmail.com');
            continue;
          }
          if (chunkArray.length === split) {
            array.push(chunkArray);
            chunkArray = [];
            chunkArray.push(Math.random().toString(36).replace(/[^a-z]+/g, '') + '@yopmail.com')
          } else {
            chunkArray.push(Math.random().toString(36).replace(/[^a-z]+/g, '') + '@yopmail.com')
          }
        }
        chunkArray.length && array.push(chunkArray);
        return array;
      } else {
        return Math.random().toString(36).replace(/[^a-z]+/g, '') + '@yopmail.com';
      }
    case 'isImage':
      if (rows && rows > 0) {
        const array = [];
        let chunkArray = [];
        let split = 0;
        if (rows && chunks && rows >= chunks) {
          split = chunks;
        }
        for (let index = 0; index < rows; index++) {
          if (!split) {
            array.push(`https://picsum.photos/${width}/${height}`);
            continue;
          }
          if (chunkArray.length === split) {
            array.push(chunkArray);
            chunkArray = [];
            chunkArray.push(`https://picsum.photos/${width}/${height}`)
          } else {
            chunkArray.push(`https://picsum.photos/${width}/${height}`)
          }
        }
        chunkArray.length && array.push(chunkArray);
        return array;
      } else {
        return `https://picsum.photos/${width}/${height}`;
      }
    case 'isDate':
      if (rows && rows > 0) {
        const array = [];
        let chunkArray = [];
        let date = Date.now()
        let split = 0;
        if (rows && chunks && rows >= chunks) {
          split = chunks;
        }
        for (let index = 0; index < rows; index++) {
          if (!split) {
            date = date + interval;
            array.push(date);
            continue;
          }
          if (chunkArray.length === split) {
            array.push(chunkArray);
            chunkArray = [];
            date = date + interval;
            chunkArray.push(date)
          } else {
            date = date + interval;
            chunkArray.push(date)
          }
        }
        chunkArray.length && array.push(chunkArray);
        return array;
      } else {
        return Date.now() + interval;
      }
    case 'isBoolean':
      if (rows && rows > 0) {
        const array = [];
        let chunkArray = [];
        let split = 0;
        if (rows && chunks && rows >= chunks) {
          split = chunks;
        }
        for (let index = 0; index < rows; index++) {
          if (!split) {
            array.push(Math.random() < 0.5);
            continue;
          }
          if (chunkArray.length === split) {
            array.push(chunkArray);
            chunkArray = [];
            chunkArray.push(Math.random() < 0.5)
          } else {
            chunkArray.push(Math.random() < 0.5)
          }
        }
        chunkArray.length && array.push(chunkArray);
        return array;
      } else {
        return Math.random() < 0.5;
      }
    case 'isUUID':
      const uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      if (rows && rows > 0) {
        const array = [];
        let chunkArray = [];
        let split = 0;
        if (rows && chunks && rows >= chunks) {
          split = chunks;
        }
        for (let index = 0; index < rows; index++) {
          if (!split) {
            array.push(uuidv4());
            continue;
          }
          if (chunkArray.length === split) {
            array.push(chunkArray);
            chunkArray = [];
            chunkArray.push(uuidv4())
          } else {
            chunkArray.push(uuidv4())
          }
        }
        chunkArray.length && array.push(chunkArray);
        return array;
      } else {
        return uuidv4();
      }
    case 'isObject':
      const obj = {} as { [key: string]: any };
      if (rows && rows > 0) {
        const array = [];
        let chunkArray = [];
        let split = 0;
        if (rows && chunks && rows >= chunks) {
          split = chunks;
        }
        for (let index = 0; index < rows; index++) {
          if (!split) {
            for (const [key, value] of Object.entries(schema)) {
              obj[key] = generateRandomData(key, value);
            }
            array.push({ ...obj });
            continue;
          }
          if (chunkArray.length === split) {
            array.push(chunkArray);
            chunkArray = [];
            for (const [key, value] of Object.entries(schema)) {
              obj[key] = generateRandomData(key, value);
            }
            chunkArray.push({ ...obj });
            continue;
          } else {
            for (const [key, value] of Object.entries(schema)) {
              obj[key] = generateRandomData(key, value);
            }
            chunkArray.push({ ...obj });
            continue;
          }
        }
        chunkArray.length && array.push(chunkArray);
        return array;
      } else {
        for (const [key, value] of Object.entries(schema)) {
          obj[key] = generateRandomData(key, value);
        }
        return { ...obj };
      }
  }
}
