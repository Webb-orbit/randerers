import cover from "../../photos/databases.jpg";
import googlelogo from "../../photos/google.png";
import { Link, useNavigate } from 'react-router-dom';
import { Gicon } from '../../utiles/Gicon';
import { useForm } from "react-hook-form";
import Authbase from "../../api/Auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storelogin } from "../../store/userslice";

const Signup = () => {
  const [logoupload, setlogoupload] = useState(null)
  const [logopath, setlogopath] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, setError, clearErrors, formState: { isSubmitting, errors } } = useForm()

  const uploadavatar = (e) => {
    setlogopath(URL.createObjectURL(e.target.files[0]))
    setlogoupload(e.target.files[0])
    clearErrors("logo")
  }

  const signuphandle = async (data) => {
    if (!logoupload) setError("logo", { message: "avatar is required" })
    try {
      const create = await Authbase.createclient(data.email, data.username, data.password, logoupload)
      const response = create.data.data
      console.log(response);
      dispatch(storelogin(response._id))
      navigate("/dashbord")
    } catch (error) {
      console.log(error);
      setError("root", {message: error.message || "something went wrong"})
      // SHOW ERROR
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 max-sm:px-3">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold capitalize">signup</h1>
            <p className=" text-neutral-400">
              Enter your info below to create new account
            </p>
          </div>
          <form onSubmit={handleSubmit(signuphandle)}>
            <div className="grid gap-4">
              <div className=' w-full flex items-center justify-center'>
                <div className=' relative group'>
                  <label htmlFor="logo" className={`w-full h-full absolute items-center justify-center cursor-pointer ${logopath ? " hidden group-hover:flex group-hover:bg-neutral-950/80" : "flex"} `}><Gicon icon={"stress_management"} classes={"text-[1.6rem]"} /></label>
                  <input
                    onChange={uploadavatar}
                    type="file" id="logo" accept='.jpg, .png ' className='hidden' />
                  <img
                    src={logopath}
                    id='logo'
                    className={`w-[5rem] h-[5rem] rounded-full object-cover object-center bg-neutral-950 outline-none  ${logopath && "border-2"} ${errors.logo && "border-2 border-red-500 animate-pulse"}`} />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="username">username</label>
                <input
                  {...register("username", { required: "username is required" })}
                  placeholder="username"
                  spellCheck="false"
                  maxLength={20}
                  autoComplete="false"
                  id="username" type="text"
                  className={` bg-neutral-950 outline-1 outline  rounded-md focus:outline-neutral-300/60 py-1 px-2 placeholder:text-[0.9rem] ${errors.username ? "outline-red-500/60" : " outline-neutral-600/60"}`}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  {...register("email", { required: "email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "invailed email" } })}
                  type="text"
                  spellCheck={false}
                  autoComplete="false"
                  placeholder="m@example.com"
                  className={` bg-neutral-950 outline-1 focus:outline-neutral-300/60  outline  rounded-md py-1 px-2 placeholder:text-[0.9rem] ${errors.email ? "outline-red-500/60" : " outline-neutral-600/60"}`}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <input
                  {...register("password", { required: "password is required", minLength: { value: 6, message: "password have at least 6 charaters" } })}
                  autoComplete="false"
                  id="password" type="password" required
                  className={` bg-neutral-950 outline-1 outline outline-neutral-600/60 rounded-md focus:outline-neutral-300/60 py-1 px-2 placeholder:text-[0.9rem] ${errors.password ? "outline-red-500/60" : " outline-neutral-600/60"}`}
                />
              </div>
              <div>
                <p className="text-[0.8rem] tracking-tight text-red-500 font-thin">{errors.username && errors.username.message}</p>
                <p className="text-[0.8rem] tracking-tight text-red-500 font-thin">{errors.email && errors.email.message}</p>
                <p className="text-[0.8rem] tracking-tight text-red-500 font-thin">{errors.password && errors.password.message}</p>
                <p className="text-[0.8rem] tracking-tight text-red-500 font-thin">{errors.logo && errors.logo.message}</p>
                <p className="text-[0.8rem] tracking-tight text-red-500 font-thin">{errors.root && errors.root.message}</p>
              </div>
              <button
                type='submit' 
                disabled={isSubmitting}
                className={`w-full bg-slate-200 text-black py-2 rounded-md ${isSubmitting && " animate-pulse"}`}>
                signup
              </button>
            </div>
          </form>

          <button className='  w-full bg-neutral-950 text-white outline-1 outline outline-neutral-600/60 py-2 rounded-md capitalize flex items-center justify-center gap-2'><img className='w-[1.4rem]' src={googlelogo} />signup with google</button>

          <div className='mx-auto '>
            <p className=' capitalize'>have an account <Link to={"/login"} className=' underline'>login</Link></p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={cover}
          alt="Image"
          className="h-screen w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default Signup