import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ScreenNames, ROUTES } from 'lib/routing'

export const renderRoutes = () => (
    <Routes>
        {ROUTES.map(item => (
            <Route
                key={item.path}
                path={item.path}
                element={item.element}
            />
        ))}
        <Route
            path={'*'}
            element={(
                <Navigate to={ScreenNames.Ingredients}/>
            )}
        />
    </Routes>
)
