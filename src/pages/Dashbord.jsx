import { useEffect, useState } from 'react'
import { Combo, Comboitems, Selectitem } from '../utiles/Combo'
import { Gicon } from '../utiles/Gicon'
import Buttons from '../utiles/Buttons'
import { Docard } from '../compos/Docard'
import { Minwidth } from '../utiles/Minwidth'
import Docsbase from '../api/Docs'
import { Skashbordcards } from '../skeletons/Skdashbordcards'
import { Blockerror } from '../utiles/Blockerror'
import { Searchinput } from '../utiles/Searchinput'
import { useNavigate } from 'react-router-dom'
import Dashnavbar from '../compos/Dashcompos/Dashnavbar'
import { useDispatch } from 'react-redux'
import { createroute, setrandercompo } from '../store/dashslice'
import Setting from '../compos/Dashcompos/Setting'

const Dashbord = () => {
    const [workactive, setworkactive] = useState(false)
    const [haserror, sethaserror] = useState(false)
    const [spacename, setspacename] = useState("online")
    const [documents, setdocuments] = useState([])
    const [docinfo, setdocinfo] = useState({})
    const [keyword, setkeyword] = useState("")
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const placeholders = [
        "Search Dour Documents",
        "Space Enter To Reset",
    ];

    const compobj = {
        settingcompo: <Setting key={"setting"}/>,
    }

    useEffect(() => {
        (async () => {
            try {
                const docs = await Docsbase.getalldocs()
                if (docs?.err) {
                    throw new Error(docs.message)
                }
                const response = docs.data.data
                setdocuments(response.doc)
                setdocinfo(response)
                console.log(response);
            } catch (error) {
                sethaserror(true)
                console.log(error);
            }
        })()
    }, [])

    const searchDoc = async () => {
        try {
            const docs = await Docsbase.getalldocs(undefined, undefined, keyword)
            if (docs?.err) {
                throw new Error(docs.message)
            }
            const response = docs.data.data
            setdocuments(response.doc)
            setdocinfo(response)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    const nextpage = async (naxtpagec) => {
        try {
            console.log("run", naxtpagec);
            const docs = await Docsbase.getalldocs(naxtpagec)
            if (docs?.err) {
                throw new Error(docs.message)
            }
            const response = docs.data.data
            setdocuments(response.doc)
            setdocinfo(response)
            console.log(docinfo);
            navigate("#")
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <Dashnavbar />
            <Minwidth>

                <div className='pt-20 flex flex-col gap-16 pb-10 '>
                    <div className=''>
                        <div className='flex items-center justify-between '>
                            <Combo setactive={setworkactive} active={workactive} name={spacename} >
                                <Comboitems active={workactive} classes={"absolute left-0 top-14"}>
                                    <Selectitem select={spacename} setselect={setspacename} value={"online"}>online</Selectitem>
                                    <Selectitem select={spacename} setselect={setspacename} value={"offline"} >offline</Selectitem>
                                </Comboitems>
                            </Combo>
                            <div className=' flex items-center justify-center gap-8'>
                                <button 
                                onClick={()=> dispatch(setrandercompo(compobj?.settingcompo))}
                                className='py-2 px-2 cursor-pointer select-none rounded-md hover:bg-zinc-900 flex items-center justify-center'>
                                    <Gicon icon={"settings"} />
                                </button>
                                <Buttons onClick={() => dispatch(createroute())} bclass={"bg-green-600 hover:bg-green-700"} ><Gicon icon={"add"} />new</Buttons>
                            </div>
                        </div>
                    </div>

                    <div className=' flex items-center justify-between w-full'>
                        <div className='w-[50%]'>
                            <Searchinput
                                onChange={(e) => setkeyword(e.target.value)}
                                onSubmit={searchDoc}
                                placeholders={placeholders} />
                        </div>
                    </div>

                    <div>
                        {haserror ? (<Blockerror message={"something went wrong"} />) : (
                            docinfo.limit ? (
                                docinfo.count > 0 ? (
                                    <div>
                                        <div className='flex flex-wrap justify-start gap-10'>
                                            {documents?.map((e) => (
                                                <Docard key={e._id} data={e} />
                                            ))}
                                        </div>
                                        <div className='flex items-center justify-between py-7'>
                                            <p className='text-neutral-300 uppercase text-[0.9rem] font-medium'>{`${documents.length} docs / ${docinfo.count}`}</p>
                                            <div className=' flex gap-5'>
                                                <button 
                                                disabled={docinfo.page==0}
                                                onClick={()=> nextpage(docinfo.page-1)}
                                                className=' font-medium uppercase text-[0.9rem] py-0 rounded-sm px-1 disabled:text-neutral-400 flex items-center hover:text-neutral-300 '><Gicon icon={"arrow_back_ios_new"} />prev</button>
                                                <p>{docinfo.page}</p>
                                                <button 
                                                onClick={()=> nextpage(docinfo.page+1)}
                                                disabled={!docinfo.hasmore} className=' font-medium uppercase text-[0.9rem] py-0 rounded-sm px-1 disabled:text-neutral-400 flex items-center hover:text-neutral-300 '>next<Gicon icon={"arrow_forward_ios"} /></button>
                                            </div>
                                        </div>
                                    </div>

                                ) : (
                                    <>no docs found...</>
                                )

                            ) : (<Skashbordcards number={9} />)
                        )}
                    </div>

                </div>
            </Minwidth>
        </>

    )
}

export default Dashbord