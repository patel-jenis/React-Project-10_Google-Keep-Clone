import { useDispatch, useSelector } from "react-redux";
import { Trash2, Pencil, Archive, Palette, Image, Plus, Tag } from "lucide-react";
import { deleteNote, updateNote, archiveNote, toggleLabel } from "../features/notes/notesSlice";
import { useState } from "react";
import Swal from "sweetalert2";

const colors = [
    "#ffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
];

const bgImages = [
    "/images/1.jpg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
];

const NoteCard = ({ note }) => {
    const dispatch = useDispatch();

    const labels = useSelector(state => state.notes.labels);

    const [isEdit, setIsEdit] = useState(false);
    const [showColors, setShowColors] = useState(false);
    const [showBgImages, setShowBgImages] = useState(false);
    const [showLabels, setShowLabels] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const userImages = note.images || [];

    const handleUpdate = () => {
        dispatch(updateNote({ id: note.id, title, content }));
        setIsEdit(false);
    };

    const changeColor = (color) => {
        dispatch(updateNote({ id: note.id, color, image: "" }));
        setShowColors(false);
    };

    const applyBgImage = (img) => {
        dispatch(updateNote({ id: note.id, image: img }));
        setShowBgImages(false);
    };

    const addUserImage = () => {
        if (!imageUrl.trim()) return;

        if (userImages.length >= 4) {
            Swal.fire({
                icon: "info",
                title: "Max 4 images allowed",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        dispatch(updateNote({
            id: note.id,
            images: [...userImages, imageUrl]
        }));

        setImageUrl("");
        setShowModal(false);
    };

    const removeImage = (index) => {
        const newImages = userImages.filter((_, i) => i !== index);
        dispatch(updateNote({ id: note.id, images: newImages }));
    };

    const textColor = note.image ? "text-white" : "text-gray-800";

    return (
        <div className="mb-1">
            <div className="rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white">
                {userImages.length > 0 && (
                    <>
                        {userImages.length === 1 && (
                            <div className="relative">
                                <img src={userImages[0]} className="w-full h-48 object-cover" />
                                <button onClick={() => removeImage(0)} className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded">
                                    ✕
                                </button>
                            </div>
                        )}
                        {userImages.length === 2 && (
                            <div className="grid grid-cols-2">
                                {userImages.map((img, i) => (
                                    <div key={i} className="relative">
                                        <img src={img} className="w-full h-32 object-cover" />
                                        <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/60 text-white px-1 rounded">
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {userImages.length === 3 && (
                            <>
                                <div className="relative">
                                    <img src={userImages[0]} className="w-full h-44 object-cover" />
                                    <button onClick={() => removeImage(0)} className="absolute top-2 right-2 bg-black/60 text-white px-2 rounded">
                                        ✕
                                    </button>
                                </div>
                                <div className="grid grid-cols-2">
                                    {userImages.slice(1).map((img, i) => (
                                        <div key={i} className="relative">
                                            <img src={img} className="w-full h-28 object-cover" />
                                            <button onClick={() => removeImage(i + 1)} className="absolute top-1 right-1 bg-black/60 text-white px-1 rounded">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {userImages.length === 4 && (
                            <div className="grid grid-cols-2">
                                {userImages.map((img, i) => (
                                    <div key={i} className="relative">
                                        <img src={img} className="w-full h-28 object-cover" />
                                        <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/60 text-white px-1 rounded">
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                <div className="sm:p-5 p-3 relative"
                    style={{
                        backgroundColor: note.color || "#fff",
                        backgroundImage: note.image ? `url(${note.image})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {note.image && <div className="absolute inset-0 bg-black/40"></div>}
                    <div className="relative z-10">
                        {isEdit ? (
                            <>
                                <input
                                    className={`w-full outline-none font-semibold text-lg mb-3 bg-transparent ${textColor}`}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea
                                    className={`w-full outline-none text-sm bg-transparent ${textColor}`}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <div className="flex justify-end mt-3">
                                    <button onClick={handleUpdate} className="px-4 py-1.5 bg-gray-200 rounded-lg">
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className={`font-semibold text-lg ${textColor}`}>
                                    {note.title}
                                </h2>
                                <p className={`text-sm mt-2 ${textColor}`}>
                                    {note.content}
                                </p>

                                {note.labels?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {note.labels.map((l, i) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                                                {l}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap justify-end mt-4 relative">
                                    <button onClick={() => setIsEdit(true)} className="p-2 hover:bg-gray-200 rounded-full">
                                        <Pencil size={18} />
                                    </button>

                                    <button onClick={() => setShowColors(!showColors)} className="p-2 hover:bg-gray-200 rounded-full">
                                        <Palette size={18} />
                                    </button>

                                    <button onClick={() => setShowBgImages(!showBgImages)} className="p-2 hover:bg-gray-200 rounded-full">
                                        <Image size={18} />
                                    </button>

                                    <button onClick={() => setShowModal(true)} className="p-2 hover:bg-gray-200 rounded-full">
                                        <Plus size={18} />
                                    </button>

                                    <button onClick={() => setShowLabels(!showLabels)} className="p-2 hover:bg-gray-200 rounded-full">
                                        <Tag size={18} />
                                    </button>

                                    <button onClick={() => dispatch(archiveNote(note.id))} className="p-2 hover:bg-gray-200 rounded-full">
                                        <Archive size={18} />
                                    </button>

                                    <button onClick={() => dispatch(deleteNote(note.id))} className="p-2 hover:bg-gray-200 rounded-full">
                                        <Trash2 size={18} />
                                    </button>

                                    {showLabels && (
                                        <div className="absolute bottom-10 right-0 bg-white p-3 rounded-lg shadow-lg w-40">
                                            {labels.length === 0 ? (
                                                <p className="text-sm text-gray-500 text-center">
                                                    No labels available
                                                </p>
                                            ) : (
                                                labels.map((label) => (
                                                    <div key={label} className="flex items-center gap-2 mb-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={note.labels?.includes(label)}
                                                            onChange={() =>
                                                                dispatch(toggleLabel({ id: note.id, label }))
                                                            }
                                                        />
                                                        <span>{label}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}

                                    {showColors && (
                                        <div className="absolute bottom-10 right-0 flex gap-2 bg-white p-2 rounded-lg shadow-lg">
                                            {colors.map((c) => (
                                                <div
                                                    key={c}
                                                    onClick={() => changeColor(c)}
                                                    className="w-6 h-6 rounded-full cursor-pointer"
                                                    style={{ backgroundColor: c }}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {showBgImages && (
                                        <div className="absolute bottom-10 right-0 flex gap-2 bg-white p-2 rounded-lg shadow-lg">
                                            {bgImages.map((img, i) => (
                                                <img
                                                    key={i}
                                                    src={img}
                                                    onClick={() => applyBgImage(img)}
                                                    className="w-10 h-10 object-cover rounded cursor-pointer"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded-xl w-96 shadow-lg">
                        <h3 className="font-semibold mb-3">Add Image URL</h3>
                        <input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                            placeholder="Enter image URL"
                        />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-3 py-1 rounded hover:bg-gray-200">
                                Cancel
                            </button>

                            <button onClick={addUserImage} className="bg-blue-500 text-white px-4 py-1 rounded">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteCard;