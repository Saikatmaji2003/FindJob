import React, { useEffect } from 'react'
import LatestJobCards from './LatestJobCards'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]
const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const dispatch=useDispatch();

  useEffect(() => {
    return ()=>{
      dispatch(setSearchedQuery(""));
     }
   },[])

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
      <div className='grid grid-cols-3 gap-3 my-5'>
        {
          //multiple job cards will display here
          allJobs.length <= 0 ? <span>No Jobs Avilable Right Now</span> : allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job}/>)
        }

      </div>


    </div>
  )
}

export default LatestJobs