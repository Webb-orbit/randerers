/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Pageloading } from '../utiles/Pageloading'

const Authlayer = ({children, autharized}) => {
    const navigete = useNavigate()
    const {status} = useSelector(state=> state.clientstore)
    const [loading, setloading] = useState(true)

    useEffect(()=>{
        if(autharized && status !== autharized){
            console.log("redirect-> login");
            navigete("/login")
        }else if(!autharized && status !== autharized){
            console.log("redirect-> home");
            navigete("/")
        }
        setloading(false)
    },[autharized, navigete, status])

  return !loading?(
    <>{children}</>
  ):<Pageloading/>
}

export default Authlayer