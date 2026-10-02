import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { BookCard } from '../components/book/BookCard'
import { BookModal } from '../components/book/BookModal'
import { BookNoteCard } from '../components/book/BookNoteCard'
import { BookNoteModal } from '../components/book/BookNoteModal'
import { BookProgressModal } from '../components/book/BookProgressModal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { useBookStore } from '../stores/bookStore'
import type { Book, BookNote } from '../types/book'

export function ReadingPage() {
  const books = useBookStore((state) => state.books)
  const addBook = useBookStore((state) => state.addBook)
  const updateBook = useBookStore((state) => state.updateBook)
  const deleteBook = useBookStore((state) => state.deleteBook)
  const startReading = useBookStore((state) => state.startReading)
  const updateProgress = useBookStore((state) => state.updateProgress)
  const completeBook = useBookStore((state) => state.completeBook)
  const reopenBook = useBookStore((state) => state.reopenBook)
  const addBookNote = useBookStore((state) => state.addBookNote)
  const updateBookNote = useBookStore((state) => state.updateBookNote)
  const deleteBookNote = useBookStore((state) => state.deleteBookNote)
  const [editing, setEditing] = useState<Book | undefined>()
  const [adding, setAdding] = useState(false)
  const [progressBook, setProgressBook] = useState<Book | undefined>()
  const [noteBook, setNoteBook] = useState<Book | undefined>()
  const [editingNote, setEditingNote] = useState<{ book: Book; note: BookNote } | undefined>()
  const [deleting, setDeleting] = useState<Book | undefined>()
  const [deletingNote, setDeletingNote] = useState<{ book: Book; note: BookNote } | undefined>()
  const { current, planned, completed } = useMemo(() => ({ current: books.filter((book) => book.status === 'reading'), planned: books.filter((book) => book.status === 'planned'), completed: books.filter((book) => book.status === 'completed') }), [books])
  const closeBookModal = () => { setAdding(false); setEditing(undefined) }

  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}><section className="experiences-hero"><div><span className="eyebrow">A gentle reading journal</span><h1 className="page-title">Reading</h1><p className="page-subtitle">Books, ideas and little things I want to remember.</p></div><button className="button add-experience-button" type="button" onClick={() => setAdding(true)}><Plus size={16} /> Add book</button></section>
    <section className="reading-section"><SectionHeader eyebrow="A book on the nightstand" title="Currently Reading" />{current.length ? <div className="currently-reading">{current.map((book) => <div className="current-book-layout" key={book.id}><BookCard book={book} featured onEdit={setEditing} onDelete={setDeleting} onStart={startReading} onProgress={setProgressBook} onComplete={completeBook} onReopen={reopenBook} onNote={setNoteBook} /><aside className="notes-panel"><div className="notes-panel__header"><div><span className="eyebrow">Reading journal</span><h2>My Notes</h2></div><button className="text-link" type="button" onClick={() => setNoteBook(book)}>+ Add note</button></div>{book.notes.length ? <div className="notes-list">{book.notes.map((note) => <BookNoteCard key={note.id} note={note} onEdit={(item) => setEditingNote({ book, note: item })} onDelete={(item) => setDeletingNote({ book, note: item })} />)}</div> : <div className="notes-empty"><strong>Nothing captured yet.</strong><span>Save a thought when something stays with you.</span></div>}</aside></div>)}</div> : <div className="empty-experiences card"><span>📖</span><h2>No book on the nightstand yet.</h2><button className="button" type="button" onClick={() => setAdding(true)}>Start a book</button></div>}</section>
    <section className="reading-section"><SectionHeader eyebrow="Next on the shelf" title="Up Next" /><div className="books-grid">{planned.map((book) => <BookCard key={book.id} book={book} onEdit={setEditing} onDelete={setDeleting} onStart={startReading} onProgress={setProgressBook} onComplete={completeBook} onReopen={reopenBook} onNote={setNoteBook} />)}</div></section>
    <section className="reading-section"><SectionHeader eyebrow="Pages turned" title="Completed" /><div className="books-grid">{completed.length ? completed.map((book) => <BookCard key={book.id} book={book} onEdit={setEditing} onDelete={setDeleting} onStart={startReading} onProgress={setProgressBook} onComplete={completeBook} onReopen={reopenBook} onNote={setNoteBook} />) : <div className="reading-empty"><p>No finished books yet — there’s no rush.</p></div>}</div></section>
    <AnimatePresence>{(adding || editing) && <BookModal key={editing?.id ?? 'new'} book={editing} onClose={closeBookModal} onSubmit={(draft) => { if (editing) updateBook(editing.id, draft); else addBook(draft); closeBookModal() }} />}{progressBook && <BookProgressModal book={progressBook} onClose={() => setProgressBook(undefined)} onSave={(progress) => updateProgress(progressBook.id, progress)} />}{noteBook && <BookNoteModal key={noteBook.id} onClose={() => setNoteBook(undefined)} onSubmit={(draft) => { addBookNote(noteBook.id, draft); setNoteBook(undefined) }} />}{editingNote && <BookNoteModal key={editingNote.note.id} note={editingNote.note} onClose={() => setEditingNote(undefined)} onSubmit={(draft) => { updateBookNote(editingNote.book.id, editingNote.note.id, draft); setEditingNote(undefined) }} />}{deleting && <Confirmation title="Remove this book?" message="Are you sure you want to remove it from your reading list?" onCancel={() => setDeleting(undefined)} onConfirm={() => { deleteBook(deleting.id); setDeleting(undefined) }} />}{deletingNote && <Confirmation title="Remove this note?" message="Are you sure you want to remove this thought from your journal?" onCancel={() => setDeletingNote(undefined)} onConfirm={() => { deleteBookNote(deletingNote.book.id, deletingNote.note.id); setDeletingNote(undefined) }} />}</AnimatePresence>
  </motion.div>
}

function Confirmation({ title, message, onCancel, onConfirm }: { title: string; message: string; onCancel: () => void; onConfirm: () => void }) {
  return <motion.div className="modal-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><section className="confirm-card" role="dialog" aria-modal="true"><button className="icon-button confirm-close" type="button" onClick={onCancel} aria-label="Close dialog"><X size={18} /></button><span className="eyebrow">A gentle check-in</span><h2 className="modal-title">{title}</h2><p>{message}</p><div className="modal-actions"><button className="button button--quiet" type="button" onClick={onCancel}>Cancel</button><button className="button button--danger" type="button" onClick={onConfirm}>Remove</button></div></section></motion.div>
}
