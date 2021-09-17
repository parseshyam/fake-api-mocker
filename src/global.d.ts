
export type ISchemaType =
  'isString' |
  'isImage' |
  'isDate' |
  'isUUID' |
  'isObject' |
  'isEmail'

export type IStringifiedSchema = { [key: string]: string }

export type IOutResult =
  string |
  number |
  string[] |
  number[] |
  { [x: string]: string; }[] |
  { [x: string]: string; }

export type IParsedSchema = {
  type: ISchemaType
  min?: number;
  max?: number;
  rows?: number;
  schema?: IStringifiedSchema,

  // Image params
  width?: number;
  height?: number;
  // Email params
  isYopMail?: boolean

  // Date params
  interval?: number
}