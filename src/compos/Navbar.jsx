/* eslint-disable react/prop-types */
import Buttons from "../utiles/Buttons"
import { Gicon } from "../utiles/Gicon"
import Logo from "./Logo"
import { useSelector } from "react-redux"
import { Minwidth } from "../utiles/Minwidth"
import { Link} from "react-router-dom"
import { useState } from "react"
import { Itemlink, Itembutton } from "../utiles/Combo"

const Navbar = ({ auther }) => {
    const { status } = useSelector(state => state.clientstore)
    const [activenav, setactivenav] = useState(false)
    
    return (
        <Minwidth>
            <div className=" w-full h-20 flex  items-center justify-between  py-3 relative">
                <div className="flex items-center gap-4 ">
                    <Logo />
                </div>
                {status ? (
                    <>
                        <div className=" flex items-center gap-5">
                            <Link to={"/dashboard"} className=" select-none capitalize text-zinc-500  font-medium hover:text-zinc-400 text-[0.9rem]">dashbord</Link>
                            {auther?.logo ? <img onClick={() => setactivenav(pre => !pre)} src={auther.logo} className=" select-none object-cover object-center w-9 h-9 cursor-pointer rounded-full " /> : (
                                <div onClick={() => setactivenav(pre => !pre)} className="w-9 h-9  rounded-full bg-zinc-700 cursor-pointer flex items-center justify-center select-none text-[1.2rem] font-medium capitalize">{auther?.username?.substring(0, 1)}</div>)}
                        </div>
                    </>
                ) : (
                    <Link to={"/login"}>
                        <Buttons>
                            <Gicon icon={"login"} /> login
                        </Buttons>
                    </Link>
                )}
                <div className={`bg-neutral-900 outline outline-1 outline-neutral-300/50 p-2  flex-col absolute w-[18rem] z-10 rounded-md h-[20rem] right-1 top-20  gap-4 ${activenav ? "flex" : "hidden"} `}>
                    <div className="h-[9rem] rounded-md w-full bg-neutral-700 flex flex-col items-center justify-center gap-3">
                        <img src={auther.logo} className=" select-none object-cover object-center w-12 h-12 cursor-pointer rounded-full " />
                        <p className=" font-medium text-[0.9rem] w-[80%] truncate text-center">{auther.username}</p>
                    </div>

                    <div className="flex flex-col gap-2 justify-between overflow-y-scroll scroll">
                        <Itemlink>account setting</Itemlink>
                        <Itembutton >logout</Itembutton>
                    </div>
                </div>
            </div>
        </Minwidth>
    )
}

export default Navbar