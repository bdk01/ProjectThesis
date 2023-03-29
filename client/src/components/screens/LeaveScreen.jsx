import { Link } from "react-router-dom";


export function LeaveScreen({ setIsMeetingLeft }) {

  return (
    <div className="bg-gray-800 h-screen flex flex-col flex-1 items-center justify-center">
      <h1 className="text-white text-4xl">You left the meeting!</h1>
      <div className="mt-12 flex flex-col justify-center items-center">
        <button
          className="`w-[400px] bg-purple-350 text-white px-16 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
        <Link to="/home" className="mt-4">
          <button
            className="`w-[700px] bg-purple-350 text-white px-16 py-3 rounded-lg text-sm"
              onClick={() => {
            setIsMeetingLeft(true);
          }}
          >
            Go homepage
          </button>
        </Link>
      </div>
    </div>
  );
}
