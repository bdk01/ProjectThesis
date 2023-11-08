import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from '../../axios'
import { useTranslation } from "react-i18next";
/* import "./SearchBar.css"; */

export const SearchBar = ({ results,setResults, setInput, input }) => {
    /*  const [input, setInput] = useState(""); */
    const { t } = useTranslation();
     const fetchData = async(value) => {
          if(!value) return setResults([])
      
               try{
                    const res = await axios.get(`/api/user/search?username=${value}`)
      
                    console.log(res.data)
                    setResults(res.data.users);
                    if(!value) return setResults([])
               }
               catch(err){
                    console.log(err)
               }
     };

     const handleChange = (value) => {
          setInput(value);
          fetchData(value);
     };

     return (
          <div className="w-[80%] height-[20px] border-gray-300 border-[1px] rounded-[10px] py-[10px] shadow-md flex items-center bg-white relative">
               <FaSearch id="search-icon" className="text-[royalblue] ml-[8px] text-xl" />
               <input
               className="bg-transparent border-none height-[100%] text-base w-[100%] ml-[12px] focus:outline-none  "
                    placeholder={t('Enter to search')}
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
               />
          </div>
     );
};