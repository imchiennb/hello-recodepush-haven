import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useState, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Image as ImageIcon, Link as LinkIcon, Type, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SlashCommand = ({ editor }: { editor: any }) => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setShow(true);
        e.preventDefault();
      }
      if (e.key === 'Escape') {
        setShow(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    {
      name: 'Text',
      icon: <Type className="h-4 w-4" />,
      shortcut: 'T',
      command: () => editor.chain().focus().setParagraph().run(),
    },
    {
      name: 'Heading 1',
      icon: <Heading1 className="h-4 w-4" />,
      shortcut: '#',
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      name: 'Heading 2',
      icon: <Heading2 className="h-4 w-4" />,
      shortcut: '##',
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: 'Heading 3',
      icon: <Heading3 className="h-4 w-4" />,
      shortcut: '###',
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      name: 'Bullet List',
      icon: <List className="h-4 w-4" />,
      shortcut: '-',
      command: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: 'Numbered List',
      icon: <ListOrdered className="h-4 w-4" />,
      shortcut: '1.',
      command: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      name: 'Quote',
      icon: <Quote className="h-4 w-4" />,
      shortcut: '>',
      command: () => editor.chain().focus().toggleBlockquote().run(),
    },
  ];

  const filteredCommands = commands.filter((command) =>
    command.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50" onClick={() => setShow(false)}>
      <div 
        className="absolute bg-white rounded-lg shadow-xl w-72 overflow-hidden border border-neutral-200"
        style={{ 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 border-b border-neutral-200">
          <input
            type="text"
            className="w-full px-2 py-1 text-sm focus:outline-none"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          <div className="p-1">
            {filteredCommands.map((command) => (
              <button
                key={command.name}
                className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-neutral-100 flex items-center gap-2 group"
                onClick={() => {
                  command.command();
                  setShow(false);
                }}
              >
                <div className="p-1 rounded bg-white border border-neutral-200 group-hover:border-neutral-300">
                  {command.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{command.name}</div>
                  <div className="text-xs text-neutral-500">
                    Add {command.name.toLowerCase()} content
                  </div>
                </div>
                <div className="text-xs text-neutral-400 px-1.5 py-0.5 bg-neutral-100 rounded">
                  {command.shortcut}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-neutral-200 p-2 flex items-center gap-1 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5 text-neutral-600 font-normal hover:bg-neutral-100"
          >
            <Type className="h-4 w-4" />
            Normal
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1">
          <div className="space-y-0.5">
            <Button
              variant="ghost"
              className="w-full justify-start text-base"
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              <Type className="h-4 w-4 mr-2" />
              Normal
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-2xl"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              <Heading1 className="h-4 w-4 mr-2" />
              Heading 1
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-xl"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              <Heading2 className="h-4 w-4 mr-2" />
              Heading 2
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-lg"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              <Heading3 className="h-4 w-4 mr-2" />
              Heading 3
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <div className="h-4 w-px bg-neutral-200" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <div className="h-4 w-px bg-neutral-200" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <div className="h-4 w-px bg-neutral-200" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt('Enter image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="h-8 w-8 p-0 hover:bg-neutral-100"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-neutral-100' : 'hover:bg-neutral-100'}`}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[350px] px-8 py-4 prose prose-lg max-w-none focus:outline-none [&>p]:my-1 [&>h1]:mt-6 [&>h1]:mb-4 [&>h2]:mt-5 [&>h2]:mb-3 [&>h3]:mt-4 [&>h3]:mb-2 [&>ul]:my-2 [&>ol]:my-2 [&>blockquote]:my-2 [&>blockquote]:border-l-4 [&>blockquote]:border-neutral-200 [&>blockquote]:pl-4 [&>blockquote]:italic [&>h1]:text-3xl [&>h2]:text-2xl [&>h3]:text-xl [&>p]:text-base [&>p]:leading-relaxed [&>ul]:pl-6 [&>ol]:pl-6 [&>blockquote]:text-neutral-600',
      },
    },
  });

  if (!mounted) {
    return (
      <div className="min-h-[400px] border rounded-lg p-4 bg-white flex items-center justify-center">
        Loading editor...
      </div>
    );
  }

  return (
    <div className="rich-text-editor">
      <div className="min-h-[400px] bg-white rounded-lg border border-neutral-200 shadow-sm">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
        {editor && <SlashCommand editor={editor} />}
      </div>
    </div>
  );
};

export default RichTextEditor;
