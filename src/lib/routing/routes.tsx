import React from 'react'
import { Ingredients } from 'features/ingredients'
import { Recipes } from 'features/recipes'
import { Dishes } from 'features/dishes'
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
