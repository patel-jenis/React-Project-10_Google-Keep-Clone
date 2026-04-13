const IconBtn = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="p-2 rounded-full hover:bg-gray-100 transition">
            {children}
        </button>
    );
};

export default IconBtn;