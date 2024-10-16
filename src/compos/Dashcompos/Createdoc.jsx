import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Docsbase from '../../api/Docs'
import { useDispatch, useSelector } from 'react-redux'
import { createroute } from '../../store/dashslice'
import { showtoast } from '../../store/Toastslice'
import Optionbox from '../Optionbox'

const Createdoc = () => {
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const { createnew } = useSelector(state => state.dashstore.routes)
    const dispatch = useDispatch()

    const createdoc = async () => {
        try {
            const newdoc = await Docsbase.createdoc(name)
            if (newdoc.err) {
                throw new Error("something wrong when createing document")
            }
            if (newdoc.data.data) {
                dispatch(showtoast({ title: "Document created", icon: "done", timeout: 3000, color: "-green-600", bgcolor: "neutral-700", position: "bottom_right" }))
                dispatch(createroute(false))
                navigate(`/doc/${newdoc.data.data._id}`)
            }
        } catch (error) {
            console.log(error);
            dispatch(showtoast({ title: "OPPS! something went wrong", icon: "opps", timeout: 3000, color: "-red-600", bgcolor: "neutral-900", position: "bottom_right" }))
        }
    }

    const closehandelfun = () => {
        dispatch(createroute(null))
    }
    return createnew ? (
        <Optionbox
            dialog={"Are you sure?"}
            classes={"static w-[45%] min-h-[20rem] h-[50vh] "}
            closehandel={closehandelfun}
            container={"flex backdrop-blur-sm items-center  z-[999]  justify-center"}>
            <div className='w-full h-full overflow-y-scroll scroll flex items-center justify-center flex-col'>
                <p className=' capitalize text-neutral-300 font-normal'>enter a title to create new document</p>
                <div className=' flex w-full bg-neutral-800 py-2 px-5 rounded-lg items-center justify-between'>
                    <input
                        onChange={(e) => setname(e.target.value)}
                        value={name}
                        type="text" placeholder='Document name' spellCheck={false} className=' selection:bg-white selection:text-black font-light w-[80%] bg-transparent outline-none border-none' />
                    <button onClick={createdoc} className='font-medium '>create</button>
                </div>
            </div>
        </Optionbox>
    ) : null
}

export default Createdoc