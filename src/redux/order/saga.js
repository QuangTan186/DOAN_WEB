import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { GetListOrderByUserId, AddOrder, GetListOrderByStatus, GetOrderById, GetDetailOrderById, ChangeStatusOrder} from './factory'
import actions from './action'
import OrderAction from './action';
import { GetUserFactory } from '../login/factory';

export function* getListOrderByStatus() {
    yield takeEvery(actions.GET_LIST_ORDER_BY_STATUS, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetListOrderByStatus.requestGetListOrderByStatus(data))
            if (response?.status === 200) {
                yield put({
                    type: OrderAction.GET_LIST_ORDER_BY_USERID_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* changeStatusOrderById() {
    yield takeEvery(actions.CHANGE_STATUS_ORDER, function* (payload) {
        const { data, params, onSuccess, onError } = payload
        try {
            const response = yield call(() => ChangeStatusOrder.requestChangeStatusOrder(params,data))
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess("Duyệt đơn hàng thành công ");
            } else {
                onError && onError("Duyệt đơn hàng thất bại")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* getListOrderByUserId() {
    yield takeEvery(actions.GET_LIST_ORDER_BY_USERID, function* (payload) {
        const { onSuccess, onError } = payload
        try {
            const user = yield call(() => GetUserFactory.requestGetUser())
            if(user?.data?.code !== 'ok')
            {
                return onError && onError("onEnrror")
            }
            const data = {
                userId: user?.data?.result?.id
            }
            const response = yield call(() => GetListOrderByUserId.requestGetListOrderByUserId(data))
            if (response?.status === 200) {
                yield put({
                    type: OrderAction.GET_LIST_ORDER_BY_USERID_SUCCESS,
                    payload: response,
                })
                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* getDetailOrderById() {
    yield takeEvery(actions.GET_DETAIL_BY_ID, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            console.log(data)
            const response = yield call(() => GetDetailOrderById.requestGetDetailOrderById(data))
            if (response?.data?.code === 'ok') {
                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* getListOrderById() {
    yield takeEvery(actions.GET_ORDER_BY_ID, function* (payload) {
        const { data, onSuccess, onError } = payload
        try {
            const response = yield call(() => GetOrderById.requestGetOrder())
            // console.log(response?.data?.code)
            if (response?.data?.code === 'ok') {

                onSuccess && onSuccess(response);
            } else {
                onError && onError("onEnrror")
            }
        } catch (error) {
            console.log("err",error)
        } finally {
        }
    })
}

export function* addOrder() {
    yield takeEvery(actions.ADD_ORDER, function* (payload) {
        const { data, param, onSuccess, onError } = payload
        try {
            const response = yield call(() => AddOrder.requestAddOrder(data, param))
            if (response?.status === 200) {
                onSuccess && onSuccess(response);
            } else {
                onError && onError(response?.response?.status)
            }
        } catch (error) {
            console.log("err",error)
        } finally {
            // do something here...
        }
    })
}

export default function* getOrder() {
    yield all([
        fork(getListOrderByUserId), 
        fork(getListOrderById),
        fork(addOrder),
        fork(getDetailOrderById),
        fork(getListOrderByStatus),
        fork(changeStatusOrderById)
    ])
}
