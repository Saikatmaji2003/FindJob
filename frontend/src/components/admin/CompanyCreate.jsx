import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Company_API_END_POINT } from '@/utils/constant'

const CompanyCreate = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [companyName, setCompanyName]=useState();

    const registerNewCompany=async ()=>{
        try {
            const res=await axios.post(`${Company_API_END_POINT}/register`,{companyName},{
                headers: {
                    "Content-Type": "application/json"
                  },
                  withCredentials: true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId=res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Company Name</h1>
                <p className='text-gray-500'>What would you like to give your company name? you can change it later.</p>
                </div>
                <Label>Company Name</Label>
                <Input type="text" className='my-2' placeholder="Google,Microsoft" onChange={(e)=>setCompanyName(e.target.value)}/>

                <div className='flex items-center gap-5 my-10' >
                    <Button variant="outline" onClick={()=>navigate("/admin/companies")}>Cancle</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate