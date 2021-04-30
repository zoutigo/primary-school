import { Grid, makeStyles, styled } from '@material-ui/core'
import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import './documentStyle.css'

const useStyles = makeStyles(() => ({
  document: {
    width: '1400px',
  },
}))

const StyledGrid = styled(Grid)(() => ({
  boxSizing: 'border-box',

  '& :first-child': {},
}))

function PdfDocument(url) {
  const classes = useStyles()
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
    /* To Prevent right click on screen */
    // document.addEventListener('contextmenu', (event) => {
    //   event.preventDefault()
    // })

    // return () => {
    //   /*To Prevent right click on screen*/
    //   document.removeEventListener('contextmenu', (event) => {
    //     event.preventDefault()
    //   })
    // }
  }, [])

  function onDocumentLoadSuccess() {
    setNumPages(numPages)
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  return (
    <StyledGrid>
      <Document
        file={url}
        width="100vw"
        className="document"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
    </StyledGrid>

    // {/* <p>
    //   Page {pageNumber} of {numPages}
    // </p> */}
  )
}

export default PdfDocument
