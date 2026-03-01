import { setCompanies } from '@/redux/companySlice'

import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
// import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { getCallSites } from 'util'

const useGetAllCompanies = () => {
    const dispatch=useDispatch()
  useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
      if (res.data.success) {
          console.log("✅ company fetched from backend:", res.data.company); // 👉 YAHI line add karo
          dispatch(setCompanies(res.data.companies))
        }
    } catch (error) {
      console.log(error);
    }
  };

  fetchCompanies(); // ✅ call inside useEffect
}, []);

}

export default useGetAllCompanies
