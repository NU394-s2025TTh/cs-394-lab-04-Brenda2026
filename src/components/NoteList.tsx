// src/components/NoteList.tsx
import React, { useEffect, useState } from 'react';

// TODO: import { subscribeToNotes } from '../services/noteService';
import { subscribeToNotes } from '../services/noteService';
import { Note, Notes } from '../types/Note';
import NoteItem from './NoteItem';

interface NoteListProps {
  onEditNote?: (note: Note) => void;
}
// TODO: remove the eslint-disable-next-line when you implement the onEditNote handler
const NoteList: React.FC<NoteListProps> = ({ onEditNote }) => {
  // TODO: load notes using subscribeToNotes from noteService, use useEffect to manage the subscription; try/catch to handle errors (see lab 3)
  const [notes, setNotes] = useState<Notes>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: handle unsubscribing from the notes when the component unmounts
  // TODO: manage state for notes, loading status, and error message
  // TODO: display a loading message while notes are being loaded; error message if there is an error
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupSubscription = () => {
      try {
        // Subscribe to notes changes
        unsubscribe = subscribeToNotes(
          // Success callback - called when notes data changes
          (updatedNotes: Notes) => {
            setNotes(updatedNotes);
            setLoading(false);
            setError(null);
          },

          (subscriptionError: Error) => {
            console.error('Error subscribing to notes:', subscriptionError);
            setError(`Failed to load notes: ${subscriptionError.message}`);
            setLoading(false);
          },
        );
      } catch (setupError) {
        // Handle any immediate errors during subscription setup
        console.error('Error setting up notes subscription:', setupError);
        setError(
          `Failed to set up notes subscription: ${setupError instanceof Error ? setupError.message : 'Unknown error'}`,
        );
        setLoading(false);
      }
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="note-list">
        <h2>Notes</h2>
        <p>Loading notes...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="note-list">
        <h2>Notes</h2>
        <div
          className="error-message"
          style={{
            color: 'red',
            padding: '10px',
            border: '1px solid red',
            borderRadius: '4px',
            backgroundColor: '#ffe6e6',
          }}
        >
          <p>
            <strong>Error:</strong> {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2>Notes</h2>
      {Object.values(notes).length === 0 ? (
        <p>No notes yet. Create your first note!</p>
      ) : (
        <div className="notes-container">
          {Object.values(notes)
            // Sort by lastUpdated (most recent first)
            .sort((a, b) => b.lastUpdated - a.lastUpdated)
            .map((note) => (
              <NoteItem key={note.id} note={note} onEdit={onEditNote} />
            ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
