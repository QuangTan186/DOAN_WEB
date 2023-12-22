import React, { useEffect, useState, useMemo } from "react";
import {IconDown} from "../../../../assets/icons/list-Icon";
import styles from './listHeaderShop.module.scss'
import ToolTipRender from "../../../../components/ToolTipRender/ToolTipRender";
import { useDispatch, useSelector } from 'react-redux';
import CategoryAction from "../../../../redux/category/action";

function HeaderToolTip(props) 
{
    const { onchange } = props
    const dispatch = useDispatch()
    const [listHeaderShop, setListHeaderShop] = useState([]);
    useEffect(() => {
        dispatch({
            type: CategoryAction.GET_LIST_TREE_CATEGORY,
            onSuccess: (data) => {
                setListHeaderShop(data?.data?.result?.child)
            },
        })
    }, [])


    return (
        <div>
            <div className={styles.listHeaderShop}>
                {listHeaderShop?.map( item => {
                    return (
                        <ToolTipRender onchange={onchange} optionName={item?.data?.name} optionId={item?.data?.id} listData={item?.child} />
                    )
                })}
                <ToolTipRender onchange={onchange} optionName={"Thử Đồ"} optionId={-1 } listData={[]} />
            </div>
        </div>
    )
}

export default HeaderToolTip