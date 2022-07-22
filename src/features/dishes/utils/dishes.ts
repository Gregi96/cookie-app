import { AddRecipeProps } from 'lib/stores'

type DishesWithExactIngredientsProps = {
    recipes: Array<AddRecipeProps>,
    selectedIngredients: Array<string>
}

interface DishesWithoutOneIngredientProps extends  AddRecipeProps {
    missingIngredient: string
}

export const dishesWithExactIngredientsHelper = ({ recipes, selectedIngredients } : DishesWithExactIngredientsProps) => recipes.filter(recipe => recipe.ingredients
    .every(ingredient => selectedIngredients
        .includes(ingredient) && recipe.ingredients.length === selectedIngredients.length))

export const dishesWithoutOneHelper = ({ recipes, selectedIngredients } : DishesWithExactIngredientsProps) =>
    recipes.reduce((acc, recipe) => {
        if (recipe.ingredients.length < 2 || recipe.ingredients.length !== selectedIngredients.length + 1) {
            return acc
        }

        const missingIngredient = recipe.ingredients.filter(ingredient => !selectedIngredients.includes(ingredient))

        if (missingIngredient.length === 1) {
            const [ ingredient ] = missingIngredient

            return acc.concat({
                ...recipe,
                missingIngredient: ingredient
            })
        }

        return acc
    }, [] as Array<DishesWithoutOneIngredientProps>)

