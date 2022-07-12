const propTypes = [
  { title: "Надпись", value: "string", type: String },
  { title: "Число", value: "number", type: Number },
  { title: "Массив", value: "array", type: Array },
  { title: "Объект", value: "object", type: Object },
  { title: "Да/Нет", value: "boolean", type: Boolean },
]

module.exports.propTypes = [
  ...propTypes
]

module.exports.getPropType = (v) => {
  const findProp = propTypes.find(({value}) => value === v)
  if (findProp) return findProp.type
  return null
}
