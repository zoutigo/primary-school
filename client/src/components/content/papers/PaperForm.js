import React from 'react'
// import Editor from '../../../../src/ckeditor5/build/ckeditor'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'

import { makeStyles } from '@material-ui/styles'
import TitlePanel from '../../../utils/TitlePanel'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '0px auto',
  },
  titleBackground: {
    background: 'orange',
  },
}))
function PaperForm() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <TitlePanel
        title={`Publier une nouvelle actualité`}
        background={classes.titleBackground}
      />
      {/* 
      <Editor
        editor={Editor}
        config={{
          plugins: [],
          image: {
            toolbar: [
              'imageStyle:full',
              'imageStyle:side',
              '|',
              'imageTextAlternative',
            ],

            // The default value.
            styles: ['full', 'side'],
          },
        }}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor)
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor)
        }}
      /> */}
    </div>
  )
}

export default PaperForm
