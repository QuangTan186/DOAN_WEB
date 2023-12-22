import ApiOperation from '../../adapter/ApiOperation';
import ApiConstants from '../../adapter/ApiConstants';

const GetListOrderByStatus = {
    requestGetListOrderByStatus : (data) =>
        ApiOperation.request({
            url: ApiConstants.GET_ORDER_BY_STATUS,
            method: 'GET',
            params: data,
        })
}

const GetListOrderByUserId = {
    requestGetListOrderByUserId : (data) =>
        ApiOperation.request({
            url: ApiConstants.GET_LIST_ORDER_BY_USERID,
            method: 'GET',
            params: data,
        })
}

const GetDetailOrderById = {
    requestGetDetailOrderById : (data) =>
        ApiOperation.request({
            url: ApiConstants.GET_DETAIL_ORDER_BY_ID,
            method: 'GET',
            params: data,
        })
}

const AddOrder = {
    requestAddOrder: (data, param ) => 
        ApiOperation.request({
            url: ApiConstants.ADD_ORDER,
            method: 'POST',
            params: param,
            data: data,
        })
}

const GetOrderById = {
    requestGetOrder: (data) => 
        ApiOperation.request({
            url: ApiConstants.GET_ORDER_BY_ID,
            method: 'POST',
            params: data,
        })
}

const ChangeStatusOrder = {
    requestChangeStatusOrder: (params, data) => 
        ApiOperation.request({
            url: ApiConstants.CHANGE_STATUS_ORDER,
            method: 'PUT',
            params: params,
            data: data,
        })
}

export { GetListOrderByUserId, AddOrder, GetOrderById, GetDetailOrderById, GetListOrderByStatus, ChangeStatusOrder } 

