import { useEffect, useState } from "react";
import { axiosinstance } from "../../api/axiosInstance";


export const useFetch = (url, refresh) => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url: url,
      });
      console.log("response====", response)
      setTimeout(() => {
        setData(response?.data?.data);
        setIsloading(false);
      }, 1000)
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  useEffect(() =>{
    fetchData();
  }, [refresh]);
  return [data, isLoading, error];
};

