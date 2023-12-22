import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { groupByDate, groupByJoined, groupBySold } from '../../utils/groupBy';
import { humanReadableDate } from '../../utils/humanReadable';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import DropDownMenu from '../ui/DropDownMenu';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import './style.css';

const groupByFunc = {
    order: groupByDate,
    product: groupBySold,
    user: groupByJoined,
};

const titles = {
    order: 'Sales statistics by orders',
    product: 'Sales statistics by products',
    user: 'Statistics of new users',
    store: 'Statistics of new stores',
};

const ListStatisticsItems = ({ by = 'admin', storeId = '' }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [items, setItems] = useState({
        order: [],
        product: [],
        user: [],
        store: [],
    });
    const [sizes, setSizes] = useState({
        order: 0,
        product: 0,
        user: 0,
        store: 0,
    });
    const [options, setOptions] = useState({
        flag: 'order',
        by: 'hours',
        sliceEnd: 6,
        type: 'line',
    });


    const adminInit = async () => {
        setError('');
        setIsLoading(true);
        try {
            const orderData = {}

            const productData = {
                "success": "Load list products successfully",
                "filter": {
                    "search": "",
                    "sortBy": "sold",
                    "order": "desc",
                    "isActive": [
                        true
                    ],
                    "limit": 1000,
                    "pageCurrent": 1,
                    "pageCount": 1
                },
                "size": 12,
                "products": [
                    {
                        "_id": "64717968daad69735a8cea39",
                        "name": "Pant",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        "price": {
                            "$numberDecimal": "1111"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "111"
                        },
                        "quantity": 110,
                        "sold": 1,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685158248305pant-shop81QH+WSpQ7L._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685158248316pant-shop81QH+WSpQ7L._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "647177bedaad69735a8ce823",
                            "name": "Category111",
                            "image": "/uploads/168515782231261Pk2DHgl9L._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "647177a8daad69735a8ce814",
                                "name": "Category11",
                                "image": "/uploads/168515780044361nP3Ke+InL._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6471777ddaad69735a8ce7ff",
                                    "name": "Category1",
                                    "image": "/uploads/168515775749151Wad54rV2L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-27T03:22:37.545Z",
                                    "updatedAt": "2023-05-27T03:22:37.545Z",
                                    "slug": "category1",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-27T03:23:20.513Z",
                                "updatedAt": "2023-05-27T03:23:20.513Z",
                                "slug": "category11",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-27T03:23:42.363Z",
                            "updatedAt": "2023-05-27T03:23:42.363Z",
                            "slug": "category111",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "647178f7daad69735a8ce9c7",
                            "name": "Pant shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/168515813520681AFLPZus4L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 5,
                        "createdAt": "2023-05-27T03:30:48.366Z",
                        "updatedAt": "2023-06-18T11:06:13.761Z",
                        "slug": "pant",
                        "__v": 0
                    },
                    {
                        "_id": "6470e47adaad69735a8cd94b",
                        "name": "Quần kaki Nam",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "price": {
                            "$numberDecimal": "1000000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e345daad69735a8cd8a2",
                            "name": "Computers",
                            "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": null,
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:50:13.260Z",
                            "updatedAt": "2023-05-26T16:50:13.260Z",
                            "slug": "computers",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "slug": "samsung-galaxy-tab-a7-lite-8-7-32gb-wifi-android-tablet",
                        "__v": 0
                    },
                    {
                        "_id": "647174dbdaad69735a8cdd0c",
                        "name": "Áo Hoodie Nữ",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        "price": {
                            "$numberDecimal": "100000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "99999"
                        },
                        "quantity": 10,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685157083403u71pvhTrmZDL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e38ddaad69735a8cd8e7",
                            "name": "Laptops",
                            "image": "/uploads/168511988514691aWfctUptL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:25.202Z",
                            "updatedAt": "2023-05-26T16:51:25.202Z",
                            "slug": "laptops",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-27T03:11:23.510Z",
                        "updatedAt": "2023-05-27T03:16:04.169Z",
                        "slug": "laptop",
                        "__v": 0
                    },
                    {
                        "_id": "64717a9e4ea1af4dbc769ee8",
                        "name": "áo polo nam",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "price": {
                            "$numberDecimal": "1000000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122320u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "slug": "1samsung-galaxy-tab-a7-lite-8-7-32gb-wifi-android-tablet",
                        "__v": 0
                    },
                    {
                        "_id": "64717ab84ea1af4dbc769eea",
                        "name": "giày converse vàng 2020",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "price": {
                            "$numberDecimal": "1000000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122320u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-27T03:43:02.253Z",
                        "slug": "11samsung-galaxy-tab-a7-lite-8-7-32gb-wifi-android-tablet",
                        "__v": 0
                    },
                    {
                        "_id": "64717ac94ea1af4dbc769eeb",
                        "name": "Váy dạ hội nữ",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "price": {
                            "$numberDecimal": "1000000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122320u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "slug": "123samsung-galaxy-tab-a7-lite-8-7-32gb-wifi-android-tablet",
                        "__v": 0
                    },
                    {
                        "_id": "648ee9f28da1753f54ef8f74",
                        "name": "Giày Nike Air Force Nữ",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "price": {
                            "$numberDecimal": "1000000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "__v": 0
                    },
                    {
                        "_id": "648eea608da1753f54ef8f77",
                        "name": "Quần Jean Nữ Nhỏ",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "price": {
                            "$numberDecimal": "1000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "__v": 0
                    },
                    {
                        "_id": "648eea978da1753f54ef8f78",
                        "name": "Áo Sơ Mi Nam Kaki Mac",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "price": {
                            "$numberDecimal": "1000"
                        },
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "__v": 0
                    },
                    {
                        "_id": "648eeb128da1753f54ef8f7a",
                        "name": "Giày Nike Air Jordan",
                        "description": "SAMSUNG Galaxy Tab A7 Lite 8.7\" 32GB WiFi Android Tablet, Compact, Slim Design, Kid Friendly, Sturdy Metal Frame,",
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "listImages": [
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "/uploads/1685120122321u61fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp"
                        ],
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "__v": 0
                    },
                    {
                        "listImages": [],
                        "_id": "648f327662dc92dd06ca9f24",
                        "promotionalPrice": {
                            "$numberDecimal": "999999"
                        },
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-06-18T17:05:43.671Z",
                        "__v": 0,
                        "name": "quần jean nam dáng baggy cắt gấu chất liệu co dãn",
                        "description": "💪  CÁCH CHỌN SIZE\r\n\r\n👖 Size 27 : Từ 38 - 45kg Cao trên 1m55\r\n👖 Size 28 : Từ 45 - 52kg Cao trên 1m55\r\n👖 Size 29 : Từ 53 - 57kg Cao trên 1m55\r\n👖 Size 30 : Từ 58 - 62kg Cao trên 1m60 ( là mặc đẹp nhất )\r\n👖 Size 31 : Từ 63 - 67kg Cao trên 1m60 ( là mặc đẹp nhất )\r\n👖 Size 32 : Từ 68 - 75 kg Cao trên 1m60 ( là mặc đẹp nhất )\r\n👖 Size 33 : Từ 76 - 83 kg Cao trên 1m60 ( là mặc đẹp nhất )\r\n.\r\nLƯU Ý: SHOP Có 2 loại rách Gối và không rách gối , Khách có yêu cầu gì đặc biệt có thể inbox shop hỗ trợ ạ !\r\nQuần jean rách gối bên mình khá đẹp và giá rẻ nên mọi người ủng hộ shop mình nhé\r\n✔️ Loại  : Quần Jean COTTON Co Giản , ống suông , rách gối !\r\n✔️ Kiểu dáng  : Hàn Quốc,  Đi Chơi,  Công Sở, Đời Thường\r\n✔️Chất liệu  : Vải Jean Cotton , co dãn\r\n✔️Thương hiệu  : Muidoi\r\n✔️Thích hợp  : 4 mùa\r\n\r\n#quần_jean\r\n#quần_jeans\r\n#quần_jean_nam\r\n#quần_bò_ống_rộng\r\n#quần_bò_nam\r\n#quần_bò\r\n#quần_jean_ống_suông\r\n#quần_baggy\r\n#quần_baggy_nam\r\n#quần_jean_rách_gối\r\n#quần_bò_nam\r\n#quần_jean_ống_rộng\r\n#quần_bò_rách_gối\r\n#quần_jean_giá_rẻ\r\n#quan_jean_nam\r\n#quan_bo_nam_dep\r\n#quần_bò_nam_đẹp\r\n#quần_jean_ống_côn\r\n"
                    },
                    {
                        "_id": "648f38ba62dc92dd06ca9f25",
                        "name": "Áo khoác thể thao 3 sọc logo ADD chất nỉ dày dặn BIGOMALL",
                        "promotionalPrice": {
                            "$numberDecimal": "100000"
                        },
                        "description": "",
                        "listImages": [
                            "https://down-vn.img.susercontent.com/file/4bd1e177d4215cd737842a5e175fa2df_tn"
                        ],
                        "quantity": 13232,
                        "sold": 0,
                        "isActive": true,
                        "isSelling": true,
                        "categoryId": {
                            "_id": "6470e39bdaad69735a8cd8f0",
                            "name": "Tablets",
                            "image": "/uploads/168511989961061fV4UeHeLL._AC_UL600_FMwebp_QL65_.webp",
                            "categoryId": {
                                "_id": "6470e364daad69735a8cd8bf",
                                "name": "Computers & Tablets",
                                "image": "/uploads/168511984483261QGMX0Qy6L._AC_UL600_FMwebp_QL65_.webp",
                                "categoryId": {
                                    "_id": "6470e345daad69735a8cd8a2",
                                    "name": "Computers",
                                    "image": "/uploads/168511981320671FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp",
                                    "categoryId": null,
                                    "isDeleted": false,
                                    "createdAt": "2023-05-26T16:50:13.260Z",
                                    "updatedAt": "2023-05-26T16:50:13.260Z",
                                    "slug": "computers",
                                    "__v": 0
                                },
                                "isDeleted": false,
                                "createdAt": "2023-05-26T16:50:44.897Z",
                                "updatedAt": "2023-05-26T16:50:44.897Z",
                                "slug": "computers-and-tablets",
                                "__v": 0
                            },
                            "isDeleted": false,
                            "createdAt": "2023-05-26T16:51:39.669Z",
                            "updatedAt": "2023-05-26T16:51:39.669Z",
                            "slug": "tablets",
                            "__v": 0
                        },
                        "styleValueIds": [],
                        "storeId": {
                            "_id": "646e5328324f6068a9701c20",
                            "name": "Computer Shop",
                            "isActive": true,
                            "isOpen": true,
                            "avatar": "/uploads/1685156920445u71FLsWWmE8L._AC_UL600_FMwebp_QL65_.webp"
                        },
                        "rating": 3,
                        "createdAt": "2023-05-26T16:55:22.379Z",
                        "updatedAt": "2023-05-26T16:55:22.379Z",
                        "__v": 0
                    }
                ]
            }

            const userData = {
                "success": "Load list users successfully",
                "filter": {
                    "search": "",
                    "sortBy": "point",
                    "order": "desc",
                    "limit": 1000,
                    "pageCurrent": 1,
                    "pageCount": 1
                },
                "size": 2,
                "users": [
                    {
                        "_id": "646e47c4c87f8b91966e5ca4",
                        "firstname": "Quan",
                        "lastname": "Nguyen",
                        "email": "quanntm2@gmail.com",
                        "isEmailActive": true,
                        "isPhoneActive": false,
                        "role": "user",
                        "addresses": [
                            "123, 123, 12312, 213, Việt Nam"
                        ],
                        "avatar": "/uploads/168515672865171jTFnk7XiL._AC_UL600_FMwebp_QL65_.webp",
                        "cover": "/uploads/168515674351571pvhTrmZDL._AC_UL600_FMwebp_QL65_.webp",
                        "e_wallet": {
                            "$numberDecimal": "0"
                        },
                        "point": 1,
                        "isActive": true,
                        "createdAt": "2023-05-24T17:22:12.179Z",
                        "updatedAt": "2023-06-18T11:04:23.087Z",
                        "slug": "q-q",
                        "__v": 0
                    },
                    {
                        "_id": "646f76c7bbc5f2d628f37287",
                        "firstname": "a",
                        "lastname": "a",
                        "email": "test1@gmail.com",
                        "isEmailActive": false,
                        "isPhoneActive": false,
                        "role": "user",
                        "addresses": [
                            "q, q, q, q, q"
                        ],
                        "avatar": "/uploads/1685158754989test1.png",
                        "cover": "/uploads/1685158759862test3.png",
                        "e_wallet": {
                            "$numberDecimal": "0"
                        },
                        "point": 0,
                        "isActive": true,
                        "createdAt": "2023-05-25T14:55:03.174Z",
                        "updatedAt": "2023-05-27T05:16:21.668Z",
                        "slug": "a-a",
                        "__v": 0
                    }
                ]
            }

            const storeData = {}

            setItems({
                ...items,
                order: orderData.orders?.reverse(),
                product: productData.products,
                user: userData.users,
                store: storeData.stores,
            });

            setSizes({
                ...sizes,
                order: orderData.size,
                product: productData.size,
                user: userData.size,
                store: storeData.size,
            });
        } catch (e) {
            setError('Server Error');
        }

        setIsLoading(false);
    };


    useEffect(() => {
        adminInit();
    }, [by, storeId]);

    return (
        <div className="position-relative my-statistic" style={{width: '78%', marginLeft: '20%'}}>
            {isloading && <Loading />}
            {error && <Error msg={error} />}
            <div className="container-fluid px-2">
                <div className="row">

                    <div className="col-md-3 col-6">
                        <button
                            type="button"
                            className={`btn ${
                                options.flag === 'user'
                                    ? 'btn-funny'
                                    : 'btn-outline-funny'
                            } btn-lg ripple w-100 py-4 mb-2`}
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    flag: 'user',
                                })
                            }
                        >
                            <i className="fas fa-user-friends"></i>
                            <span className="ms-3 res-hide">
                                {sizes.user}
                            </span>
                            <span className="ms-1 res-hide-lg">
                                Users
                            </span>
                        </button>
                    </div>

                    <div className="col-md-3 col-6">
                        <button
                            type="button"
                            className={`btn ${
                                options.flag === 'product'
                                    ? 'btn-primary'
                                    : 'btn-outline-primary'
                            } btn-lg ripple w-100 py-4 mb-2`}
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    flag: 'product',
                                })
                            }
                        >
                            <i className="fas fa-box"></i>
                            <span className="ms-3 res-hide">
                                {sizes.product}
                            </span>
                            <span className="ms-1 res-hide-lg">Products</span>
                        </button>
                    </div>

                    <div className="col-md-3 col-6">
                        <button
                            type="button"
                            className={`btn ${
                                options.flag === 'order'
                                    ? 'btn-pink'
                                    : 'btn-outline-pink'
                            } btn-lg ripple w-100 py-4 mb-2`}
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    flag: 'order',
                                })
                            }
                        >
                            <i className="fas fa-clipboard"></i>
                            <span className="ms-3 res-hide">{sizes.order}</span>
                            <span className="ms-1 res-hide-lg">Orders</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="     px-2">
                <div className="row">
                    <div className="col-xl-8 col-lg-6">
                        <form className="d-flex">
                            {options.flag !== 'product' ? (
                                <div className="me-2">
                                    <DropDownMenu
                                        listItem={[
                                            {
                                                label: 'Hour',
                                                value: 'hours',
                                                icon: (
                                                    <i className="far fa-clock"></i>
                                                ),
                                            },
                                            {
                                                label: 'Day',
                                                value: 'date',
                                                icon: (
                                                    <i className="fas fa-calendar-day"></i>
                                                ),
                                            },
                                            {
                                                label: 'Month',
                                                value: 'month',
                                                icon: (
                                                    <i className="fas fa-calendar-alt"></i>
                                                ),
                                            },
                                            {
                                                label: 'Year',
                                                value: 'year',
                                                icon: (
                                                    <i className="fas fa-calendar-minus"></i>
                                                ),
                                            },
                                        ]}
                                        value={options.by}
                                        setValue={(value) =>
                                            setOptions({
                                                ...options,
                                                by: value,
                                            })
                                        }
                                        label="Statistics by"
                                        borderBtn={true}
                                    />
                                </div>
                            ) : (
                                <div className="me-2">
                                    <DropDownMenu
                                        listItem={[
                                            {
                                                label: '6 Products',
                                                value: 6,
                                            },
                                            {
                                                label: '10 Products',
                                                value: 10,
                                            },
                                            {
                                                label: '50 Products',
                                                value: 50,
                                            },
                                            {
                                                label: '100 Products',
                                                value: 100,
                                            },
                                        ]}
                                        value={options.sliceEnd}
                                        setValue={(value) =>
                                            setOptions({
                                                ...options,
                                                sliceEnd: value,
                                            })
                                        }
                                        label="Statistics by"
                                        borderBtn={true}
                                    />
                                </div>
                            )}
                            <div>
                                <DropDownMenu
                                    listItem={[
                                        {
                                            label: 'Line',
                                            value: 'line',
                                            icon: (
                                                <i className="fas fa-chart-line"></i>
                                            ),
                                        },
                                        {
                                            label: 'Bar',
                                            value: 'bar',
                                            icon: (
                                                <i className="fas fa-chart-bar"></i>
                                            ),
                                        },
                                        {
                                            label: 'Doughnut',
                                            value: 'doughnut',
                                            icon: (
                                                <i className="fas fa-chart-pie"></i>
                                            ),
                                        },
                                    ]}
                                    value={options.type}
                                    setValue={(value) =>
                                        setOptions({
                                            ...options,
                                            type: value,
                                        })
                                    }
                                    label="Chart type"
                                    borderBtn={true}
                                />
                            </div>
                        </form>

                        <div className="mt-2">
                            {options.type === 'line' && (
                                <LineChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                            {options.type === 'bar' && (
                                <BarChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                            {options.type === 'doughnut' && (
                                <DoughnutChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-6 mt-4">
                        <h4 className="text-center my-4">
                            Top 6 {options.flag}s
                        </h4>
                        <div className="table-scroll my-2">
                            <table className="table align-middle table-hover table-sm text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">
                                            {options.flag[0].toUpperCase() +
                                                options.flag.substring(1)}
                                        </th>
                                        <th scope="col">
                                            {options.flag === 'user' && 'Point'}
                                            {options.flag === 'store' &&
                                                'Point'}
                                            {options.flag === 'product' &&
                                                'Sold'}
                                            {options.flag === 'order' && 'Date'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {((options.flag === 'order') ?
                                        items[options.flag]?.slice(-6).reverse() :
                                        items[options.flag]?.slice(0,6))?.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                {/* <td
                                                    className="text-start"
                                                    style={{
                                                        whiteSpace: 'normal',
                                                    }}
                                                >
                                                    {options.flag ===
                                                        'user' && (
                                                        <UserSmallCard
                                                            user={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'store' && (
                                                        <StoreSmallCard
                                                            store={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'product' && (
                                                        <ProductSmallCard
                                                            product={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'order' && (
                                                        <small>
                                                            {item._id}
                                                        </small>
                                                    )}
                                                </td> */}
                                                <td>
                                                    {options.flag === 'user' &&
                                                        item.point}
                                                    {options.flag === 'store' &&
                                                        item.point}
                                                    {options.flag ===
                                                        'product' && item.sold}
                                                    {options.flag ===
                                                        'order' && (
                                                        <small>
                                                            {humanReadableDate(
                                                                item.createdAt,
                                                            )}
                                                        </small>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end my-2">
                            <Link
                                to={`/${by}/${
                                    by === 'admin'
                                        ? options.flag
                                        : options.flag + 's/' + storeId
                                }`}
                                className="link-hover"
                            >
                                <span className="me-2 res-hide">
                                    Go to {options.flag} manager
                                </span>
                                <i className="fas fa-external-link-alt"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListStatisticsItems;
