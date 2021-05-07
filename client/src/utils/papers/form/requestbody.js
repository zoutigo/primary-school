import convertBase64 from '../../convertBase64'

const requestbody = async (definition, datas, type = null) => {
  const {
    text,
    title,
    description,
    place,
    date,
    alias,
    file,
    month,
    startdate,
    enddate,
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
      if (type === 'newsletter') {
        return {
          file: await convertBase64(file[0]),
          startdate: startdate.valueOf(),
        }
      }
      if (type === 'menu') {
        return {
          file: await convertBase64(file[0]),
          startdate: startdate.valueOf(),
          enddate: enddate.valueOf(),
        }
      }

      return {
        file: file[0],
        // month: month.valueOf(),
      }
    case 'activites':
      return {
        title: title,
        text: text,
      }

    default:
  }
}

export default requestbody
