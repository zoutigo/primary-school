export const dateToTimeStamp = (date) => {
  // const myDate = date.split('-')
  // const newDate = new Date(myDate[2], myDate[1] - 1, myDate[0])

  const newDate = new Date(date).getTime()
  return newDate
}

export const timestampTodate = (date) => {
  const unixdate = date
  const newdate = new Date(date * 1000)
}
