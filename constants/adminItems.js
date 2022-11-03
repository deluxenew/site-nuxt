const propTypes = [
  { title: "Надпись", value: "string", type: String, defaultValue: "" },
  { title: "Число", value: "number", type: Number, defaultValue: 0 },
  { title: "Массив", value: "array", type: Array, defaultValue: [] },
  { title: "Объект", value: "object", type: Object, defaultValue: {} },
  { title: "Да/Нет", value: "boolean", type: Boolean, defaultValue: false },
  { title: "Дата", value: "date", type: Date, defaultValue: Date.now },
  {
    title: "Функция", value: "function", type: Function, defaultValue: () => {
    }
  },
]

const booleanVariants = [
  { title: "Да", value: "true", type: true },
  { title: "Нет", value: "false", type: false }
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
      ...propTypes.map((el) => {
        return {
          ...el,
          type: el.defaultValue
        }
      })
    ]
  },
  {
    title: "Индекс", value: "index", variants: [
      ...booleanVariants,
    ]
  },
  {
    title: "Ссылка на поле модели", value: "ref", variants: [
      {
        title: "Функция", value: "function", type: Function, defaultValue: () => {
        }
      },
      { title: "Надпись", value: "string", type: String, defaultValue: "" },
    ]
  },
  {
    title: "Иммутабельность", value: "immutable", variants: [
      ...booleanVariants
    ]
  },
  {
    title: "Выдавать в запросах поиска", value: "select", variants: [
      ...booleanVariants
    ]
  },

]

const componentNamesByType = {
  string: "UiInput",
  array: 'UiItems',
  number: "UiInputNumber",
  boolean: "UiCheckbox",
}

const getPropVariants = (v) => {
  const findProp = props.find(({ value }) => value === v)
  if (findProp) return findProp.variants
  return null
}

module.exports.props = [
  ...props
]

module.exports.propTypes = [
  ...propTypes
]

module.exports.getPropValue = (key, v) => {
  const findProp = props.find(({ value }) => value === key)
  if (findProp && findProp.variants) {
    const propValue = findProp.variants.find(({ value }) => value === v)
    if (propValue) return propValue.type
  }
  return null
}

module.exports.getPropVariants = (v) => getPropVariants(v)


module.exports.getComponentNameByFieldType = (type) => {
  return componentNamesByType[type]
}

module.exports.getDefaultFieldValue = (key, v) => {
  const findProp = props.find(({ value }) => value === key)
  if (findProp && findProp.variants) {
    return findProp.variants.find(({ value }) => value === v)
  }
}
