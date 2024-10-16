import { Outlet } from "react-router-dom";
import Navbar from "./compos/Navbar";
import { useEffect, useState } from "react";
import Authbase from "./api/Auth";
import { useDispatch } from "react-redux";
import { storelogin } from "./store/userslice";
import { Pageloading } from "./utiles/Pageloading";
import { showtoast } from "./store/Toastslice";

function App() {
  const dispatch = useDispatch()
  const [loading, setloading] = useState(true)
  const [data, setdata] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const clinet = await Authbase.currentclient()
        const response = clinet?.data.data
        console.log(response);
        
        if (response._id) {
          setdata(response)
          setloading(false)
          dispatch(storelogin(response._id))
        }
        console.log(response);
      } catch (error) {
        setloading(false)
        console.log(error);
        dispatch(showtoast({title: "something went wrong", icon:"home", timeout:5000, color:"-red-600", bgcolor:"neutral-900", position:"bottom_left"}))
      }
    })()
  }, [])

  return !loading ? (
    <>
      <Navbar auther={data} />
      <Outlet />
    </>
  ) : <Pageloading />
}

export default App
