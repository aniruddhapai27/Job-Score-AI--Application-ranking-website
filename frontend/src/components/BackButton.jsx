import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-5 sm:right-10 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
      >
        <ArrowLeft />
      </button>
    </div>
  );
}

export default BackButton;
