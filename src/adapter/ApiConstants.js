const BASE_PREFIX = '/api'
const AUTH_PREFIX = '/Identity'
const CATEGORY = '/Category'
const PRODUCT = '/Product'
const ORDER = '/Order'
const ADDRESS = '/Address'
const COMMENT = '/Comment'
const ISADMIN = '/Permission'

const ApiConstants = {
    // AUTH
    LOGIN: `${BASE_PREFIX}${AUTH_PREFIX}/login`,
    REGISTER: `${BASE_PREFIX}${AUTH_PREFIX}/register`,
    LOGOUT: `${BASE_PREFIX}${AUTH_PREFIX}/login/logout`,
    GET_USER: `${BASE_PREFIX}${AUTH_PREFIX}/get-user`,
    CHANGE_PROFILE: `${BASE_PREFIX}${AUTH_PREFIX}/change-profile`,
    CHANGE_PASS: `${BASE_PREFIX}${AUTH_PREFIX}/change-password`,
    GET_LIST_USER: `${BASE_PREFIX}${AUTH_PREFIX}`,

    //PERMISSION
    ISADMIN: `${BASE_PREFIX}${ISADMIN}/is-admin`,

    // CATEGORY
    CATEGORY: `${BASE_PREFIX}${CATEGORY}/get-list-category`,
    TREE_CATEGORY: `${BASE_PREFIX}${CATEGORY}/get-list-tree-category`,
    // PRODUCT
    LIST_PRODUCT: `${BASE_PREFIX}${PRODUCT}/find-product`,
    LIST_PRODUCT_BY_CATEGORY: `${BASE_PREFIX}${PRODUCT}/get-list-product-by-id-category`,
    ADD_PRODUCT: `${BASE_PREFIX}${PRODUCT}/add-product`,
    DELETE_PRODUCT: `${BASE_PREFIX}${PRODUCT}/delete-product-by-id`,
    GET_PRODUCT_BY_ID: `${BASE_PREFIX}${PRODUCT}/get-product-by-id`,
    GET_BEST_SELLER: `${BASE_PREFIX}${PRODUCT}/get-best-seller`,
    GET_PRODUCTS_BY_TYPE: `${BASE_PREFIX}${PRODUCT}/get-list-product-by-type`,
    GET_OBJECT3D_PRODUCTS_DETAIL: `${BASE_PREFIX}${PRODUCT}/get-detail-by-product-id`,
    GET_LIST_SIZE: `${BASE_PREFIX}${PRODUCT}/get-list-size`,
    GET_LIST_COLOR: `${BASE_PREFIX}${PRODUCT}/get-list-color`,
    // ORDER
    GET_ORDER_BY_STATUS: `${BASE_PREFIX}${ORDER}/get-order-by-status`,
    GET_LIST_ORDER_BY_USERID: `${BASE_PREFIX}${ORDER}/get-order-by-userid`,
    GET_DETAIL_ORDER_BY_ID: `${BASE_PREFIX}${ORDER}/get-order-by-id`,
    GET_ORDER_BY_ID: `${BASE_PREFIX}${ORDER}/get-cart`,
    ADD_ORDER: `${BASE_PREFIX}${ORDER}/add-order`,
    CHANGE_STATUS_ORDER: `${BASE_PREFIX}${ORDER}/change-status`,

    // CART
    ADD_TO_CART: `${BASE_PREFIX}${ORDER}/add-to-cart`,
    DELETE_PRODUCT_TO_CART: `${BASE_PREFIX}${ORDER}/del-from-cart`,
    UPDATE_CART: `${BASE_PREFIX}${ORDER}/update-cart`,

    // ADDRESS
    ADD_ADDRESS: `${BASE_PREFIX}${ADDRESS}/add-address`,
    GET_PROVINCE: `${BASE_PREFIX}${ADDRESS}/get-province`,
    GET_DISTRICT: `${BASE_PREFIX}${ADDRESS}/get-district`,
    GET_COMMUNITY: `${BASE_PREFIX}${ADDRESS}/get-community`,
    GET_LIST_ADDRESS: `${BASE_PREFIX}${ADDRESS}/get-list-address-by-user`,


    //COMMENT
    GET_COMMENT: `${BASE_PREFIX}${COMMENT}/get-comment-by-product`,
    ADD_COMMENT: `${BASE_PREFIX}${COMMENT}/add-comment`,
    // EDIT_COMMENT: `${BASE_PREFIX}${COMMENT}/Edit Commnet`,
    DELETE_COMMENT: `${BASE_PREFIX}${COMMENT}/delete-comment`,

    //MESSAGE

    // GET_MESSAGE: ''
}

export default ApiConstants
export { BASE_PREFIX, AUTH_PREFIX, CATEGORY, PRODUCT, ORDER, ADDRESS, COMMENT }
