// REFERENCE SOLUTION - Do not distribute to students
// src/components/NoteEditor.tsx
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// TODO: Import the saveNote function from your noteService call this to save the note to firebase
import { saveNote } from '../services/noteService';
import { Note } from '../types/Note';

interface NoteEditorProps {
  initialNote?: Note;
  onSave?: (note: Note) => void;
}
// remove the eslint disable when you implement on save
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NoteEditor: React.FC<NoteEditorProps> = ({ initialNote, onSave }) => {
  // State for the current note being edited
  // remove the eslint disable when you implement the state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [note, setNote] = useState<Note>(() => {
    return (
      initialNote || {
        id: uuidv4(),
        title: '',
        content: '',
        lastUpdated: Date.now(),
      }
    );
  });

  // TODO: create state for saving status
  // TODO: createState for error handling

  // TODO: Update local state when initialNote changes in a useEffect (if editing an existing note)
  // This effect runs when the component mounts or when initialNote changes
  // It sets the note state to the initialNote if provided, or resets to a new empty note, with a unique ID

  //TODO: on form submit create a "handleSubmit" function that saves the note to Firebase and calls the onSave callback if provided
  // This function should also handle any errors that occur during saving and update the error state accordingly

  // TODO: for each form field; add a change handler that updates the note state with the new value from the form
  // TODO: disable fields and the save button while saving is happening
  // TODO: for the save button, show "Saving..." while saving is happening and "Save Note" when not saving
  // TODO: show an error message if there is an error saving the note
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // State for error handling
  const [saveError, setSaveError] = useState<string | null>(null);

  // Update local state when initialNote changes (for editing existing notes)
  useEffect(() => {
    if (initialNote) {
      // If editing an existing note, use the provided note
      setNote(initialNote);
    } else {
      // If creating a new note, reset to empty state with new ID
      setNote({
        id: uuidv4(),
        title: '',
        content: '',
        lastUpdated: Date.now(),
      });
    }
    // Clear any previous errors when note changes
    setSaveError(null);
  }, [initialNote]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!note.title.trim() || !note.content.trim()) {
      setSaveError('Both title and content are required.');
      return;
    }

    try {
      // Set saving status
      setIsSaving(true);
      setSaveError(null);

      // Create the note to save with updated timestamp
      const noteToSave: Note = {
        ...note,
        title: note.title.trim(),
        content: note.content.trim(),
        lastUpdated: Date.now(),
      };

      // Save note to Firebase
      await saveNote(noteToSave);

      // Update local state with the saved note
      setNote(noteToSave);

      // Call onSave callback if provided
      if (onSave) {
        onSave(noteToSave);
      }

      console.log(`Note "${noteToSave.title}" saved successfully`);
      if (!initialNote) {
        setNote({
          id: uuidv4(),
          title: '',
          content: '',
          lastUpdated: Date.now(),
        });
      } else {
        // If editing an existing note, update local state with saved data
        setNote(noteToSave);
      }
    } catch (error) {
      // Handle save error
      console.error('Error saving note:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save note';
      setSaveError(errorMessage);
    } finally {
      // Reset saving status
      setIsSaving(false);
    }
  };

  // Handle title change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prevNote) => ({
      ...prevNote,
      title: e.target.value,
    }));

    if (saveError) {
      setSaveError(null);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prevNote) => ({
      ...prevNote,
      content: e.target.value,
    }));
    // Clear error when user starts typing
    if (saveError) {
      setSaveError(null);
    }
  };

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={note.title}
          onChange={handleTitleChange}
          disabled={isSaving}
          required
          placeholder="Enter note title"
          style={{
            opacity: isSaving ? 0.6 : 1,
            cursor: isSaving ? 'not-allowed' : 'text',
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={note.content}
          onChange={handleContentChange}
          disabled={isSaving}
          rows={5}
          required
          placeholder="Enter note content"
          style={{
            opacity: isSaving ? 0.6 : 1,
            cursor: isSaving ? 'not-allowed' : 'text',
          }}
        />
      </div>

      {/* Show error message if there's a save error */}
      {saveError && (
        <div
          className="error-message"
          style={{
            color: 'red',
            fontSize: '14px',
            marginBottom: '16px',
            padding: '8px 12px',
            backgroundColor: '#ffe6e6',
            border: '1px solid #ffcccc',
            borderRadius: '4px',
          }}
        >
          <strong>Error:</strong> {saveError}
          <button
            type="button"
            onClick={() => setSaveError(null)}
            style={{
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              color: 'red',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ×
          </button>
        </div>
      )}

      <div className="form-actions">
        <button
          type="submit"
          disabled={isSaving} // Disable while saving
          style={{
            opacity: isSaving ? 0.6 : 1,
            cursor: isSaving ? 'not-allowed' : 'pointer',
          }}
        >
          {isSaving
            ? initialNote
              ? 'Updating...'
              : 'Saving...'
            : initialNote
              ? 'Update Note'
              : 'Save Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
