import { Markdown } from "tiptap-markdown"

import { Highlight } from "@tiptap/extension-highlight"
import { Image } from "@tiptap/extension-image"
import { Link } from "@tiptap/extension-link"
import { Placeholder } from "@tiptap/extension-placeholder"
import { TaskItem } from "@tiptap/extension-task-item"
import { TaskList } from "@tiptap/extension-task-list"
import type { AnyExtension } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"

export const extensions: AnyExtension[] = [
  StarterKit.configure({
    codeBlock: {
      HTMLAttributes: {
        class: "p-3"
      }
    }
  }),
  Highlight,
  TaskList,
  //  Image 添加 Html tag
  Image,
  TaskItem.configure({
    nested: true
  }),
  Placeholder.configure({
    placeholder: "寫點什麼..."
  }),
  Markdown,
  Link.configure({
    openOnClick: false
  }).extend({
    inclusive: false,
    priority: 100
  })
]

// To install the required dependencies using pnpm, run the following command:
// pnpm install tiptap-markdown @tiptap/extension-highlight @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-task-item @tiptap/extension-task-list @tiptap/react @tiptap/starter-kit
