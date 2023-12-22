import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import styles from "../../../pages/admin/MyProduct/Admin.module.scss"
import LoginAction from '../../../redux/login/action';
import { useDispatch } from 'react-redux';
import { TextField } from "@mui/material";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'username',
    headerName: 'User name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 200,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'number',
    width: 150,
    editable: true,
  },
  
];

export default function User(props) {
    const[users, setUsers] = React.useState([]);
    const[searchUser, setSearchUser] = React.useState([]);
    const[valueSearch, setValueSearch] = React.useState();
    const dispatch = useDispatch();

    const getListUser = async () => {
        dispatch({
            type: LoginAction.GET_LIST_USER,
            onSuccess: (data) => {
                setUsers(data?.data )
                setSearchUser(data?.data)
            },
            onError: () => {
                router.push({
                    pathname: RouterPath.LOGIN,
                })
            }
        })
    }


    React.useEffect(() => {
        const timeOutId = setTimeout(() => HandleSearch(valueSearch), 0);
        return () => clearTimeout(timeOutId);
      }, [valueSearch]);
        
    const HandleSearch = (params) => {
        (users !== []) &&
        ((!params || params == undefined || params == "") ? setSearchUser(users) :
        setSearchUser(users.filter((item) => {return item?.id == params || item?.username?.includes(params) || item?.lastName?.includes(params)})));
    }

    React.useEffect(() => {
        getListUser()
    }, [])

  return (
    <div className={styles.admin}>
    <Box
      sx={{
        width: 300,
        maxWidth: '100%',
        marginLeft: '20%',
        marginBottom: '20px'
      }}
    >
      <TextField fullWidth value={valueSearch} onChange={event => setValueSearch(event.target.value)} label="Tìm kiếm" id="fullWidth" />
    </Box>
    <Box sx={{ maxHeight: 600,width: '75%' , marginLeft: '20%' }}>
      <DataGrid
        rows={searchUser}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </div>
  );
}