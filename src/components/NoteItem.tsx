// REFERENCE SOLUTION - Do not distribute to students
// src/components/NoteItem.tsx
import React, { useState } from 'react';

import { deleteNote } from '../services/noteService';
import { Note } from '../types/Note';

interface NoteItemProps {
  note: Note;
  onEdit?: (note: Note) => void;
}
const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit }) => {
  // TODO: manage state for deleting status and error message
  // TODO: create a function to handle the delete action, which will display a confirmation (window.confirm) and call the deleteNote function from noteService,
  // and update the deleting status and error message accordingly
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Handle delete action with confirmation
  const handleDelete = async () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the note "${note.title}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmDelete) {
      return; // User cancelled
    }

    try {
      setIsDeleting(true);
      setDeleteError(null);

      // Call deleteNote function from noteService
      await deleteNote(note.id);

      // Note: We don't need to do anything else here because:
      // 1. The real-time subscription in NoteList will automatically update
      // 2. This component will be removed from the DOM when the note is deleted
      console.log(`Note "${note.title}" deleted successfully`);
    } catch (error) {
      // Handle deletion error
      console.error('Error deleting note:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete note';
      setDeleteError(errorMessage);
      setIsDeleting(false); // Re-enable buttons on error
    }
  };

  // Handle edit action
  const handleEdit = () => {
    if (onEdit) {
      onEdit(note);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);

    // Format: "Jan 1, 2023, 3:45 PM"
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  // Calculate time ago for display
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    let interval = Math.floor(seconds / 31536000); // years
    if (interval >= 1) {
      return `${interval} year${interval === 1 ? '' : 's'} ago`;
    }

    interval = Math.floor(seconds / 2592000); // months
    if (interval >= 1) {
      return `${interval} month${interval === 1 ? '' : 's'} ago`;
    }

    interval = Math.floor(seconds / 86400); // days
    if (interval >= 1) {
      return `${interval} day${interval === 1 ? '' : 's'} ago`;
    }

    interval = Math.floor(seconds / 3600); // hours
    if (interval >= 1) {
      return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    }

    interval = Math.floor(seconds / 60); // minutes
    if (interval >= 1) {
      return `${interval} minute${interval === 1 ? '' : 's'} ago`;
    }

    return 'just now';
  };
  // TODO: handle edit noteEdit action by calling the onEdit prop with the note object
  // TODO: handle delete note action by calling a deleteNote function from noteService
  // TODO: disable the delete button and edit button while deleting
  // TODO: show error message if there is an error deleting the note
  // TODO: only show the edit button when the onEdit prop is provided
  return (
    <div className="note-item">
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          {/* Only show edit button when onEdit prop is provided */}
          {onEdit && (
            <button
              className="edit-button"
              disabled={isDeleting}
              onClick={handleEdit}
              data-testid="edit-button"
              data-deleting={isDeleting}
              title="Edit note"
              style={{
                opacity: isDeleting ? 0.6 : 1,
                cursor: isDeleting ? 'not-allowed' : 'pointer',
              }}
            >
              Edit
            </button>
          )}

          <button
            className="delete-button"
            disabled={isDeleting}
            onClick={handleDelete}
            data-testid="delete-button"
            data-deleting={isDeleting}
            title="Delete note"
            style={{
              opacity: isDeleting ? 0.6 : 1,
              cursor: isDeleting ? 'not-allowed' : 'pointer',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="note-content">{note.content}</div>

      <div className="note-footer">
        <span title={formatDate(note.lastUpdated)}>
          Last updated: {getTimeAgo(note.lastUpdated)}
        </span>
      </div>
      {deleteError && (
        <div
          className="error-message"
          style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '8px',
            padding: '4px 8px',
            backgroundColor: '#ffe6e6',
            border: '1px solid #ffcccc',
            borderRadius: '4px',
          }}
        >
          <strong>Error:</strong> {deleteError}
          <button
            onClick={() => setDeleteError(null)}
            style={{
              marginLeft: '8px',
              background: 'none',
              border: 'none',
              color: 'red',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
