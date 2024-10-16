import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Docsbase from '../api/Docs'
import { Minwidth } from '../utiles/Minwidth'
import plaintohtml from 'markdown-to-htm'
import "../edit.css"
import { Skeleton } from '@mui/material'
import Dashnavbar from '../compos/Dashcompos/Dashnavbar'
import Buttons from '../utiles/Buttons'
import Docoptions from '../compos/Docucopos/Docoptions'
import { useForm } from 'react-hook-form'
import { Gicon } from '../utiles/Gicon'

export const Docunemt = () => {
    const { docid } = useParams()
    const [document, setdocument] = useState(null)
    const docuref = useRef(null)
    const previewref = useRef(null)
    const [editor, seteditor] = useState(false)
    const [predit, setpredit] = useState(false)
    const [defultextval, setdefultextval] = useState("")

    const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm()

    useEffect(() => {
        (async () => {
            try {
                const document = await Docsbase.getonedocument(docid)
                setdocument(document.data.data)
                setdefultextval(document.data.data.content)
                setValue("title", document.data.data.title)
            } catch (error) {
                console.log(error);
            }

            return () => {
                setdocument(null)
            }
        })()
    }, [docid])


    const savechange = async () => {
        try {
            console.log("update");
            const update = await Docsbase.updatedocument(document._id, { content: defultextval })
            if (update) {
                seteditor(false)
                setdocument(update.data.data)
                setdefultextval(update.data.data.content)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cancelchange = () => {
        seteditor(false)
        setpredit(false)
    }

    const renamedoc = async (data) => {
        try {
            const update = await Docsbase.updatedocument(document._id, { title: data.title })
            if (update) {
                setdocument(update.data.data)
                setValue("title", update.data.data.title)
            }
        } catch (error) {
            setValue("title", document.title)
            console.log(error);
        }
    }

    useEffect(() => {
        if (document && docuref.current !== null) {
            const temp = document.content ? document.content : "hello how are you"
            docuref.current.innerHTML = plaintohtml(temp)
            setdefultextval(document.content)
        }

    }, [document, editor])

    useEffect(() => {
        if (previewref.current !== null) {
            previewref.current.innerHTML = plaintohtml(defultextval)
        }
    }, [predit])

    return document ? (
        <>
            <Dashnavbar data={document} />
            <Docoptions />
            <Minwidth>
                <div className='py-10 text-neutral-300 mingzat tracking-tighter flex justify-between items-center '>
                    <div>
                        <form onSubmit={handleSubmit(renamedoc)}>
                            <input
                                {...register("title", { maxLength: { value: 100, message: "you have max 100 charaters" }, minLength: { value: 5, message: "you have at least 5 charaters" } })}
                                type="text" spellCheck={false} disabled={isSubmitting} className={` bg-transparent border-none outline-none text-[2.5rem] font-extrabold truncate w-[95%] ${isSubmitting && "animate-pulse"}`} />
                        </form>
                        <p className="text-[0.6rem] animate-pulse tracking-tight text-red-500 font-thin">{errors.title && errors.title.message}</p>
                    </div>
                    <div>
                        <button 
                        className={`${editor && "border-b-2 border-neutral-400"}`}
                        onClick={()=> seteditor(pre=> !pre)}>
                            <Gicon classes={"text-xl"} icon={"ink_pen"}/>
                        </button>
                    </div>
                </div>
                <div className='w-full h-full '>
                       { editor && <div className='flex flex-col gap-5 h-full w-full'>
                            <div className=' flex gap-2 items-center justify-between'>
                                <div className='flex gap-2'>
                                    <Buttons onClick={() => setpredit(false)} bclass={`text-[0.8rem] rounded-sm ${!predit && "bg-neutral-200 text-black"} `}>editor</Buttons>
                                    <Buttons onClick={() => setpredit(true)} bclass={` text-[0.8rem] rounded-sm ${predit && "bg-neutral-200 text-black"} `}>preview</Buttons>
                                </div>
                                <div className='flex gap-2'>
                                    <Buttons onClick={savechange} bclass={"text-[0.8rem] rounded-sm bg-green-600 "}>save</Buttons>
                                    <Buttons onClick={cancelchange} bclass={"text-[0.8rem] rounded-sm  bg-red-600"}>cancel</Buttons>
                                </div>
                            </div>
                            {predit ? (
                                <div
                                    className=' rounded-md bg-neutral-950 p-5 h-[90vh] scroll overflow-y-scroll'
                                    ref={previewref}></div>
                            ) : (
                                <textarea
                                    onChange={(e) => setdefultextval(e.target.value)}
                                    value={defultextval}
                                    spellCheck={false} className=' rounded-md resize-none outline-none border-none bg-neutral-950 p-5 h-[90vh] scroll'></textarea>
                            )}
                        </div>}

                        {!editor && <div className={`whitespace-pre-wrap py-8 text-neutral-300`} ref={docuref}></div>}
                </div>
            </Minwidth>
        </>
    ) : <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        className='w-[90%] min-h-[11rem]'
    />
}
