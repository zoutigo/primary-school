import convertBase64 from '../../convertBase64'

const requestbody = async (definition, datas, type = null) => {
  const {
    text,
    title,
    description,
    place,
    date,
    file,
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
          type: type,
        }
      }
      if (type === 'menu') {
        return {
          file: await convertBase64(file[0]),
          startdate: startdate.valueOf(),
          enddate: enddate.valueOf(),
          type: type,
        }
      }
      if (type === 'breve') {
        return {
          file: await convertBase64(file[0]),
          startdate: startdate.valueOf(),
          enddate: enddate.valueOf(),
          type: type,
        }
      }

      return {
        file: file[0],
        // month: month.valueOf(),
      }
    case 'activites':
      console.log('def:', definition)
      return {
        title: title,
        text: text,
      }

    default:
  }
}

export default requestbody
