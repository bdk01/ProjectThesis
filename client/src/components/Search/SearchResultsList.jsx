
import { SearchResult } from "./SearchResult";
import { useNavigate } from "react-router-dom";

export const SearchResultsList = ({ results, setResults, setInput }) => {
     const navigate = useNavigate();

     const handleNavigate = (id) => {
          setInput('')
          setResults([])
          navigate(`/profile/${id}`, { replace: true });
     }
     return (
          <div className="absolute w-[40%] bg-white flex flex-col shadow-md rounded-[10px] mt-[6px] max-h-[300px] overflow-y-auto">
               {results.map((result) => {
                /*     return <SearchResult result={result} key={result._id} />; */
                return    <div
                         key={result._id}
                         className="   py-[10px] px-[20px] hover:bg-[#efefef] cursor-pointer "
                         onClick={() => handleNavigate(result._id)}
                    >
                         {result.username}

                    </div>
               })}
          </div>
     );
};