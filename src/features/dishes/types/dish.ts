import { AddRecipeProps } from 'lib/stores'

export interface DishesWithoutOneIngredientProps extends AddRecipeProps {
    missingIngredient: string
}
