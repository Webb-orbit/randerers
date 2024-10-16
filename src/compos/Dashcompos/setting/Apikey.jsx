/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "../../../utiles/Reveal";
import Authbase from '../../../api/Auth';
import { useDispatch } from 'react-redux';
import { showtoast } from '../../../store/Toastslice';
import { useForm } from 'react-hook-form';

// TRY HOW TO PASS DATA AND UPDATE  WITH DEFF COMPOS

const Apikey = () => {
  const [apikey, setapikey] = useState("")
  const [loading, setloading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const fetch = await Authbase.getapikey()
        const res = fetch.data.data
        setloading(false)
        setapikey(res.apikey)
      } catch (error) {
        console.log(error);
      }
    })()

    return () => {
      setloading(true)
    }
  }, [])


  return !loading ? (
    <>
      {apikey ? (<Havekey apikey={apikey} /> ) : (<Nohaveksy apikey={apikey} />)}
    </>
  ) : null
}

export default Apikey



const Havekey = ({ apikey }) => {

  const dispatch = useDispatch()

  const deletekey = async () => {
    try {
      const dele = await Authbase.deleteapikey()
      console.log(dele.data.data);
      dispatch(showtoast({ title: "uh sad, your key is deleted", icon: "sentiment_dissatisfied", timeout: 3000, color: "-white", bgcolor: "neutral-900", position: "bottom_left" }))
    } catch (error) {
      dispatch(showtoast({ title: "something wrong", icon: "home", timeout: 3000, color: "-red-600", bgcolor: "neutral-900", position: "bottom_left" }))
    }
  }

  return (
    <div className=' flex flex-col items-center w-[40rem] mx-auto'>
      <TextRevealCard
        text="Reveal your key"
        revealText={apikey}
        className={"bg-transparent"}
        bg={"bg-neutral-950 "}
      >
        <TextRevealCardTitle>
          Add Your Gemini API Key to Unlock AI Functions
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          Gemini provides a seamless way to enhance your AI-powered applications by integrating its robust API.
        </TextRevealCardDescription>
      </TextRevealCard>
      <div className='self-end py-5'>

        <button
          onClick={deletekey}
          className=' outline-1 outline-neutral-400/80 hover:outline  px-2 py-1 bg-neutral-800/80 uppercase font-semibold rounded-md noto-sans text-[0.8rem]'>delete key</button>
      </div>

    </div>
  )
}

const Nohaveksy = ({ apikey }) => {
  const { register, handleSubmit} = useForm()

  const addkey = async (data) => {
    try {
      const add = await Authbase.addapikey(data.key)
      console.log(add);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=' flex flex-col items-center w-[40rem] mx-auto'>
      <p>Gemini allows you to supercharge your documents by integrating powerful AI capabilities</p>
      <div className='w-full py-5'>
        <form onSubmit={handleSubmit(addkey)} className='flex gap-5'>
          <input
            {...register("key", { required: "key is required"})}
            className='w-full bg-zinc-900 outline-none rounded-sm px-2 py-1 text-neutral-300 font-mono text-[0.9rem]'
            type="text" />
          <button
            type='submit'
            className=' outline-1 outline-neutral-400/80 hover:outline  px-2 py-1 bg-neutral-800/80 uppercase font-semibold rounded-md noto-sans text-nowrap text-[0.8rem]'>add key</button>
        </form>
      </div>
    </div>
  )
}