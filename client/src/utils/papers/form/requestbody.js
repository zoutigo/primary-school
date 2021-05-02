const requestbody = (definition, datas) => {
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
    case 'page':
      return {
        text: text,
      }
    case 'file':
      return {
        file: file[0],
        month: month.valueOf(),
      }
    case 'activites':
      return {
        title: title,
        text: text,
      }

    default:
      return {}
  }
}

export default requestbody
