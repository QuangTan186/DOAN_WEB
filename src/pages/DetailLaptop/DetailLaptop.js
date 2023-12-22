/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import styles from './DetailLaptop.module.scss'
import Header from "../../components/Header/Header";
import { useDispatch } from 'react-redux';
import ProductAction from "../../redux/product/action";
import CartAction from "../../redux/cart/action";
import Button from '@mui/material/Button';
import useRouter from "../../hooks/use-router";
import Utils from "../../utils/Utils";
import { ToastContainer } from 'react-toastify';
import convertStringToNumber from "lib-pbl6"
import { Fade } from "react-slideshow-image";
import { TextField } from "@mui/material";
import IconAvatar from "../../assets/icons/icon-avatar";
import {IconButton} from "@mui/material";
import { mesageSent } from "../../assets/images";
import CommentAction from "../../redux/comment/action";
import Footer from "../../components/Footer/Footer";
import SizeProduct from "../../components/Product/SizeProduct";
function DetailLaptop(props) 
{
    const dispatch = useDispatch()
    const router = useRouter();
    const [ valueInput, setValueInput ] = React.useState("");
    const [product, setListProduct] = useState([]);
    const [comment, setComment] = useState([]);
    const [listSize, setListSize] = useState([]);
    const [listColor, setListColor] = useState([]);
    const sizeRef = useRef();
    const colorRef = useRef();
    const getProduct = async(prdId) => {
        dispatch({
            type: ProductAction.GET_PRODUCT_BY_ID,
            data: { IdProduct: prdId },
            onSuccess: (data) => {
                setListProduct(data?.data?.result)

            },
        })
    }   

    const handleAddComment = async() => {
        let params = { ...router.getAll() };
        if(valueInput?.length > 200 || valueInput?.length < 10 )
        {
            Utils.showErrorToast({
                message: "Vui lòng nhập bình luận từ 10 - 200 kí tự!"
            })
            return
        }
        dispatch({
            type: CommentAction.ADD_COMMENT,
            data: {
                comment: valueInput,
                productId: params?.prd ,
            },
            onSuccess: () => {
                setValueInput('')
                Utils.showSuccessToast({
                    message: "Thêm bình luận thành công",
                })
                getComment(params?.prd)
            },
            onError: () => {
                Utils.showErrorToast({
                    message: "Vui lòng đăng nhập để thêm bình luận"
                })
            }
        })
    }   

    const getComment = async(prdId) => {
        dispatch({
            type: CommentAction.GET_COMMENT,
            param: { idProduct: prdId },
            onSuccess: (data) => {
                setComment(data?.data?.result)
            },
        })
    }
    
    const getListSize = async() => {
        dispatch({
            type: ProductAction.GET_LIST_SIZE,
            onSuccess: (data) => {
                setListSize(data?.data?.result)
            },
        })
    }

    const getListColor = async() => {
        dispatch({
            type: ProductAction.GET_LIST_COLOR,
            onSuccess: (data) => {
                setListColor(data?.data?.result)
                console.log(data?.data?.result)
            },
        })
    }
    useEffect(() => {
        let params = { ...router.getAll() };
        getProduct(params?.prd)
        getComment(params?.prd)
        getListSize()
        getListColor()
    }, [])

    let dataDetail = [{key: "Phong cách", value: '-'},{key: "Mùa", value: '-'},{key: "Kiểu mẫu", value: '-'},{key: "Chất liệu", value: '-'},{key: "Nguồn gốc", value: '-'},{key: "Thương hiệu", value: '-'}]
    product?.detailProduct?.split('//')?.map((item) => {
        var it = item?.split('/')
        var keys = '';
        if(it[0] === 'style')
        {
            dataDetail[0].value = it[1]
        }  
        else if (it[0] === 'season')
        {
            dataDetail[1].value = it[1]
        }
        else if (it[0] === 'type')
        {
            dataDetail[2].value = it[1]
        }
        else if (it[0] === 'material')
        {
            dataDetail[3].value = it[1]
        }
        else if (it[0] === 'Origin')
        {
            dataDetail[4].value = it[1]
        }
        else if (it[0] === 'brand')
        {
            dataDetail[5].value = it[1]
        }
        
    })
    
    const addProductToCart = () => {
        console.log(sizeRef.current.getChildValue())
        let params = { ...router.getAll() };
        dispatch({
            type: CartAction.ADD_TO_CART,
            data: 
                { 
                    productId: params.prd,
                    quantity: 1,
                    note: "",
                    sizeId: sizeRef.current.getChildValue() ?? 0,
                    colorId: colorRef.current.getChildValue() ?? 0
                },
            onSuccess: (data) => {
                router.push({
                    pathname: '/cart',
                    params: {
                        orcd: data?.data?.result?.id,
                        ...params,
                    }
                })
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: "Vui lòng đăng nhập để tiếp tục",
                })
            },
        })
    }
    return (
        // eslint-disable-next-line no-unreachable
        <div className={styles.shopOnlineMain}>
            <ToastContainer />
            <Header />
            <div className={styles.headerContent}>
                <div className={styles.headerTitle}>
                    {product?.name}
                </div>
                <div className={styles.detailProduct}>
                    <div className={styles.imageProduct}>
                        <Fade
                            cssClass="imageList"
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <img 
                                    src={product?.avtImageUrl}
                                    width={350}
                                />
                            </div>
                            {product?.imageUrl?.map((item) => {
                                return (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <img 
                                            src={item}
                                            width={350}
                                        />
                                    </div>
                                )
                            })}
                        </Fade>
                        
                    </div>
                    <div className={styles.productSale}>
                        <div className={styles.productPrice}>
                            <div className={styles.productPriceLeft}>
                                <div className={styles.price}>
                                    {convertStringToNumber((product?.price ?? 0)?.toString(), true)} 
                                </div>
                            </div>
                            
                        </div>
                        <div className={styles.productPromotion}>
                        {dataDetail?.map((item) => {
                        if(item?.value !== '' 
                            && typeof item?.key !== 'undefined' 
                            && typeof item?.value !== 'undefined' 
                        )
                        {
                            return (
                            <div style={{ marginBottom: '5px'}}>
                                <span  style={{fontWeight: 'bold'}}>{item?.key}</span> : {item?.value}
                            </div>
                            )
                        }
                    })}
                            <div style={{fontWeight: 'bold'}}>Màu sắc:</div>
                            <div className={styles.itemSize}>
                                <SizeProduct  listItem={listColor} ref={colorRef} />
                            </div>
                            <div style={{marginTop: '10px', fontWeight: 'bold'}}>Kích thước:</div>
                            <div className={styles.itemSize}>
                                <SizeProduct listItem={listSize} ref={sizeRef} />
                            </div>
                        </div>
                        <Button className={styles.buttonDesign}
                            onClick={addProductToCart}
                        >
                            <div className={styles.buyNow}>
                                Đặt ngay
                            </div>
                            <div className={styles.buyNowDetail}>
                                Giao hàng tận nơi hoặc nhận tại cửa hàng
                            </div>
                        </Button>

                        

                    </div>
                </div>
            </div>
            <div className={styles.mainContent}>
               
                <div className={styles.mainContentRight}>
                    <div className={styles.mainContentRightHeader}>
                        MÔ TẢ SẢN PHẨM
                    </div>
                    <div className={styles.mainContentRightTitle}>
                        <h3 style={{fontWeight: '600'}}>
                            {product?.name}
                        </h3>
                    </div>
                    <div className={styles.content}>
                        <div
                            style={{
                                maxHeight: '800px'
                            }}
                            dangerouslySetInnerHTML={{__html: product?.description}}
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    marginLeft: '270px',
                    width: '80%'
                }}
            >
                <div
                    style={{
                        fontSize: '22px',
                        fontWeight: '600',
                        marginBottom: '20px'
                    }}
                >
                    Bình luận
                </div>
                <div>
                <TextField
                    label='Mời bạn để lại bình luận... '
                    value={valueInput}
                    onChange={(e) => {
                        setValueInput(e?.target?.value);
                    }}
                    onKeyDown={(e) => {
                        if (e?.keyCode === 13)
                        {
                            handleAddComment()
                        }
                    }}
                    variant="outlined"
                    sx={{ 
                        width: '640px',
                        height: '40px',
                        border: '0px',
                        marginBottom: '40px',
                        padding: '0px'
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                onClick={(e) => handleAddComment() }
                                style={{
                                    padding: 0
                                }}
                            >
                                <img 
                                    width={30}
                                    height={30}
                                    src={mesageSent} 
                                    style={{
                                        padding: 0
                                    }}
                                />
                            </IconButton>
                        ),
                        }}
                />
                </div>
                {comment?.map(item => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                marginTop: '20px',
                                marginLeft: '20px',
                                marginBottom: '20px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '50px',
                                    height: '50px'
                                }}
                            >
                                <IconAvatar />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                }}
                            >
                                <div>
                                    {item?.username}
                                </div>
                                <div>
                                    {item?.commentUser}
                                </div>
                            </div>
                        </div>
                        )
                })}
            </div>
            <Footer />
        </div>
        
    )
}

export default DetailLaptop