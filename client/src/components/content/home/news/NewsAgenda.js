import React from 'react'
import moment from 'moment'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { apiFetchEvents } from '../../../../utils/api'
import { useQuery } from 'react-query'

function NewsAgenda() {
  const cardTitle = 'Agenda à venir'

  const queryKey = ['events']
  const queryParams = ''

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    queryKey,
    () => apiFetchEvents(queryParams)
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!Array.isArray(data)) {
    return null
  }

  const items = []

  if (data) {
    for (let i = 0; i < 3; i++) {
      let { place, date, title } = data[i]
      let dateString = moment(date).format('DD/MM/YYYY')
      items.push(<CardItem title={title} detail={`${place} - ${dateString}`} />)
    }
  }

  const itemse = [
    <CardItem
      title={'Conseil de Classe'}
      detail={'Saint Augustin - 01 Avril 2021'}
    />,
    <CardItem
      title={'Cross departemental'}
      detail={'Cremieu - 12 Avril 2021'}
    />,
    <CardItem
      title={'Messe de paques'}
      detail={'Paroisse Saint Martin - 18 Avril 2021'}
    />,
  ]
  return (
    <NewsCard cardTitle={cardTitle} items={items} recipe={<DateRangeIcon />} />
  )
}

export default NewsAgenda
