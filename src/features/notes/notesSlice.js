import { createSlice } from "@reduxjs/toolkit";

const load = (key) => JSON.parse(localStorage.getItem(key)) || [];

const initialState = {
    notes: load("notes"),
    archive: load("archive"),
    trash: load("trash"),
    labels: load("labels"),
};

const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.unshift({
                id: Date.now(),
                title: action.payload.title,
                content: action.payload.content,
                color: "#ffffff",
                image: null,
                labels: [],
            });

            save("notes", state.notes);
        },

        archiveNote: (state, action) => {
            const note = state.notes.find(n => n.id === action.payload);

            if (note) {
                state.archive.unshift(note);
                state.notes = state.notes.filter(n => n.id !== action.payload);

                save("notes", state.notes);
                save("archive", state.archive);
            }
        },

        unarchiveNote: (state, action) => {
            const note = state.archive.find(n => n.id === action.payload);

            if (note) {
                state.notes.unshift(note);
                state.archive = state.archive.filter(n => n.id !== action.payload);

                save("notes", state.notes);
                save("archive", state.archive);
            }
        },

        deleteNote: (state, action) => {
            const id = action.payload;

            let note = state.notes.find(n => n.id === id);

            if (note) {
                state.trash.unshift({ ...note, from: "notes" });
                state.notes = state.notes.filter(n => n.id !== id);

                save("notes", state.notes);
                save("trash", state.trash);
                return;
            }

            note = state.archive.find(n => n.id === id);

            if (note) {
                state.trash.unshift({ ...note, from: "archive" });
                state.archive = state.archive.filter(n => n.id !== id);

                save("archive", state.archive);
                save("trash", state.trash);
            }
        },

        restoreNote: (state, action) => {
            const note = state.trash.find(n => n.id === action.payload);

            if (!note) return;

            const { from, ...cleanNote } = note;

            if (from === "archive") {
                state.archive.unshift(cleanNote);
                save("archive", state.archive);
            } else {
                state.notes.unshift(cleanNote);
                save("notes", state.notes);
            }

            state.trash = state.trash.filter(n => n.id !== action.payload);
            save("trash", state.trash);
        },

        removeFromTrash: (state, action) => {
            state.trash = state.trash.filter(n => n.id !== action.payload);
            save("trash", state.trash);
        },

        updateNote: (state, action) => {
            const { id, title, content, color, image, images } = action.payload;

            const note = state.notes.find(n => n.id === id);

            if (!note) return;

            if (!note.images) note.images = [];

            if (title !== undefined) note.title = title;
            if (content !== undefined) note.content = content;

            if (color !== undefined) {
                note.color = color;
                note.image = null; // ✅ FIX
            }

            if (image !== undefined) {
                note.image = image;
                note.color = null; // ✅ FIX
            }

            if (images !== undefined) {
                note.images = images;
            }

            save("notes", state.notes);
        },

        addLabel: (state, action) => {
            if (!state.labels.includes(action.payload)) {
                state.labels.push(action.payload);
                save("labels", state.labels);
            }
        },

        deleteLabel: (state, action) => {
            const label = action.payload;

            state.labels = state.labels.filter(l => l !== label);

            state.notes.forEach(note => {
                if (note.labels) {
                    note.labels = note.labels.filter(l => l !== label);
                }
            });

            save("labels", state.labels);
            save("notes", state.notes);
        },

        toggleLabel: (state, action) => {
            const { id, label } = action.payload;

            const note = state.notes.find(n => n.id === id);
            if (!note) return;

            if (!note.labels) note.labels = [];

            if (note.labels.includes(label)) {
                note.labels = note.labels.filter(l => l !== label);
            } else {
                note.labels.push(label);
            }

            save("notes", state.notes);
        },
    },
});

export const {
    addNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
    restoreNote,
    removeFromTrash,
    updateNote,
    addLabel,
    deleteLabel,
    toggleLabel
} = notesSlice.actions;

export default notesSlice.reducer;