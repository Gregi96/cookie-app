import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type AddRecipeProps = {
    recipeName: string,
    ingredients: Array<string>
}

const ingredientsAtom = atomWithStorage<Array<string>>('ingredients', [])
const recipesAtom = atomWithStorage<Array<AddRecipeProps>>('recipes', [])

export const useCookieStore = () => {
    const [ ingredients, setIngredients ] = useAtom(ingredientsAtom)
    const [ recipes, setRecipes ] = useAtom(recipesAtom)

    const addIngredient = (ingredient: string) => setIngredients(prev => [...prev, ingredient])

    const removeIngredient = (ingredient: string) => setIngredients(prev => prev
        .filter(ingredientInStore => ingredientInStore !== ingredient))

    const addRecipe = ({ recipeName, ingredients } : AddRecipeProps) => setRecipes(prev => [
        ...prev,
        {
            recipeName,
            ingredients
        }
    ])

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
