import { useSelector, useDispatch } from "react-redux";
import { Trash2, RotateCcw } from "lucide-react";
import { deleteNote, unarchiveNote } from "../features/notes/notesSlice";

const Archive = () => {
    const dispatch = useDispatch();
    const archive = useSelector((state) => state.notes.archive);

    return (
        <div className="px-4">
            <h1 className="text-lg font-semibold mt-4">Archive</h1>

            {archive.length === 0 && (
                <p className="text-gray-500 mt-4">No archived notes</p>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {archive.map((note) => (
                    <div key={note.id} className="bg-white p-4 rounded-xl border hover:shadow">
                        {note.title && (
                            <h2 className="font-semibold text-lg">
                                {note.title}
                            </h2>
                        )}

                        {note.content && (
                            <p className="text-sm mt-1">
                                {note.content}
                            </p>
                        )}

                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => dispatch(unarchiveNote(note.id))} className="p-2 rounded-full hover:bg-gray-100">
                                <RotateCcw size={18} className="text-gray-600" />
                            </button>
                            <button onClick={() => dispatch(deleteNote(note.id))} className="p-2 rounded-full hover:bg-gray-100">
                                <Trash2 size={18} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Archive;