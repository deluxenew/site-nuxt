const propTypes = [
  { title: "Надпись", value: "string", type: String },
  { title: "Число", value: "number", type: Number },
  { title: "Массив", value: "array", type: Array },
  { title: "Объект", value: "object", type: Object },
  { title: "Да/Нет", value: "boolean", type: Boolean },
  { title: "Дата", value: "date", type: Date },
]

const booleanVariants = [
  { title: "Да", value: "true", type: true },
  { title: "Нет", value: "false", type: false }
]

const defaultVariants = [
  { title: "Текущая дата", value: "dateNow", type: Date.now },
  { title: "Функция", value: "function", type: () => {} },
  { title: "Пустой объект", value: "object", type: () => {} },
  { title: "Пустой массив", value: "array", type: () => [] },
  { title: "Пустая строка", value: "string", type: "" },
  { title: "Число 0", value: "number", type: 0 },
]

const props = [
  {
    title: "Тип", value: "type", variants: [
      ...propTypes
    ]
  },
  {
    title: "Уникально", value: "unique", variants: [
      ...booleanVariants
    ]
  },
  {
    title: "Обязательно", value: "required", variants: [
      ...booleanVariants
    ]
  },
  {
    title: "По умолчанию", value: "default", variants: [
      ...defaultVariants
    ]
  }
]

module.exports.props = [
  ...props
]

module.exports.propTypes = [
  ...propTypes
]

module.exports.getPropValue = (key, v) => {
  const findProp = props.find(({value}) => value === key)
  if (findProp && findProp.variants) {
    const propValue = findProp.variants.find(({ value }) => value === v)
    if (propValue) return propValue.type
  }
  return null
}

module.exports.getPropVariants = (v) => {
  const findProp = props.find(({value}) => value === v)
  if (findProp) return findProp.variants
  return null
}
