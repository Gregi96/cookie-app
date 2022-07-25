import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { LocalStorageKey } from 'lib/types'

export interface AddRecipeProps {
    recipeName: string,
    ingredients: Array<string>,
    optionalIngredients: Array<string>
}

const ingredientsAtom = atomWithStorage<Array<string>>(LocalStorageKey.Ingredients, [])
const recipesAtom = atomWithStorage<Array<AddRecipeProps>>(LocalStorageKey.Recipes, [])

export const useCookieStore = () => {
    const [ ingredients, setIngredients ] = useAtom(ingredientsAtom)
    const [ recipes, setRecipes ] = useAtom(recipesAtom)

    const addIngredient = (ingredient: string) => setIngredients(prev => [...prev, ingredient])

    const removeIngredient = (ingredient: string) => setIngredients(prev => prev.filter(ingredientInStore => ingredientInStore !== ingredient))

    const addRecipe = ({ recipeName, ingredients, optionalIngredients }: AddRecipeProps) => setRecipes(prev => prev.concat({
        recipeName,
        ingredients,
        optionalIngredients
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
