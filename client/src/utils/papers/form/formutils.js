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
      console.log('file:', file)
      console.log('file0:', file[0])
      return {
        file: file[0],
        month: month.valueOf(),
      }
      break

    default:
      return {}
  }
}
