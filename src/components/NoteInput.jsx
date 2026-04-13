import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../features/notes/notesSlice";

const NoteInput = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState("");

    const handleAdd = () => {
        if (!title.trim() || !content.trim()) {
            setError("Title and Description are required");
            return;
        }

        dispatch(addNote({ title, content }));

        setTitle("");
        setContent("");
        setExpanded(false);
        setError("");
    };

    return (
        <div
            className="bg-white max-w-xl mx-auto mt-4 p-3 rounded-lg border"
            onClick={() => {
                if (!expanded) setExpanded(true);
            }}>

            {expanded && (
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full outline-none mb-2 font-semibold text-xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            )}

            <textarea placeholder="Take a note..." className="w-full outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)} />

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            {expanded && (
                <div className="flex justify-end mt-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAdd();
                        }}
                        className="px-4 py-1 hover:bg-gray-100 rounded">
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default NoteInput;