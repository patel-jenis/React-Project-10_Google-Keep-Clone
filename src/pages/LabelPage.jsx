import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NoteCard from "../components/NoteCard";

const LabelPage = () => {
    const { name } = useParams();
    const notes = useSelector(state => state.notes.notes);

    const filtered = notes.filter(n => n.labels?.includes(name));

    return (
        <div className="p-5">
            <h2 className="text-xl font-semibold mb-4">{name}</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map(note => (
                    <NoteCard key={note.id} note={note} />
                ))}
            </div>
        </div>
    );
};

export default LabelPage;