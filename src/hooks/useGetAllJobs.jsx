import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
// import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getCallSites } from 'util'

const useGetAllJobs = (jobId) => {
    const dispatch=useDispatch();

    const {searchedQuery}=useSelector(store=>store.job)
  useEffect(() => {
  const fetchAllJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
      if (res.data.success) {
          console.log("✅ Jobs fetched from backend:", res.data.jobs); // 👉 YAHI line add karo
          dispatch(setAllJobs(res.data.jobs))
        }
    } catch (error) {
      console.log(error);
    }
  };

  fetchAllJobs(); // ✅ call inside useEffect
}, []);

}

export default useGetAllJobs
