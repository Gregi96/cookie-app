import { atom, useAtom } from 'jotai'

const MockIngredients: Array<string> = [
    'cebula',
    'sól',
    'jajka',
    'ogórek',
    'pieprz',
    'kurczak',
    'pomidor',
    'majonez',
    'chleb',
    'bulka',
    'smietana',
    'mleko',
    'mąka',
    'oregano',
    'bazylia',
    'makaron',
    'koperek',
    'maslo',
    'ser zolty'
]

const MockRecipes: Array<AddRecipeProps> = [
    {
        recipeName: 'jajecznica',
        ingredients: ['cebula', 'maslo', 'pieprz', 'sol']
    },
    {
        recipeName: 'sniadanie',
        ingredients: ['mleko', 'maslo', 'platki', 'ogorek']
    }
]

export type AddRecipeProps = {
    recipeName: string,
    ingredients: Array<string>
}

const ingredientsAtom = atom(MockIngredients)
const recipesAtom = atom<Array<AddRecipeProps>>(MockRecipes)

export const useCookieStore = () => {
    const [ ingredients, setIngredients ] = useAtom(ingredientsAtom)
    const [ recipes, setRecipes ] = useAtom(recipesAtom)

    const addIngredient = (ingredient: string) =>
        setIngredients(prev => [...prev, ingredient])

    const removeIngredient = (ingredient: string) =>
        setIngredients(prev => prev.filter(ingredientInStore => ingredientInStore !== ingredient))

    const addRecipe = ({ recipeName, ingredients } : AddRecipeProps) =>
        setRecipes(prev => [...prev, {
            recipeName,
            ingredients
        }])

    const removeRecipe = () => {}

    return {
        ingredients,
        addIngredient,
        removeIngredient,
        addRecipe,
        recipes
    }
}
