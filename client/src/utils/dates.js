export const dateToTimeStamp = (date) => {
  // const myDate = date.split('-')
  // const newDate = new Date(myDate[2], myDate[1] - 1, myDate[0])

  const newDate = new Date(date).getTime()
  return newDate
}
