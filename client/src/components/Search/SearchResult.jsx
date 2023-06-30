import { Link, useNavigate } from "react-router-dom";


export const SearchResult = ({ result }) => {
     const navigate = useNavigate();

    const handleNavigate = (id)=>{
          navigate(`/profile/${id}`, { replace: true });
     }
     return (
          <div
               className="   py-[10px] px-[20px] hover:bg-[#efefef] cursor-pointer "
               onClick={() => handleNavigate(result._id)}
          >
           {result.username}
            
          </div>
     );
};