import React from 'react'
import { makeStyles } from '@material-ui/styles'
import TabPanelItem from './TabPanelItem'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}))

function TabPanelContent(props) {
  const { tab } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {papers.map((paper, index) => {
        return <TabPanelItem paper={paper} key={index} />
      })}
    </div>
  )
}

export default TabPanelContent

const papers = [
  {
    authorFirstname: 'Pierre',
    authorName: 'Moussel',
    createdAt: '14/06/2020 à 20h30',
    title: 'les 12 coups de midi à Cremieu',
    page: 'infrastructures',
    type: 'articles',
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    authorFirstname: 'Jacques',
    authorName: 'Norman',
    createdAt: '18/04/2020 à 11h25',
    title: 'Le fete des rois mages',
    page: 'pastorale',
    type: 'news',
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
]
