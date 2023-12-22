import React, { useEffect } from "react";
import useRouter from "../../hooks/use-router";
import * as RouterPath from "../../../src/router//RouterPath"

function PageNull()
{
    const router = useRouter();

    useEffect(() => {
        let params = { ...router.getAll() };
        if(params?.vnp_ResponseCode === "00")
        {
            router.push({
                pathname: RouterPath.DETAIL_ORDER,
                params: {
                    id: params?.vnp_TxnRef,
                    stt: "Dtt"
                }
            })
        }
        else {
            router.push({
                pathname: RouterPath.DETAIL_ORDER,
                params: {
                    id: params?.vnp_TxnRef,
                    stt: "Ctt"
                }
            })
        }
    }, [])
    return <div>xxx</div>
}

export default PageNull