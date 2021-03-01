import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

function PageEditor({ onChange, value }) {
  const handleEditorChange = (editor) => onChange(editor)
  return (
    <div>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        cloudChannel="dev"
        init={{
          selector: 'textarea#image-tools',
          images_upload_url:
            'https://ecole-saint-augustin.herokuapp.com/images/page',
          height: 500,
          plugins:
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          toolbar:
            'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        }}
        value={value}
        onEditorChange={handleEditorChange}
      />
    </div>
  )
}

export default PageEditor

// import { Editor } from '@tinymce/tinymce-react'
// import React from 'react'

// const PageEditor = React.forwardRef(({ handleChangeEditor, ...rest }, ref) => {
//   return (
//     <Editor
//       apiKey={process.env.REACT_APP_TINYMCE_KEY}
//       {...rest}
//       ref={ref}
//       init={{
//         selector: 'textarea',
//         height: 500,
//         menubar: false,
//       }}
//       onEditorChange={handleChangeEditor}
//     />
//   )
// })

// export default PageEditor
