import { useSelector } from "react-redux";
import NoteInput from "../components/NoteInput";
import NoteCard from "../components/NoteCard";

const Home = () => {
    const notes = useSelector((state) => state.notes.notes);

    return (
        <div className="px-3 sm:px-5 md:px-10 lg:px-16 xl:px-24">

            <div className="max-w-2xl mx-auto">
                <NoteInput />
            </div>

            <div className="
                mt-8 pb-10
                grid gap-4
                md:grid-cols-1
                lg:grid-cols-2
                xl:grid-cols-3
            ">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="w-full min-w-0">
                            <NoteCard note={note} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No notes yet...
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;