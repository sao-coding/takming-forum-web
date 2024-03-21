"use client"

import { cn } from "@/lib/utils"
import { IconLoader2 } from "@tabler/icons-react"
import { EditorContent, type EditorEvents, type EditorOptions, useEditor } from "@tiptap/react"

import { extensions } from "./extensions"
import Toolbar from "./toolbar"

// import "@/assets/css/editor.css"

type EditorProps = {
  options?: Partial<EditorOptions>
  onChange?: (editor: EditorEvents["update"]["editor"]) => void
  className?: string
}

const Editor = (props: EditorProps) => {
  const { options, onChange, className } = props

  const editor = useEditor({
    extensions,

    editorProps: {
      attributes: {
        class: "prose max-w-none mx-auto focus:outline-none"
      }
    },
    onUpdate: ({ editor: e }) => {
      onChange && onChange(e)
    },
    ...options
  })

  if (!editor) {
    return <IconLoader2 size={36} className='mx-auto animate-spin' />
  }

  return (
    <div className='flex w-full flex-col'>
      {editor.isEditable && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          "min-h-[350px] bg-background px-2 py-6",
          editor.isEditable && "rounded-b-lg border",
          !editor.isEditable && "bg-slate-50",
          className
        )}
      />
    </div>
  )
}

export default Editor
