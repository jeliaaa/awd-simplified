import { useLocation, useNavigate } from "react-router-dom";

const BackBtn = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        const pathParts = location.pathname.split("/").filter(Boolean);

        if (pathParts.length === 0) {
            // already at root
            navigate("/");
            return;
        }

        // remove the last part (/about/team -> /about)
        pathParts.pop();
        const parentPath = "/" + pathParts.join("/");

        navigate(parentPath || "/");
    };

    return (
        <button
            onClick={handleBack}
            className="px-6 py-3 border-2 w-full border-gray-500 font-bold hover:bg-gray-200 hover:text-black"
            aria-label="Go back"
        >
            Back
        </button>
    );
};

export default BackBtn;
