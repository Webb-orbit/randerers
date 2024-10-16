import Optionbox from '../../Optionbox'
import { useDispatch } from 'react-redux'
import { deleteoption, setrandercompo } from '../../../store/dashslice'
import { useNavigate, useParams } from 'react-router-dom'
import Buttons from '../../../utiles/Buttons'
import Docsbase from '../../../api/Docs'
import { showtoast } from '../../../store/Toastslice'

const Deletedoc = () => {
    const dispatch = useDispatch()
    const { docid } = useParams()
    const navigate = useNavigate()

    const deletehandel = async () => {
        try {
            const dele = await Docsbase.deletedocument(docid)
            if (dele) {
                dispatch(showtoast({ title: "Document deleted", icon: "done", timeout: 3000, color: "-green-600", bgcolor: "neutral-700", position: "bottom_right" }))
                dispatch(deleteoption(false))
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error);
            dispatch(showtoast({ title: "OPPS! something went wrong", icon: "opps", timeout: 3000, color: "-red-600", bgcolor: "neutral-700", position: "bottom_right" }))
        }
    }

    return (
        <Optionbox
            dialog={"Are you sure?"}
            classes={"static w-[25rem] h-[10rem]"}
            container={"flex backdrop-blur-sm items-center justify-center"}
            closehandel={() => dispatch(setrandercompo(null))} >
            <div className='py-2 flex flex-col  justify-center h-full gap-3'>
                <div>
                    <p className='text-[0.6rem] text-neutral-300 uppercase font-medium'> document id : {docid}</p>
                    <p className='text-[0.8rem] text-neutral-300'>This action cannot be undone. This will permanently delete your document</p>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Buttons onClick={() => dispatch(setrandercompo(null))} bclass={"text-[0.8rem] bg-neutral-700 text-white hover:bg-neutral-800 hover:text-white "}>cancel</Buttons>
                    <Buttons onClick={deletehandel} bclass={"text-[0.8rem] bg-neutral-300 text-black hover:bg-neutral-400 hover:text-black "}>YES, Delete</Buttons>
                </div>
            </div>
        </Optionbox>
    )
}

export default Deletedoc