import { useRef, useState } from 'react'
import { useCookieStore } from 'lib/stores'

export const useRecipeActions = () => {
    const { ingredients, addRecipe, recipes } = useCookieStore()
    const [recipeName, setRecipeName] = useState('')
    const optionsRef = useRef<Array<string>>(ingredients)
    const [selectedIngredients, setSelectedIngredients] = useState<Array<string>>([])

    const addIngredient = (item: string) => {
        setSelectedIngredients(prev => [...prev, item])

        optionsRef.current = optionsRef.current.filter((ingredient => ingredient !== item))
    }

    const removeIngredient = (item: string) => {
        setSelectedIngredients(prev => prev.filter(ingredient => ingredient !== item))

        optionsRef.current = optionsRef.current.concat(item)
    }

    const addNewRecipe = () => {
        addRecipe({
            recipeName,
            ingredients: selectedIngredients
        })
        setRecipeName('')
        setSelectedIngredients([])

        optionsRef.current = ingredients
    }

    return {
        recipeName,
        setRecipeName,
        optionsRef,
        addIngredient,
        removeIngredient,
        selectedIngredients,
        addNewRecipe,
        recipes
    }
}
