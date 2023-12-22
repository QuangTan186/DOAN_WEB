import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { LoginFactory, RegisterFactory, GetUserFactory, ChangeProfileFactory, ChangePasswordFactory, GetIsAdminFactory, GetListUserFactory } from './factory'
import actions from './action'
import LoginAction from './action';
import Cookies from 'js-cookie';
import moment from 'moment';

export function* signIn() {
    yield takeEvery(actions.SUBMIT_LOGIN, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => LoginFactory.requestSignIn(data))
            if (response?.data?.code === 'ok') {
                Cookies.set('userPBL6', JSON.stringify({
                    user: response?.data,
                }), { });
                Cookies.set('token', JSON.stringify(
                    response?.data?.result?.results?.Token,
                ), { });
                yield put({
                    type: LoginAction.SUBMIT_LOGIN_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* registerLogin() {
    yield takeEvery(actions.SUBMIT_REGISTER, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => RegisterFactory.requestRegister(data))
            console.log(response?.data?.message)
            if (response?.data?.code === "ok") {
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getUser() {
    yield takeEvery(actions.GET_USER_DETAIL, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const response = yield call(() => GetUserFactory.requestGetUser())
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
            } else {
                onError && onError()
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getListUser() {
    yield takeEvery(actions.GET_LIST_USER, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const response = yield call(() => GetListUserFactory.requestGetListUser())
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
            } else {
                onError && onError()
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* changeProfile() {
    yield takeEvery(actions.CHANGE_PROFILE, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const formData = new FormData();

            if( data?.avatarUrl?.file  != null && typeof data?.avatarUrl?.file !== 'undefined' )
            {
                formData.append('avatarUrl', data?.avatarUrl?.file)
            }
            else {
                data.avatarUrl = null
            }
            formData.append('birthDay', moment(data?.birthDay).format('YYYY/MM/DD'))
            formData.append('email', data?.email)
            formData.append('firstName', data?.firstName)
            formData.append('gender', data?.gender)
            formData.append('lastName', data?.lastName)
            formData.append('phone', data?.phone)
            formData.append('username', data?.username)

            const response = yield call(() => ChangeProfileFactory.requestChangeProfile(formData))
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* changePass() {
    yield takeEvery(actions.CHANGE_PASSWORD, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            const response = yield call(() => ChangePasswordFactory.requestChangePassword(data))
            if (response?.data?.code === 'ok') {
                console.log('ok')
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export function* getIsAdmin() {
    yield takeEvery(actions.ISADMIN, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {            
            const response = yield call(() => GetIsAdminFactory.requestGetIsAdmin())
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess();
            } else {
                onError && onError(response?.data?.message)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export default function* loginSaga() {
    yield all([
        fork(signIn), 
        fork(registerLogin),
        fork(getUser),
        fork(getListUser),
        fork(changeProfile),
        fork(changePass),
        fork(getIsAdmin)
    ])
}
