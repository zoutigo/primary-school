export const requestbody = (definition, datas) => {
  const { text, title, description, place, date, alias, file, month } = datas

  switch (definition) {
    case 'events':
      return {
        title: title,
        description: description,
        date: date.valueOf(),
        place: place,
        text: text,
      }
      break
    case 'page':
      return {
        text: text,
      }
      break
    case 'file':
      return {
        file: file,
        month: month,
      }
      break

    default:
      return {}
  }
}
