import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLabel, deleteLabel } from "../features/notes/notesSlice";
import { X } from "lucide-react";
import { createPortal } from "react-dom"; // ✅ ADD THIS

const LabelModal = ({ close }) => {
    const dispatch = useDispatch();
    const labels = useSelector(state => state.notes.labels);

    const [newLabel, setNewLabel] = useState("");

    const handleAdd = () => {
        if (!newLabel.trim()) return;
        dispatch(addLabel(newLabel.trim()));
        setNewLabel("");
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
            <div className="bg-white w-[400px] rounded-xl shadow-xl p-5 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit Labels</h2>
                    <button onClick={close}>
                        <X size={20} />
                    </button>
                </div>
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                    <input
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Create new label"
                        className="flex-1 outline-none text-sm"
                    />
                    <button onClick={handleAdd} className="text-blue-500 font-medium hover:underline">
                        Create
                    </button>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-3">
                    {labels.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center">
                            No labels available
                        </p>
                    ) : (
                        labels.map((label) => (
                            <div key={label} className="flex justify-between items-center group">
                                <span className="text-sm">{label}</span>
                                <button onClick={() => dispatch(deleteLabel(label))} className="opacity-0 group-hover:opacity-100 text-red-500 transition">
                                    <X size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="flex justify-end mt-5">
                    <button onClick={close} className="text-sm px-4 py-1.5 rounded hover:bg-gray-100">
                        Done
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LabelModal;