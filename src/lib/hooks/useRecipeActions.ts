import { useState } from 'react'
import { useCookieStore } from 'lib/stores'

export const useRecipeActions = () => {
    const { ingredients, addRecipe, recipes, removeRecipe } = useCookieStore()
    const [selectedIngredients, setSelectedIngredients] = useState<Array<string>>([])
    const [selectedOptionalIngredients, setSelectedOptionalIngredients] = useState<Array<string>>([])
    const [options, setOptions] = useState<Array<string>>(ingredients)
    const [optionalOptions, setOptionalOptions] = useState<Array<string>>(ingredients)

    const deleteAvailableOption = (item: string) => {
        setOptionalOptions(prev => prev.filter(ingredient => ingredient !== item))
        setOptions(prev => prev.filter(ingredient => ingredient !== item))
    }

    const addAvailableOption = (item: string) => {
        setOptionalOptions(prev => prev.concat(item))
        setOptions(prev => prev.concat(item))
    }

    const addIngredient = (item: string) => {
        setSelectedIngredients(prev => [...prev, item])
        deleteAvailableOption(item)
    }

    const addOptionalIngredient = (item: string) => {
        setSelectedOptionalIngredients(prev => [...prev, item])
        deleteAvailableOption(item)
    }

    const removeIngredient = (item: string) => {
        setSelectedIngredients(prev => prev.filter(ingredient => ingredient !== item))
        addAvailableOption(item)
    }

    const removeOptionalIngredient = (item: string) => {
        setSelectedOptionalIngredients(prev => prev.filter(ingredient => ingredient !== item))
        addAvailableOption(item)
    }

    const addNewRecipe = (recipeName: string) => {
        addRecipe({
            recipeName,
            ingredients: selectedIngredients,
            optionalIngredients: selectedOptionalIngredients
        })
        setOptions(ingredients)
        setSelectedIngredients([])
        setOptionalOptions(ingredients)
        setSelectedOptionalIngredients([])
    }

    const deleteRecipe = (recipeName: string) => removeRecipe(recipeName)

    return {
        addIngredient,
        removeIngredient,
        selectedIngredients,
        addNewRecipe,
        recipes,
        options,
        deleteRecipe,
        optionalOptions,
        addOptionalIngredient,
        selectedOptionalIngredients,
        removeOptionalIngredient
    }
}
