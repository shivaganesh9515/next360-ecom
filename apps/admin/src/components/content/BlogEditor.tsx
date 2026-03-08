'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Link, ImageIcon, Undo, Redo
} from 'lucide-react'

interface BlogEditorProps {
  content: string
  onChange: (html: string) => void
}

export function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      LinkExtension.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] px-4 py-4',
      },
    },
  })

  if (!editor) return null

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const addImage = () => {
    const url = window.prompt('Image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const MenuButton = ({ icon: Icon, isActive = false, onClick, disabled = false }: any) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded hover:bg-border/40 transition-colors ${
        isActive ? 'bg-primary/10 text-primary' : 'text-muted'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Icon className="w-4 h-4" />
    </button>
  )

  return (
    <div className="border border-border rounded-xl bg-white overflow-hidden flex flex-col">
      <div className="flex items-center flex-wrap gap-1 p-2 border-b border-border bg-black/5/50 shrink-0">
        <MenuButton icon={Bold} onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} />
        <MenuButton icon={Italic} onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} />
        <MenuButton icon={Strikethrough} onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <MenuButton icon={Heading1} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} />
        <MenuButton icon={Heading2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <MenuButton icon={List} onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} />
        <MenuButton icon={ListOrdered} onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <MenuButton icon={Link} onClick={toggleLink} isActive={editor.isActive('link')} />
        <MenuButton icon={ImageIcon} onClick={addImage} />
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <MenuButton icon={Undo} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
        <MenuButton icon={Redo} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
