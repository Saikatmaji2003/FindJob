import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import {useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const shortListingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application);


  const statusHandler=async (status,id)=>{
    try {
      // console.log("called")
      axios.defaults.withCredentials=true;
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status});
      // console.log(res);
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of registered candidates</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            applicants && applicants?.applications?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNo}</TableCell>
                <TableCell >
                  {
                    item?.applicant?.profile?.resume ? <a className='text-blue-700 cursor-pointer' href={item?.applicant?.profile?.resume} target='blank'>{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                  }
                  </TableCell>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell className='float-right cursor-pointer'>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className='w-32'>
                      {
                        shortListingStatus.map((status, index) => {
                          return (
                            <div onClick={()=>statusHandler(status,item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                              <span >{status}</span>
                            </div>
                          )
                        })
                      }
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          }

        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
