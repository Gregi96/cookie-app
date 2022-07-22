import React from 'react'
import { Dishes, Ingredients, Recipes } from 'components'
import { ScreenNames } from './screenNames'

type Route = {
    path: ScreenNames,
    element: React.ReactNode
}

export const ROUTES: Array<Route> = [
    {
        path: ScreenNames.Ingredients,
        element: <Ingredients/>
    },
    {
        path: ScreenNames.Recipes,
        element: <Recipes/>
    },
    {
        path: ScreenNames.Dishes,
        element: <Dishes/>
    }
]
