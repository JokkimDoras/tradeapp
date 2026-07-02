import { useState,useEffect } from "react";

function getDevice() {
    return window.matchMedia("(min-width:1024px)").matches
    ? 'desktop'
    :window.matchMedia("(min-width: 640px)").matches
    ?'tablet'
    :'mobile'
}
function useMediaQuery() {
    const [device,setDevice] = useState<'mobile' | 'tablet' | 'desktop' | null>(getDevice())

    useEffect(() => {
        //initial check
     const checkDevice = () => {
        setDevice(getDevice());
     }
     checkDevice();

     window.addEventListener('resize',checkDevice)

     return () => window.removeEventListener('resize',checkDevice)
    },[])


    return {
        device,
        setDevice
    }


}

export default useMediaQuery;