/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from '../../../utiles/Tag';
import Sharebase from '../../../api/Share'
import { Gicon } from '../../../utiles/Gicon'
import { useDispatch } from 'react-redux'
import { showtoast } from '../../../store/Toastslice'
import { motion } from 'framer-motion'

const Sharetting = () => {
  const [sharesdata, setsharesdata] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        const data = await Sharebase.getallshares()
        const res = data.data.data.data
        setsharesdata(res)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const deletefun = async (id) => {
    try {
      const deleteing = await Sharebase.deleteshare(id)
      const removearr = sharesdata.filter((e)=> id !== e._id)
      if (deleteing) {
        setsharesdata(removearr)
        dispatch(showtoast({ title: "your share deleted", readonly: true, icon: "home", timeout: 5000, color: "red-600", bgcolor: "neutral-900", position: "bottom_right" }))
      }
    } catch (error) {
      console.log(error);
      dispatch(showtoast({ title: "opps", description: "something wrong when deleteing share", icon: "home", timeout: 5000, color: "red-600", bgcolor: "neutral-900", position: "bottom_right" }))
    }
  }

  return sharesdata ? (
    <div className='w-[80%] mx-auto select-none'>
      <div>
        <h3 className=' capitalize text-[1.4rem] font-semibold text-neutral-300'>all published documents</h3>
      </div>
      <div >
        <div className='my-10 border-b-[1px] border-neutral-400/50 grid grid-cols-5 w-full capitalize text-[1rem] font-semibold text-neutral-400 cursor-default'>
          <p className=' col-span-2'>document</p>
          <p>status</p>
          <p>views</p>
          <p>published date</p>
        </div>

        <div className=' flex flex-col gap-7 '>
          {sharesdata?.map((e) => (
            <Sharecard data={e} key={e._id} deletefun={deletefun} />
          ))}
        </div>

      </div>
    </div>
  ) : <>skllton</>
}

export default Sharetting
// ADD SHARE PAGE PRIVIEW FRETURE WHEN HOVER THE LINK

const Sharecard = ({ data, deletefun }) => {
  const [isprivate, setisprivate] = useState(data?.privated)
  const dispatch = useDispatch()

  const updateprivate = async () => {
    try {
      const up = await Sharebase.updateshare(data._id, { privated: !data.privated })
      if (up) {
        console.log(up.data.data.privated);
        
        setisprivate(up.data.data.privated)
        dispatch(showtoast({ title: "success", description: `${data?.combinedata.title.substring(0, 10)}... is updaterd`, icon: "error", timeout: 3000, color: "-emerald-600", bgcolor: "neutral-900", position: "bottom_right" }))
      }
    } catch (error) {
      console.log(error);
      dispatch(showtoast({ title: "update not found", icon: "error", timeout: 3000, color: "-red-600", bgcolor: "neutral-900", position: "bottom_right" }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 10 },
      }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className=' group border-b-[1px] border-t-[1px] py-2 border-transparent duration-75 hover:border-neutral-400/50 grid grid-cols-5 w-full capitalize text-[1rem] font-semibold text-neutral-400 cursor-default'>

      <div className=' col-span-2 w-[90%]  flex flex-col justify-between'>
        <Link to={`${import.meta.env.VITE_BASE_URL}/doc/${data.combinedata._id}`} className='truncate'>{data.combinedata.title}</Link>
        <Link to={`${import.meta.env.VITE_BASE_URL}/share/${data._id}`} target='_blank' className='truncate lowercase text-[0.7rem] hover:text-emerald-500'>{`${import.meta.env.VITE_BASE_URL}/share/${data._id}`}</Link>
      </div>

      <div className=' flex items-center justify-start'>
        {isprivate ? (<button
          onMouseLeave={() => setisprivate(data?.privated)}
          onMouseEnter={() => setisprivate(pre => !pre)}
          onClick={updateprivate}><Tag text={"private"} dot={true} dotcolor={"bg-rose-500"} color={"text-rose-200"} bg={"bg-rose-800/40"} /></button>) :
          (<button
            onMouseLeave={() => setisprivate(data?.privated)}
            onMouseEnter={() => setisprivate(pre => !pre)}
            onClick={updateprivate}><Tag text={"live"} dot={true} dotcolor={"bg-emerald-400"} color={"text-emerald-200"} bg={"bg-emerald-800/40"} /></button>)}
      </div>

      <div className=' flex items-center justify-start'>
        <p className='text-[0.9rem]'>{data?.views}</p>
      </div>

      <div className=' flex items-center justify-between'>
        <p className='text-[0.9rem]'>{data?.createdAt.substring(0, 10)}</p>
        <button
          onClick={() => deletefun(data._id)}
          className='hidden group-hover:block'><Gicon icon={"delete"} /></button>
      </div>

    </motion.div>
  )
}