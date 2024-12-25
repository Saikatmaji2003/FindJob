import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'


const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white shadow-sm'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Find<span className='text-[#F83002]'>Job</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium gap-5 items-center'>
                        {
                            user && user.role === 'recruiter' ? (
                                <><li><Link to='/admin/companies'>Companies</Link></li>
                                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/jobs'>Jobs</Link></li>
                                    <li><Link to='/browse'>Browse</Link></li>
                                </>
                            )
                        }

                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="text-gray-800">Login</Button></Link>
                                <Link to="/signup"><Button variant="outline" className="bg-[#6A38C2] hover:bg-[#2a1c44] text-white">Signup</Button></Link>

                            </div>
                        ) : <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="w-10 h-10 cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" className="w-full h-full rounded-full" />
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className='w-80'>
                                <div className=" flex items-center gap-4 "> {/* Flexbox for proper alignment */}
                                    <Avatar className="w-10 h-10 cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                            className="w-full h-full rounded-full"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullName}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col mt-4 my-2'>
                                    {
                                        user && user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link" className="border-none bg-transparent text-gray-500 hover:underline gap-2">
                                                    <Link to='/profile'>View Profile</Link>
                                                </Button>
                                            </div>
                                        )
                                    }

                                    <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                                        <LogOut />
                                        <Button
                                            onClick={logoutHandler}
                                            variant="link"
                                            className="border-none bg-transparent text-gray-500 hover:underline gap-2"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
