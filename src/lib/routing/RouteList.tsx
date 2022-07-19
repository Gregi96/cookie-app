import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from 'components'
import { ScreenNames } from 'lib/routing'

export const renderRoutes = () => (
    <Routes>
        <Route
            path={ScreenNames.Home}
            element={(
                <Home/>
            )}
        />
        <Route
            path={'*'}
            element={(
                <Navigate to={'/'}/>
            )}
        />
    </Routes>
)
