import React, { useState, useRef } from 'react'
import { usePdf } from '@mikecousins/react-pdf'
import { styled } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const StyledGrid = styled(Grid)(() => ({
  '& canvas': {
    width: '92% !important',
    height: '100% !important',
  },
}))

const MikePdf = ({ url }) => {
  const [page, setPage] = useState(1)
  const canvasRef = useRef(null)

  const { pdfDocument, pdfPage } = usePdf({
    file: url,
    page,
    canvasRef,
  })

  return (
    <StyledGrid item container>
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul className="pager">
            <li className="previous">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </li>
            <li className="next">
              <button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </StyledGrid>
  )
}

export default MikePdf
