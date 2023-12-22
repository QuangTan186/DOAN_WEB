  /* eslint-disable react/no-array-index-key */
  import React, { Suspense, useEffect } from 'react'
  import { BrowserRouter as Router, Route, Routes as Routers, Switch } from 'react-router-dom'
  import { useDispatch, useSelector } from 'react-redux'
  import * as RouterPath from './RouterPath'
  import Routes from './Routes'
  import AppAction from '../redux/app/action'
  // import { Navigator } from "../Navigator";

  // import { Switch } from '@mui/material'
  function MainRouter() {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch({ type: AppAction.GET_SETTINGS })
      dispatch({ type: AppAction.GET_DECENTRALIZATION })
  }, [])
    return (
      <Router>
        <Routers>
          {Routes.map((route, index) => {
            return (
              <Route key={route.id} path={route.path} element={route.component} />
            )
          })}
        </Routers>
      </Router>
    )
  }
  export default MainRouter
