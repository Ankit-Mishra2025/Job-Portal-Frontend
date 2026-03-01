import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
// import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { getCallSites } from 'util'

const useGetCompanyById = (CompanyId) => {
    const dispatch=useDispatch()
  useEffect(() => {
  const fetchSingleCompany = async () => {
    try {
      const res = await axios.get(`${COMPANY_API_END_POINT}/get/${CompanyId}`, { withCredentials: true });
      if (res.data.success) {
          console.log("✅ Jobs fetched from backend:", res.data.jobs); // 👉 YAHI line add karo
          dispatch(setSingleCompany(res.data.company))
        }
    } catch (error) {
      console.log(error);
    }
  };

  fetchSingleCompany(); // ✅ call inside useEffect
}, [CompanyId,dispatch]);

}

export default useGetCompanyById
