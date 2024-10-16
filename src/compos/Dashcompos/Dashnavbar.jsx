/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import Logo from '../Logo'
import { useLocation, useParams } from 'react-router-dom'
import { Gicon } from '../../utiles/Gicon'
import Buttons from '../../utiles/Buttons'
import { Comboitems, Itembutton, Itemlink } from '../../utiles/Combo'
import { useDispatch, useSelector } from 'react-redux'
import { createroute, documentroute, setrandercompo, settingroute } from '../../store/dashslice'
import Sharebox from '../Docucopos/Optionsboxes/Sharebox'
import Setting from './Setting'

const Dashnavbar = ({ data }) => {
    const { pathname } = useLocation()
    const { docid } = useParams()
    const [docinfoactive, setdocinfoactive] = useState(false)
    const [moreopsactive, setmoreopsactive] = useState(false)
    const dispatch = useDispatch()
    const { createnew, documents } = useSelector(state => state.dashstore.routes)

    const compobj = {
        sharecompo: <Sharebox key={"sharebox"}/>,
        settingcompo: <Setting key={"setting"}/>,
    }

    useEffect(() => {
        setdocinfoactive(false)
        setmoreopsactive(false)
    }, [documents, createnew])

    useEffect(() => {
        setdocinfoactive(false)
        setmoreopsactive(false)
        dispatch(documentroute(false))
    }, [docid])

    return (
        <>
            <div className='flex items-center justify-between px-20 h-16'>
                <div className='flex items-center justify-start gap-3 relative'>
                    <Logo />
                    <p className='max-w-[15rem] w-fit truncate text-[0.9rem] text-neutral-500 select-none font-medium'>{pathname}</p>
                    <button
                        onClick={() => setmoreopsactive(pre => !pre)}
                        className=' py-1 rounded-sm px-1  hover:bg-neutral-800 '><Gicon icon={"drag_indicator"} /></button>
                    <Comboitems 
                    active={moreopsactive} classes={"absolute bg-neutral-950 left-[20rem] top-14  w-[13rem] p-1 z-[9999]"}>
                        <div className='mingzat flex flex-col gap-1 select-none '>
                            <Itemlink to={"/dashboard"}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            ><Gicon icon={"home"} />
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>Dashboard</p>
                            </Itemlink>
                            <Itembutton
                                onClick={() => dispatch(createroute())}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            ><Gicon icon={"add_circle"} />
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>new document</p>
                            </Itembutton>
                            <Itembutton
                                onClick={() => dispatch(documentroute())}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            ><Gicon icon={"share_windows"} />
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>switch document</p>
                            </Itembutton>
                        </div>
                        <hr className='border-neutral-500' />
                        <div className='mingzat flex flex-col gap-1 select-none'>
                            <Itembutton
                                onClick={() => dispatch(setrandercompo(compobj.settingcompo))}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            ><Gicon icon={"settings"} />
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>settings</p>
                            </Itembutton>
                        </div>
                    </Comboitems>
                </div>
                {data ? (
                    <div className='flex items-center justify-start gap-3 relative '>
                        <Buttons
                            onClick={() => dispatch(setrandercompo(compobj?.sharecompo))}
                            bclass={"bg-blue-600 text-[0.8rem]"}>publish</Buttons>
                        <button onClick={() => setdocinfoactive(pre => !pre)} className=' py-0 rounded-sm px-1 hover:bg-neutral-800 '><Gicon icon={"demography"} /></button>
                        <button className=' py-0 rounded-sm px-1 hover:bg-neutral-800 '><Gicon icon={"more_horiz"} /></button>

                        <Comboitems active={docinfoactive} classes={"absolute bg-neutral-950 right-0 top-14 p-4 w-[22rem]"}>
                            <div className='mingzat flex flex-col gap-5 select-none'>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>id:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data._id}</p>
                                </div>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>created:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data.createdAt.substring(0, 10)}</p>
                                </div>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>last edit:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data.updatedAt.substring(0, 10)}</p>
                                </div>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>shared:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data.shared ? "true" : "false"}</p>
                                </div>
                            </div>
                        </Comboitems>
                    </div>
                ) : (
                    <div className='flex items-center justify-start gap-3'>
                        <button className=' py-0 rounded-sm px-1 hover:bg-neutral-800 '><Gicon icon={"more_horiz"} /></button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashnavbar