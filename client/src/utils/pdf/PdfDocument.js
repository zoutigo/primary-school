import { Grid, makeStyles, styled } from "@material-ui/core";
import React , {useState} from "react";
import { Document, Page , pdfjs} from "react-pdf";
const pdfjsVersion = "2.0.305";

const useStyles = makeStyles(()=>({
    document:{
        width:'1400px'
    }
}))

const StyledGrid = styled(Grid)(()=>({
    '& .react-pdf__Page__canvas ':{
        margin: "0 auto",
        width: "100% !important",
       
    }
   
}))


function PdfDocument(url) {
    const classes = useStyles()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    React.useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
        /*To Prevent right click on screen*/
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

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
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

    //   const link = "https://saint-augustin-public.s3.eu-west-3.amazonaws.com/1617623144148_decembre2020.pdf"
   
    return (
       <StyledGrid>

        <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        heigth="400px"
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
