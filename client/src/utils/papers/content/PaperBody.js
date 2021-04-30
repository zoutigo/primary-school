import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
// import PaperPDF from './PaperPDF'

// import PaperPdfFrame from './PaperPdfFrame'

import { styled } from '@material-ui/styles'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import MyPdfViewer from '../../pdf/MyPdfViewer'
import PdfDocument from '../../pdf/PdfDocument'
import PaperPDFTRON from './PaperPDFTRON'
import MikePdf from '../../pdf/MikePdf'

const StyledPaperBody = styled(Grid)(() => ({
  minWidth: '100%',
  padding: '1rem !important',
}))

const StyledDocumentContainer = styled(Grid)(() => ({
  background: 'green',
  position: 'relative',
  minHeight: '100vh',
  padding: '0px',
}))

const StyledDocument = styled(PdfDocument)(() => ({
  minWidth: '100% !important',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}))

function PaperBody({ item: { text, url }, def }) {
  const textcontent = ReactHtmlParser(text) || "il n'y a pas plus de détails"
  return (
    <StyledPaperBody item container id="paper-body">
      <Grid item>{textcontent}</Grid>
      {def === 'file' && (
        <StyledDocumentContainer item container justify="center">
          <MikePdf url={url} style={{ marginTop: '10em !important' }} />
          {/* <StyledDocument url={url} /> */}
          {/* <PdfDocument url={url} /> */}
          {/* <MyPdfViewer url={url} /> */}
          {/* <PaperPDFTRON url={url} /> */}
        </StyledDocumentContainer>
      )}
    </StyledPaperBody>
  )
}

PaperBody.defaultProps = {
  item: {
    text: null,
    url: null,
  },
}
PaperBody.propTypes = {
  def: PropTypes.string.isRequired,
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default PaperBody
