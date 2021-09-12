const generateRandomData = (stringObj) => {
  if (!JSON.parse(stringObj)) throw new Error("Error while parsing schema")
  const {
    // General params
    type,
    min,
    max,
    rows,
    schema = {},

    // Image params
    width = 200,
    height = 300,
    // Email params
    isYopMail = true,

    // Date params
    interval = 0,
  } = JSON.parse(stringObj);
  switch (type) {
    case 'isString':
      if (rows && rows > 0) {
        const arr = []
        for (let index = 0; index < rows; index++) {
          arr.push(Math.random().toString(36).replace(/[^a-z]+/g, ''));
        }
        return arr;
      } else {
        return Math.random().toString(36).replace(/[^a-z]+/g, '')
      }
    case 'isEmail':
      if (rows && rows > 0 && isYopMail) {
        const array = []
        for (let index = 0; index < rows; index++) {
          array.push(Math.random().toString(36).replace(/[^a-z]+/g, '') + '@yopmail.com');
        }
        return array
      } else {
        return Math.random().toString(36).replace(/[^a-z]+/g, '') + '@yopmail.com';
      }
    case 'isImage':
      if (rows && rows > 0) {
        const array = []
        for (let index = 0; index < rows; index++) {
          array.push(`https://picsum.photos/${width}/${height}`);
        }
        return array;
      } else {
        return `https://picsum.photos/${width}/${height}`;
      }
    case 'isDate':
      if (rows && rows > 0) {
        const array = []
        let date = Date.now()
        for (let index = 0; index < rows; index++) {
          date = date + interval;
          array.push(date);
        }
        return array;
      } else {
        return Date.now() + interval;
      }
    case 'isUUID':
      function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      if (rows && rows > 0) {
        const array = []
        for (let index = 0; index < rows; index++) {
          array.push(uuidv4());
        }
        return array;
      } else {
        return uuidv4();
      }
    case 'isObject':
      const array = [];
      const obj = {};
      if (rows && rows > 0) {
        for (let index = 0; index < rows; index++) {
          for (const [key, value] of Object.entries(schema)) {
            const schema = JSON.parse(value);
            obj[key] = generateRandomData(JSON.stringify(schema));
          }
          array.push({ ...obj });
        }
        return array;
      } else {
        for (const [key, value] of Object.entries(schema)) {
          const schema = JSON.parse(value);
          obj[key] = generateRandomData(JSON.stringify(schema));
        }
        return { ...obj };
      }
    default:
      break;
  }
}
module.exports = { generateRandomData }