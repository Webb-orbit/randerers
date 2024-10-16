import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Authbase from '../../api/Auth';
import { useDispatch } from 'react-redux';
import { storelogin } from '../../store/userslice';
import { Pageloading } from '../../utiles/Pageloading';
import Createdoc from './Createdoc';
import Switchdocs from './Switchdocs';
import { useSelector } from 'react-redux';

const Indexdash = () => {
  const { compo } = useSelector(state => state.dashstore.randers)

  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        const clinet = await Authbase.currentclient()
        const response = clinet?.data.data
        if (response._id) {
          setloading(false)
          dispatch(storelogin(response._id))
        }
        console.log(response);
      } catch (error) {
        setloading(false)
        console.log(error);
        // ADD TOAST
      }
    })()
  }, [])

  // FIXED THE REDUX COMPO PRO

  return !loading ? (
    <>
      {compo}
      <Createdoc />
      <Switchdocs />
      <Outlet />
    </>
  ) : <Pageloading />
}

export default Indexdash