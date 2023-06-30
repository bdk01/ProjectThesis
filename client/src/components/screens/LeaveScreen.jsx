import { Link } from "react-router-dom";


export function LeaveScreen({ setIsMeetingLeft }) {

  return (
    <div className="bg-gray-800 h-screen flex flex-col flex-1 items-center justify-center">
      <h1 className="text-white text-4xl">You left the meeting!</h1>
      <div className="mt-12 flex flex-col justify-center items-center w-[250px]">
        <button
          className="`w-[100%] bg-purple-350 text-white px-12 py-3 rounded-lg text-sm"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </button>
        <div className="mt-4 m-w-[100%]">
            <button
              className=" bg-purple-350 text-white px-16 py-3 rounded-lg text-sm"
                onClick={() => {
                  setIsMeetingLeft(true);
            }}
            >
                  <Link to="/home" className=" w-[100%]">
              Go homepage
          </Link>
            </button>

        </div>
      </div>
    </div>
  );
}
