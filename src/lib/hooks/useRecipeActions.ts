import { useRef, useState } from 'react'
import { useCookieStore } from 'lib/stores'

export const useRecipeActions = () => {
    const { ingredients, addRecipe, recipes, removeRecipe } = useCookieStore()
    const [selectedIngredients, setSelectedIngredients] = useState<Array<string>>([])
    const [options, setOptions] = useState<Array<string>>(ingredients)

    const addIngredient = (item: string) => {
        setSelectedIngredients(prev => [...prev, item])
        setOptions(prev => prev.filter((ingredient => ingredient !== item)))
    }

    const removeIngredient = (item: string) => {
        setSelectedIngredients(prev => prev.filter(ingredient => ingredient !== item))
        setOptions(prev => prev.concat(item))
    }

    const addNewRecipe = (recipeName: string) => {
        addRecipe({
            recipeName,
            ingredients: selectedIngredients
        })
        setSelectedIngredients([])
    }

    const deleteRecipe = (recipeName: string) => removeRecipe(recipeName)

    return {
        addIngredient,
        removeIngredient,
        selectedIngredients,
        addNewRecipe,
        recipes,
        options,
        deleteRecipe
    }
}
