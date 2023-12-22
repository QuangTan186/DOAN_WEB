import React from "react";
import Header from "../../components/Header/Header";
import styles from './AccountInfo.module.scss'
import { IconRight } from "../../assets/icons/list-Icon";
import { Checkbox, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { TextField } from "@mui/material"; 
import { TextLabel } from "@findxdn/erp-theme";
import { fontSize } from "@mui/system";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LogoutIcon from '@mui/icons-material/Logout';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import LoginAction from "../../redux/login/action";
import Utils from "../../utils/Utils";
import moment from "moment";
import { CustomDatePicker } from "@findxdn/erp-theme"
import { ToastContainer, toast } from "react-toastify";
import * as RouterPath from '../../router/RouterPath'
import useRouter from "../../hooks/use-router";
import ImagePicker from "../../components/common/image-up-loading/ImageUpLoading";
import CustomDateTimePickerX from "../../components/common/date-picker/CustomDateTimePickerX";

function AccountInfo() {

    const dispatch = useDispatch()
    const router = useRouter();
    const [userInfo, setUserInfo] = React.useState();
    const [gender, setGender ] = React.useState(0);

    const getUseInfor = async () => {
        dispatch({
            type: LoginAction.GET_USER_DETAIL,
            onSuccess: (data) => {
                setUserInfo(data?.data?.result)
                setValue('firstName', data?.data?.result?.firstName)
                setValue('lastName', data?.data?.result?.lastName)
                setValue('username', data?.data?.result?.username)
                setValue('phone', data?.data?.result?.phone)
                setValue('email', data?.data?.result?.email)
                setValue('birthDay', data?.data?.result?.birthDay)//moment(data?.data?.result?.birthDay).format("DD/MM/YYYY"))
                setValue('avatarUrl', data?.data?.result?.avatarUrl)
                setGender(parseInt(data?.data?.result?.gender, 10))
            },
            onError: () => {
                router.push({
                    pathname: RouterPath.LOGIN,
                })
            }
        })
    }
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm()

    const handleSubmitData = async (data) => {
        dispatch({
            type: LoginAction.CHANGE_PROFILE,
            data: data,
            onSuccess: () => {
                Utils.showSuccessToast({
                    message: "Sửa thông tin thành công",
                })
                getUseInfor()
            },
            onError: (data) => {
                Utils.showErrorToast({
                    message: data,
                })
            }
        })
    }

    const isValidPhone = (value) =>
        ( value &&
        !/(090|093|070|072|079|077|076|078|089|088|091|094|083|084|085|081|082|032|033|034|035|036|037|038|039|086|096|097|098|099|059|092|052|056|058)+([0-9]{7})\b/i.test(
        value, ) ? 'Số điện thoại không hợp lệ'
        : undefined
    )
    const isValidEmail = email =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

    const handleEmailValidation = email => {
        const isValid = isValidEmail(email);
        return isValid;
    };

    const handlePhoneValidation = phone => {
        const isValid = isValidPhone(phone);
        return isValid;
    };
    
    const onSubmit = (data) => {
        data = { gender: gender,...data}
        handleSubmitData(data)
    }
    React.useEffect(() => {
        getUseInfor()
    }, [])

    // onSubmit={handleSubmit(onSubmit)}>
    return (
        <form onSubmit={handleSubmit(onSubmit)}>  
            <ToastContainer />
            <div className={styles.accountInfo}>
                <Header />
                <div className={styles.tiltleReturn}>
                    <div
                        onClick={e => {
                            window.location = '/'
                        }}
                        className={styles.header}
                    >
                        Trang Chủ
                    </div>
                    <IconRight />
                    Tài khoản
                </div>
                <div style={{
                    display: "flex",
                    gap: "30px",
                    marginLeft: '10%',
                    marginTop: '15px'
                }}>
                    <div className={styles.infomain}>
                        <div className={styles.avatar}>
                            <ImagePicker
                                sx={{
                                    maxWidth: '120px',
                                    maxHeight: '120px'
                                }}
                                width={100}
                                height={100}
                                defaultValue={'https://cdn.onlinewebfonts.com/svg/img_569204.png'}
                            />
                            <p>{userInfo?.firstName ?? '' + " " + (userInfo?.lastName ?? '')}</p>
                        </div>
                        <div className={styles.infoItems}>
                            <List
                                sx={{ width: '100%', minWidth: 300, bgcolor: "ButtonHighlight" }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                    </ListSubheader>
                                }
                            ></List>
                            <ListItemButton
                                sx={{
                                    backgroundColor: '#c9c9d0'
                                }}
                            >
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Thông tin cá nhân" 
                                />
                            </ListItemButton>
                            <ListItemButton
                                onClick={(e) => {
                                    router.push({
                                        pathname: RouterPath.PENDING,
                                    })
                                }}
                            >
                                <ListItemIcon>
                                    <ShoppingBasketIcon />
                                </ListItemIcon>
                                <ListItemText primary="Quản lý đơn hàng" />
                            </ListItemButton>
                            {/* <ListItemButton>
                                <ListItemIcon>
                                    <LoyaltyIcon />
                                </ListItemIcon>
                                <ListItemText primary="Đã thích" />
                            </ListItemButton> */}
                             <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    onClick={() => {
                                        router.push({
                                            pathname: '/changepass'
                                        })
                                    }} 
                                    primary="Đổi mật khẩu" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText 
                                    onClick={() => {
                                        Cookies.remove('userPBL6')
                                        Cookies.remove('token')
                                        window.location = '/login'
                                    }} 
                                    primary="Đăng xuất" />
                            </ListItemButton>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900xp' }}>
                        <div className={styles.infoDetails}>
                            <div style={{
                                color: 'grey',
                                borderBottom: '0.2px solid grey',
                                fontSize: '25px',
                                fontWeight: '600px',
                                margin: '25px',
                                maxWidth: '900xp',
                            }}>
                                Thông tin cá nhân 
                            </div> 
                            <div className={styles.Details}>
                                <div>
                                    <TextLabel>
                                        Họ
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                // label='Họ '
                                                disableportal
                                                variant="outlined"
                                                InputLabelProps={{ style: { fontSize: 13 }}}
                                                sx={{ width: '300px' }}
                                            />
                                        )}
                                        name="lastName"
                                    />
                                    {errors?.lastName?.type === "required" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập họ! </p>)}
                                </div>
                                <div>
                                    <TextLabel>
                                        Tên
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                variant="outlined"
                                                InputLabelProps={{ style: { fontSize: 13 }}}
                                                sx={{ width: '300px' }}
                                            />
                                        )}
                                        name="firstName"
                                    />
                                    {errors?.firstName?.type === "required" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập tên! </p>)}
                                </div>
                                <div>
                                    <TextLabel>
                                        Tên đăng nhập
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                label="   "
                                                variant="outlined"
                                                InputLabelProps={{ style: { fontSize: 13 }}}
                                                sx={{ width: '300px' }}
                                            />
                                        )}
                                        name="username"
                                    />
                                    {errors?.username?.type === "required" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập tên đăng nhập! </p>)}
                                </div>
                                <div
                                    style={{
                                        maxWidth: '300px',
                                        minHeight: '40px'
                                    }}
                                >
                                    <TextLabel>
                                        Ngày sinh
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        defaultValue={null}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field: { ref, ...rest } }) => (
                                            <CustomDateTimePickerX
                                                {...rest}
                                                //  ref={ref}
                                                variant="outlined"
                                                label="DD/M/YYYY"
                                                inputFormat = "dd/MM/yyyy"
                                                InputLabelProps={{ style: { fontSize: 13, height: '40px' }}}
                                                sx={{ width: '300px', height: '40px' }}
                                            />
                                        )}
                                        name="birthDay"
                                    />
                                    {errors?.birthDay?.type === "required" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng chọn ngày sinh! </p>)}
                                </div>
                                <div>
                                    <TextLabel>
                                        Số điện thoại
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                            validate: handlePhoneValidation,
                                        }}
                                        render={({ field: { ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                variant="outlined"
                                                InputLabelProps={{ style: { fontSize: 13 }}}
                                                sx={{ width: '300px' }}
                                            />
                                        )}
                                        name="phone"
                                    />
                                    {errors?.phone?.type === "required" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập số điện thoại! </p>)}
                                    {errors?.phone?.type === "validate" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập số điện thoại đúng định dạng! </p>)}                                    
                                </div>
                                <div>
                                    <FormControl>
                                        <TextLabel>
                                            Giới tính
                                        </TextLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={gender}
                                            onChange={(e, id) => {
                                                setGender(parseInt(id, 10))
                                            }}
                                        >
                                            <FormControlLabel value={0}control={<Radio />} label="Nam" />
                                            <FormControlLabel value={1} control={<Radio />} label="Nữ" />
                                            <FormControlLabel value={2} control={<Radio />} label="Khác" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                <div>
                                    <TextLabel>
                                        Email
                                    </TextLabel>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true,
                                            validate: handleEmailValidation,
                                        }}
                                        render={({ field: { ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                variant="outlined"
                                                InputLabelProps={{ style: { fontSize: 13 }}}
                                                sx={{ width: '300px' }}
                                            />
                                        )}
                                        name="email"
                                    />
                                    {errors?.email?.type === "required" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập email để đăng ký! </p>)}
                                    {errors?.email?.type === "validate" && (
                                        <p style={{ color: 'red', marginBottom: 0 }}>Vui lòng nhập email đúng định dạng! </p>)}                                    
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button style={{
                                    width: '300px',
                                    backgroundColor: '#F20707',
                                    color: '#FFFFFF',
                                    marginTop: '20px',
                                    height: '38px',
                                    marginLeft: '375px'
                                }}
                                type="submit"
                            >
                                LƯU
                            </Button>
                        </div>
                    </div>

                </div>

            </div>
        </form>
    )
}
export default AccountInfo;