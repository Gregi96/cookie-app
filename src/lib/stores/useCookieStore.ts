import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { LocalStorageKey } from 'lib/types'

export type AddRecipeProps = {
    recipeName: string,
    ingredients: Array<string>
}

const ingredientsAtom = atomWithStorage<Array<string>>(LocalStorageKey.Ingredients, [])
const recipesAtom = atomWithStorage<Array<AddRecipeProps>>(LocalStorageKey.Recipes, [])

export const useCookieStore = () => {
    const [ ingredients, setIngredients ] = useAtom(ingredientsAtom)
    const [ recipes, setRecipes ] = useAtom(recipesAtom)

    const addIngredient = (ingredient: string) => setIngredients(prev => [...prev, ingredient])

    const removeIngredient = (ingredient: string) => setIngredients(prev => prev.filter(ingredientInStore => ingredientInStore !== ingredient))

    const addRecipe = ({ recipeName, ingredients } : AddRecipeProps) => setRecipes(prev => prev.concat({
        recipeName,
        ingredients
    }))

    const removeRecipe = (recipeName: string) => setRecipes(prev => prev.filter(recipe => recipe.recipeName !== recipeName))

    return {
        ingredients,
        addIngredient,
        removeIngredient,
        addRecipe,
        recipes,
        removeRecipe
    }
}
