import React from "react";
import * as RouterPath from './RouterPath'
import Category from "../pages/category/Category";
import Login from "../pages/login/Login";
import DetailLaptop from "../pages/DetailLaptop/DetailLaptop";
import Cart from "../pages/cart/Cart"
import AccountInfo from "../pages/account/AccountInfo";
import Admin from "../pages/admin/MyProduct/Admin"
import Payment from "../pages/payment/Payment";
import Pending from "../pages/pending/Pending";
import HomePage from "../pages/homepage/HomePage";
import DetailOrder from "../pages/detailOrder/DetailOrder";
import EditProduct from "../components/Admin/EditProduct/EditProduct";
import PageNull from "../redux/pagenull/pagenull";
import ChangePass from "../pages/changepass/ChangePass";
import TryOnClothes from "../pages/TryOnClothes/TryOnClothes";
import Blog from "../pages/blog/Blog";

const Routes = [
    // {
    //     id: 'HOME',
    //     path: RouterPath.HOME,
    //     component: <ShopOnline />,
    //     // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    //   },
    {
      id: 'HOME',
      path: RouterPath.HOMEPAGE,
      component: <HomePage />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CATEGORY',
      path: RouterPath.CATEGORY,
      component: <Category />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'LOGIN',
      path: RouterPath.LOGIN,
      component: <Login />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_LAPTOP',
      path: RouterPath.DETAIL_LAPTOP,
      component: <DetailLaptop />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CART',
      path: RouterPath.CART,
      component: <Cart />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ACCOUNTINFO',
      path: RouterPath.ACCOUNT,
      component: <AccountInfo />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'ADMIN',
      path: RouterPath.ADMIN,
      component: <Admin />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PAYMENT',
      path: RouterPath.PAYMENT,
      component: <Payment />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PENDING',
      path: RouterPath.PENDING,
      component: <Pending />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'DETAIL_ORDER',
      path: RouterPath.DETAIL_ORDER,
      component: <DetailOrder />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'EDIT_PRODUCT',
      path: RouterPath.EDIT_PRODUCT,
      component: <EditProduct />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'PAGE_NULL',
      path: RouterPath.PAGE_NULL,
      component: <PageNull />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'CHANGE_PASS',
      path: RouterPath.CHANGE_PASSWORD,
      component: <ChangePass />,
      // fallback: () => <Redirect to={RouterPath.LOGIN} />,
    },
    {
      id: 'TRYON_CLOTHES',
      path: RouterPath.TRY_ON_CLOTHES,
      component: <TryOnClothes/>,
    },
    {
      id: 'BLOG',
      path: RouterPath.BLOG,
      component: <Blog/>,
    }
    
]
export default Routes
