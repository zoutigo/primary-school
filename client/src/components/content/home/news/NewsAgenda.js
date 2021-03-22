import React from 'react'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import DateRangeIcon from '@material-ui/icons/DateRange'

function NewsAgenda() {
  const cardTitle = 'Agenda à venir'

  const items = [
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
