const requestbody = (definition, datas) => {
  const {
    text,
    title,
    description,
    place,
    date,
    alias,
    file,
    month,
    entity,
  } = datas

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
    case 'activity':
      return {
        title: title,
        text: text,
        entity: entity,
      }

    default:
      return {}
  }
}

export default requestbody
