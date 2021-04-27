import { Grid } from '@material-ui/core'
// import PaperPDF from './PaperPDF'
// import PaperPDFViewer from './PaperPDFViewer'

// import PaperPdfFrame from './PaperPdfFrame'
// import PaperPdfView from './PaperPdfView'
import { styled } from '@material-ui/styles'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import PaperPDFTRON from './PaperPDFTRON'

const StyledPaperBody = styled(Grid)(({ theme, bgcolor }) => ({
  minWidth: '100%',
  padding: '1rem !important',
}))

function PaperBody({ item, def }) {
  const { text, url } = item

  const textcontent = ReactHtmlParser(text) || "il n'y a pas plus de détails"
  return (
    <StyledPaperBody item container id="paper-body">
      <Grid item> {textcontent}</Grid>
      {def === 'file' && (
        <Grid item container>
          <PaperPDFTRON url={url} />
        </Grid>
      )}
    </StyledPaperBody>
  )
}

export default PaperBody
