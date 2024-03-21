import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
// import {
//   BoldIcon,
//   CodeIcon,
//   Heading1Icon,
//   Heading2Icon,
//   Heading3Icon,
//   HighlighterIcon,
//   ItalicIcon,
//   LayoutListIcon,
//   LinkIcon,
//   ListIcon,
//   ListOrderedIcon,
//   MinusIcon,
//   PilcrowIcon,
//   RemoveFormattingIcon,
//   RotateCcwIcon,
//   RotateCwIcon,
//   StrikethroughIcon,
//   TerminalSquareIcon,
//   TextQuoteIcon
// } from "lucide-react"
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconClearFormatting,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconHighlight,
  IconItalic,
  IconLink,
  IconList,
  IconListDetails,
  IconListNumbers,
  IconPhoto,
  IconPilcrow,
  IconQuote,
  IconSeparator,
  IconStrikethrough,
  IconTerminal2
} from "@tabler/icons-react"
import { type Editor } from "@tiptap/react"

type ToolbarProps = {
  editor: Editor
}

const Divider = () => <div className='mx-3 h-5 w-[2px] bg-orange-500' />

const Toolbar = (props: ToolbarProps) => {
  const [open, setOpen] = React.useState(false)
  const { editor } = props

  const setLink = React.useCallback(() => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl as string)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  // 傳入 url
  const addImage = React.useCallback(() => {
    const url = (document.getElementById("image-url") as HTMLInputElement).value
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
      setOpen(false)
    }
  }, [editor])

  return (
    <div
      className={cn(
        "sticky top-16 z-10 flex flex-wrap items-center rounded-t-lg border bg-background p-1",
        "[&>button:hover]:bg-orange-500 [&>button]:mr-1 [&>button]:size-7 [&>button]:rounded [&>button]:p-1",
        "[&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-50"
      )}
    >
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(editor.isActive("bold") ? "bg-orange-500" : "")}
        aria-label='Bold'
      >
        <IconBold size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(editor.isActive("italic") ? "bg-orange-500" : "")}
        aria-label='Italic'
      >
        <IconItalic size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(editor.isActive("strike") ? "bg-orange-500" : "")}
        aria-label='Strikethrough'
      >
        <IconStrikethrough size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(editor.isActive("code") ? "bg-orange-500" : "")}
        aria-label='Code'
      >
        <IconCode size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={cn(editor.isActive("highlight") ? "bg-orange-500" : "")}
        aria-label='Highlight'
      >
        <IconHighlight size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(editor.isActive("heading", { level: 1 }) ? "bg-orange-500" : "")}
        aria-label='Heading 1'
      >
        <IconH1 size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(editor.isActive("heading", { level: 2 }) ? "bg-orange-500" : "")}
        aria-label='Heading 2'
      >
        <IconH2 size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(editor.isActive("heading", { level: 3 }) ? "bg-orange-500" : "")}
        aria-label='Heading 3'
      >
        <IconH3 size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(editor.isActive("paragraph") ? "bg-orange-500" : "")}
        aria-label='Paragraph'
      >
        <IconPilcrow size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive("bulletList") ? "bg-orange-500" : "")}
        aria-label='Bullet List'
      >
        <IconList size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive("orderedList") ? "bg-orange-500" : "")}
        aria-label='Ordered List'
      >
        <IconListNumbers size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={cn(editor.isActive("taskList") ? "bg-orange-500" : "")}
        aria-label='Task List'
      >
        <IconListDetails size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(editor.isActive("codeBlock") ? "bg-orange-500" : "")}
        aria-label='Code Block'
      >
        <IconTerminal2 size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => setLink()}
        className={cn(editor.isActive("link") && "bg-orange-500")}
        aria-label='Link'
      >
        <IconLink size={20} />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger type='button' aria-label='Image'>
          <IconPhoto size={20} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>插入圖片</DialogTitle>
            <DialogDescription>請輸入圖片網址</DialogDescription>
          </DialogHeader>
          <input
            type='text'
            placeholder='https://'
            id='image-url'
            className='w-full rounded-lg border p-2'
          />
          <Button onClick={addImage}>插入</Button>
        </DialogContent>
      </Dialog>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive("blockquote") ? "bg-orange-500" : "")}
        aria-label='Blockquote'
      >
        <IconQuote size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label='Horizontal Rule'
      >
        <IconSeparator size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        aria-label='Clear Formatting'
      >
        <IconClearFormatting size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        aria-label='Undo'
      >
        <IconArrowBackUp size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        aria-label='Redo'
      >
        <IconArrowForwardUp size={20} />
      </button>
    </div>
  )
}

export default Toolbar
