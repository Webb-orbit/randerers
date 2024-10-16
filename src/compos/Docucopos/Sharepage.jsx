import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { showtoast } from '../../store/Toastslice';
import Sharebase from '../../api/Share';
import { Pageloading } from '../../utiles/Pageloading';
import Sharenavbar from './sharepagecompos/sharenavbar';
import Shareheader from './sharepagecompos/Shareheader';
import { Minwidth } from '../../utiles/Minwidth';
import plaintohtml from 'markdown-to-htm';

const Sharepage = () => {
    const { shareid } = useParams()
    const dispatch = useDispatch()
    const [sharedata, setsharedata] = useState(null)
    const [error, seterror] = useState(false)
    const contentref = useRef(null)

    useEffect(() => {
        let timeout;
        (async () => {
            try {
                const share = await Sharebase.getoneshare(shareid)
                const shareres = share.data.data
                setsharedata(shareres)
                console.log(shareres);
                timeout = setTimeout(() => {
                    (async () => {
                        await Sharebase.updateshare(shareres._id, { views: eval(shareres.views + 1) })
                    })()
                }, 1000);
            } catch (error) {
                seterror(true)
                console.log(error);
                dispatch(showtoast({ title: "document not found", icon: "home", timeout: 5000, color: "red-600", bgcolor: "neutral-900", position: "bottom_left" }))
            }
        })()

        return () => {
            clearTimeout(timeout)
            setsharedata(null)
            seterror(false)
        }
    }, [shareid])


    useEffect(() => {
        if (sharedata && contentref.current !== null) {
            const temp = sharedata.doc.content ? sharedata.doc.content : "something went wrong / no data"
            contentref.current.innerHTML = plaintohtml(temp)
        }

    }, [sharedata, contentref])

    if (error) {
        return (
            <div className='fixed w-full h-screen top-0 left-0 flex items-center justify-center flex-col gap-2'>
                <h3 className='capitalize'>this page is private now!!!</h3>
            </div>
        )
    }



    return sharedata ? (
        <>
            <Sharenavbar data={sharedata} />
            <Minwidth>
                <Shareheader data={sharedata} />
                <div className='py-20' ref={contentref}></div>
            </Minwidth>
        </>
    ) : (<Pageloading />)
}

export default Sharepage