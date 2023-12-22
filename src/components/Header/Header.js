/* eslint-disable jsx-a11y/alt-text */
import { IconButton } from "@mui/material";
import React from "react";
import { IconSearch, IconUser, IconShop } from "../../assets/icons/list-Icon";
import { ScShop } from "../../assets/images";
import HeaderToolTip from "./common/HeaderToolTip/HeaderToolTip";
import styles from './Header.module.scss'
import { Link } from "react-router-dom";
import useRouter from "../../hooks/use-router";
import * as RouterPath from '../../router/RouterPath'

const Header = (props) => {
    const { onchange, 
        onChangeSearch = () => {}
    } = props;
    const router = useRouter();
    const [valueInput, setValueInput] = React.useState('');
    return (
        <div>
            <div className={styles.shopOnlineHeader}>
                <IconButton
                    onClick={(e) => {
                        router.push({
                            pathname: '/',
                        })
                    }}
                >
                    <img src={ScShop} />
                </IconButton>

                <div className={styles.shopInputSearch}>
                    <input 
                        className={styles.shopInput} 
                        onChange = {(e) => {
                            setValueInput(e.target.value)
                        }}
                        value={valueInput}
                        onKeyDown={(e) => {
                            if( e.key === 'Enter')
                            {
                                onChangeSearch(valueInput)
                                router.push({
                                    pathname: RouterPath.CATEGORY,
                                    params: {
                                        nCtx: valueInput,
                                    }
                                })
                            }
                        }}

                    />
                    <div style={{ marginRight: 14 }}>
                        <IconSearch />
                    </div>
                </div>
                <button 
                    className={styles.shopInput}
                    onClick={(e) => {
                        router.push({
                            pathname: RouterPath.PENDING,
                        })
                    }}
                >
                    Đơn hàng của bạn
                </button>
                <div className={styles.shopIcon}>
                    <Link
                        // onClick={e =>{
                        //     router.push({
                        //         pathname: '/login',
                        //     })
                        // }}
                        to='/account'
                    >
                        <IconButton
                            onClick={e =>{
                                router.push({
                                    pathname: '/login',
                                })
                            }}
                        >
                            <IconUser />
                        </IconButton>
                    </Link>
                    <Link to='/cart'>
                        <IconButton>
                            <IconShop />
                        </IconButton>
                    </Link>
                </div>
            </div>
            <HeaderToolTip onchange={onchange}/>
        </div>
    )
}

export default Header