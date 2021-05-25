import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/styles'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import PdfDocument from '../../pdf/PdfDocument'

const StyledPaperBody = styled(Grid)(() => ({
  minWidth: '100%',
  padding: '1rem !important',
}))

const StyledDocumentContainer = styled(Grid)(() => ({
  minHeight: '100vh',
  padding: '0px',
}))

function PaperBody({ item: { text, file }, def }) {
  const textcontent = ReactHtmlParser(text) || "il n'y a pas plus de détails"

  const [showPdf, setShowPdf] = React.useState(false)

  React.useEffect(() => {
    setShowPdf(true)
    return () => {
      setShowPdf(false)
    }
  })

  return (
    <StyledPaperBody item container id="paper-body">
      <Grid item>{textcontent}</Grid>
      {def === 'file' && (
        <StyledDocumentContainer item container justify="center">
          {/* <StyledDocument url={url} /> */}
          {showPdf && <PdfDocument file={file} />}
          {/* <MyPdfViewer url={url} /> */}
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
    url: PropTypes.string,
    file: PropTypes.string.isRequired,
  }),
}

export default PaperBody
