import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer'

function PaperPDFTRON({ url }) {
  const viewer = useRef(null)
  useEffect(() => {
    WebViewer(
      {
        // path: 'lib',
        initialDoc: url,
      },
      viewer.current
    ).then((instance) => {
      const { docViewer } = instance
      // you can now call WebViewer APIs here...
    })
  }, [])
  return (
    <div className="webviewer" ref={viewer} style={{ height: '100vh' }}></div>
  )
}

export default PaperPDFTRON
