import Optionbox from '../../Optionbox'
import { useDispatch } from 'react-redux'
import { setrandercompo } from '../../../store/dashslice'
import { useEffect, useState } from 'react'
import Authbase from '../../../api/Auth'
import { Gicon } from '../../../utiles/Gicon'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Coreai from '../Coreai'

const Aiask = () => {
    const dispatch = useDispatch()
    const [users, setusers] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const add = async (data) => {
        try {
            const added = await Authbase.addapikey(data.key)
            if (added) {
                setusers(added.data.data)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        (async () => {
            try {
                const user = await Authbase.getapikey()
                console.log(user);
                setusers(user.data.data)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <Optionbox dialog={"just ask"}
            classes={" w-[65%] h-[80vh]"}
            closehandel={() => dispatch(setrandercompo(null))} >
            <div className=' py-3 h-full'>
                {users?.apikey ? (
                    <Coreai data={users} />
                ) : (
                    <div className=' flex items-center justify-center h-full flex-col gap-10'>
                        <h2 className=' capitalize text-neutral-200 font-semibold text-[1.2rem] mingzat'>i need an apikey of gemini al</h2>
                        <p className='text-[0.8rem] capitalize text-neutral-400'>started with the Gemini API | <Link className="text-blue-400" target='_blank' to={"https://aistudio.google.com/app/apikey"}>craete api key</Link></p>
                        <form onSubmit={handleSubmit(add)} className='w-[70%] flex items-center justify-between bg-neutral-600 pl-5  p-1 rounded-full'>
                            <input
                                {...register("key", { required: "key is reqired" })}
                                type="text" placeholder='add your key here' className='outline-none border-none  w-[80%] bg-transparent  placeholder:uppercase placeholder:text-[0.8rem] placeholder:text-neutral-200' />
                            <button className='w-6 h-6 rounded-full flex items-center justify-center bg-blue-600'><Gicon icon={"arrow_forward"} /></button>
                        </form>
                        <p className="text-[0.8rem] tracking-tight text-red-500 font-thin">{errors.key && errors.key.message}</p>
                    </div>
                )}
            </div>
        </Optionbox>
    )
}

export default Aiask
