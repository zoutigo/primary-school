import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { makeStyles } from '@material-ui/core'
import { tinyMceColors } from '../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'whitesmoke',
    '& .mce-fullscreen': {
      zIndex: '2000',
    },
  },
}))

function PageEditor({ onChange, value }) {
  const classes = useStyles()
  const handleEditorChange = (editor) => onChange(editor)
  return (
    <div className={classes.root}>
      <Editor
        value={value}
        onEditorChange={handleEditorChange}
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        cloudChannel="dev"
        init={{
          branding: false,
          selector: 'textarea',
          forced_root_block: 'div',
          browser_spellcheck: true,
          textcolor_cols: '5',
          textcolor_rows: '4',
          textcolor_map: tinyMceColors,
          images_upload_url:
            'https://ecole-saint-augustin.herokuapp.com/images/page',
          height: 800,
          plugins:
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap  emoticons',
          toolbar:
            'undo redo | bold italic underline strikethrough | forecolor backcolor fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_sticky: true,
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:18px ; z-index:1000 }',
          image_class_list: [{ title: 'Responsive', value: 'img-responsive' }],
        }}
      />
    </div>
  )
}

export default PageEditor
