/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hidetoast } from '../store/Toastslice'
import { motion } from 'framer-motion'
import { Gicon } from './Gicon'

export const Toast = () => {

  const { darkmatter, title, readonly, description, icon, timeout, callback, color, bgcolor, position } = useSelector(state => state.toaststore);

  const dispatch = useDispatch();

  const positionobj = {
    "bottom_right": "bottom-3 right-3",
    "bottom_left": "bottom-3 left-3",
    "top_right": "top-3 right-3",
    "top_left": "top-3 left-3",
  }

  useEffect(() => {
    const timed = setTimeout(() => {
      dispatch(hidetoast())
    }, timeout)

    return () => {
      if (timed){
        clearTimeout(timed)
      } 
    }
  }, [darkmatter])

  return !darkmatter ? (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`w-2/6 h-[4rem] select-none overflow-hidden flex items-center justify-between p-2 py-1 z-[999999] fixed ${positionobj[position]}  rounded-md text${color} bg-${bgcolor}`}>
      {icon && !readonly && <Gicon classes={`self-start py-2 text-[1.2rem] text${color}`} icon={icon} />}
      <div className='p-1 flex flex-col w-[80%]'>
        {title && <h5 className={`text-${color} font-semibold mingzat text-[1.1rem] `}>{title}</h5>}
        {description && !readonly && <h5 className='font-normal mingzat text-[0.9rem] truncate'>{description}</h5>}
      </div>
      {!readonly && <div>
        {callback ? (<button onClick={() => callback()}
          className={`bg-${color} text-${bgcolor} text-[0.9rem] px-1 rounded-sm`}>hello</button>
        ) : (<Gicon onClick={() => dispatch(hidetoast())} icon={"close"} classes={" text-[1.5rem] cursor-pointer"} />)}
      </div>}
      <div
        className='  h-1 w-full absolute bottom-0 left-0'>
        <motion.div
          className={`h-full bg-${color} `}
          initial={{ width: "0" }}
          animate={{ width: "100%" }}
          transition={{ duration: timeout / 1000 }}>
        </motion.div>
      </div>
    </motion.div>
  ) : null
}
