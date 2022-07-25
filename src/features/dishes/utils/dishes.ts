import { AddRecipeProps } from 'lib/stores'
import { DishesWithoutOneIngredientProps } from '../types'

type DishesWithExactIngredientsProps = {
    recipes: Array<AddRecipeProps>,
    selectedIngredients: Array<string>
}

export const dishesWithExactIngredientsHelper = ({ recipes, selectedIngredients }: DishesWithExactIngredientsProps) => recipes
    .filter(recipe => recipe.ingredients
        .every(ingredient => selectedIngredients.includes(ingredient)))

export const dishesWithoutOneHelper = ({ recipes, selectedIngredients }: DishesWithExactIngredientsProps) => recipes
    .reduce((acc, recipe) => {
        if (recipe.ingredients.length === 1 || recipe.ingredients.length !== selectedIngredients.length + 1) {
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

