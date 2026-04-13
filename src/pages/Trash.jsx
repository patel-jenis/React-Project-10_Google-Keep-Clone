import { useSelector, useDispatch } from "react-redux";
import { Trash2, RotateCcw } from "lucide-react";
import { removeFromTrash, restoreNote } from "../features/notes/notesSlice";
import Swal from "sweetalert2";

const Trash = () => {
    const dispatch = useDispatch();
    const trash = useSelector((state) => state.notes.trash);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete permanently?",
            text: "This note will be deleted forever!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Yes, delete",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeFromTrash(id));
            }
        });
    };

    return (
        <div className="px-4">
            <h1 className="text-lg font-semibold mt-4">Trash</h1>

            {trash.length === 0 && (
                <p className="text-gray-500 mt-4">No deleted notes</p>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {trash.map((note) => (
                    <div key={note.id} className="bg-white p-4 rounded-xl border hover:shadow">
                        {note.title && (
                            <h2 className="font-semibold text-lg">{note.title}</h2>
                        )}

                        {note.content && (
                            <p className="text-sm mt-1">{note.content}</p>
                        )}

                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={() => dispatch(restoreNote(note.id))} className="p-2 rounded-full hover:bg-gray-100 transition">
                                <RotateCcw size={18} className="text-gray-600" />
                            </button>
                            <button onClick={() => handleDelete(note.id)} className="p-2 rounded-full hover:bg-red-100 transition">
                                <Trash2 size={18} className="text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trash;