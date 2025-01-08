/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { MdOutlineLastPage } from "react-icons/md";

const pages = [1, 5, 10, 20, 30];

export default function Table() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [page, setPage] = useState(10);
  const [total, setTotal] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [currentpage, setCurrentpage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  
  const fromPage = (((currentpage * perPage) - perPage) + 1) > total ? total - perPage : ((currentpage * perPage) - perPage) + 1;
  const toPage = currentpage * perPage > total ? total : currentpage * perPage;


  const handleSrot = (key) => {
    setSort((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  }

  const getSortedArray = (arrayToSort) => {
    if(sort.order === "asc"){
      return arrayToSort.sort((a,b)=> a[sort.key].localeCompare(b[sort.key]));}
    else {
        return arrayToSort.sort((a,b)=> b[sort.key].localeCompare(a[sort.key]));
    }
  }

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (page) params.append("paginate", page);
    if (searchTerm) params.append("search", searchTerm);
    if (currentpage) params.append("page", currentpage);
    return params.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = buildQueryParams();
      const url = `https://api.razzakfashion.com?${queryParams}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        
        setTotal(result?.total);
        setPerPage(result?.per_page);
        setData(result?.data);
        setNextPage(result?.next_page_url);
        setLastPage(result?.last_page);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchTerm, currentpage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle bg-gray-800 px-5 py-4">
          <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
            <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none text-2xl text-gray-100">
             <CiSearch />
            </div>
            <input
              onChange={(e)=> setSearchTerm(e.target.value)}
              type="text"
              className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-100 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Search"
            />
          </div>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="">
                <tr className="bg-gray-800 text-gray-100">
                  <th
                    className="p-5 text-left flex items-center"
                  >
                    {" "}
                    First Name{" "} <span 
                    onClick={()=> handleSrot("name")}
                    className="text-lg cursor-pointer inline-block ms-2"><LuArrowDownUp /></span>
                  </th>
                  <th
                    className="p-5 text-left"
                  >
                    {" "}
                    Email{" "}  <span
                     onClick={()=> handleSrot("email")}
                      className="text-lg cursor-pointer inline-block ms-2"><LuArrowDownUp /></span>
                  </th>
                  <th
                    className="p-5 text-left"
                  >
                    {" "}
                    Address{" "}
                  </th>
                  <th
                    className="p-5 text-left"
                  >
                    {" "}
                    State{" "}
                  </th>
                  <th
                    className="p-5 text-left"
                  >
                    {" "}
                    Phone Number{" "}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {
                  data?.length > 0 ? <>
                  {getSortedArray(data).map((singleData, i) => (
                  <tr key={i} className="bg-gray-800">
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-200 ">
                      {" "}
                      {singleData?.name}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-200">
                      {" "}
                      {singleData?.email}{" "}
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-200">
                      {" "}
                      N/A
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-200">
                      {" "}
                      N/A
                    </td>
                    <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-200">
                      {" "}
                      N/A
                    </td>
                  </tr>
                ))}
                  </> : <>
                   <p className="text-white my-3 ms-5">No data found</p>
                  </>
                }
              </tbody>
            </table>
          </div>
          <div className="bg-gray-800 flex justify-end items-center px-4 py-2">
      <div className="flex justify-center items-center mt-2">
        <span className="mx-4 text-gray-100">Rows Per Page</span>
        <select defaultValue={10} onChange={(e)=> setPage(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white">
          {pages.map((page, i) => <option key={i} value={page}>{page}</option>) }
        </select>
        <div className="text-gray-100 mx-3">{fromPage}-{toPage} of {total}</div>
        <button onClick={()=> setCurrentpage(1)}
        className={`${ currentpage > 1 ? "text-gray-100": "text-gray-600"} font-semibold px-2 text-2xl rotate-180`}>
        <MdOutlineLastPage />
        </button>
        <button onClick={()=> setCurrentpage(prevPage=> {
          if(prevPage > 1){
            return prevPage - 1;
          }else{
            return 1
          }
        })} className={`${ currentpage > 1 ? "text-gray-100": "text-gray-600"}  font-semibold px-2 rotate-180`}>
        <FaChevronRight />
        </button>
        <button
        
        onClick={()=> setCurrentpage(prevPage=> {
          if(nextPage !== null){
            return prevPage + 1;
          }else{
            return lastPage;
          }
        })}
        
        className={`${ lastPage === currentpage ? "text-gray-600": "text-gray-100"} font-semibold px-2`}>
        <FaChevronRight />
        </button>
        <button
        onClick={()=> setCurrentpage(lastPage)}
        className={`${ lastPage === currentpage ? "text-gray-600": "text-gray-100"} font-semibold px-2 text-2xl`}>
        <MdOutlineLastPage />
        </button>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}
