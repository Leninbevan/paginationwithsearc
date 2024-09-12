// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useDebounce from "./useDebounce";
// import "./App.css";

// const perPage = 3;

// export default function App() {
//   const [searchItem, setSearchItem] = useState("");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const debounceValue = useDebounce(searchItem, 300);

//   useEffect(() => {
//     const getResponse = async () => {
//       try {
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/users"
//         );
//         setData(response.data);
//       } catch (error) {
//         console.log("Error while fetching Api", error);
//       }
//     };

//     getResponse();
//   }, []);

//   useEffect(() => {
//     const filterData = () => {
//       let tempData = [...data];

//       if (debounceValue.trim() !== "") {
//         tempData = tempData.filter(
//           (item) =>
//             item.name.toLowerCase().includes(debounceValue.toLowerCase()) ||
//             item.username.toLowerCase().includes(debounceValue.toLowerCase())
//         );
//       }

//       setFilteredData(tempData);
//       setCurrentPage(1);
//     };

//     filterData();
//   }, [data, debounceValue]);

//   const totalPages = Math.ceil(filteredData.length / perPage);

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage
//   );

//   return (
//     <div className="App">
//       <input
//         type="text"
//         placeholder="Enter a name or username"
//         value={searchItem}
//         onChange={(e) => setSearchItem(e.target.value)}
//       />

//       {paginatedData.map((details) => (
//         <div key={details.id}>
//           <h1>Name: {details.name}</h1>
//           <h3>Username: {details.username}</h3>
//         </div>
//       ))}

//       <div className="pagination">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => handleChangePage(index + 1)}
//             disabled={currentPage === index + 1}
//             style={{ backgroundColor: "red", color: "white" }}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./useDebounce";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import "./App.css";

const perPage = 3;

export default function App() {
  const [searchItem, setSearchItem] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const debounceValue = useDebounce(searchItem, 300);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data);
      } catch (error) {
        console.log("Error while fetching Api", error);
      }
    };

    getResponse();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let tempData = [...data];

      if (debounceValue.trim() !== "") {
        tempData = tempData.filter(
          (item) =>
            item.name.toLowerCase().includes(debounceValue.toLowerCase()) ||
            item.username.toLowerCase().includes(debounceValue.toLowerCase())
        );
      }

      setFilteredData(tempData);
      setCurrentPage(1);
    };

    filterData();
  }, [data, debounceValue]);

  const totalPages = Math.ceil(filteredData.length / perPage);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter a name or username"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />

      {paginatedData.map((details) => (
        <div key={details.id}>
          <h1>Name: {details.name}</h1>
          <h3>Username: {details.username}</h3>
        </div>
      ))}

      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleChangePage(index + 1)}
            disabled={currentPage === index + 1}
            className="pagination-btn"
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
