import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AddRecipeProps, useCookieStore, useTranslationStore } from 'lib/stores'
import { useRecipeActions } from 'lib/hooks'
import { Title } from 'lib/styles'
import { InputWithDropdown } from './InputWithDropdown'
import { BadgeList } from './BadgeList'

type DishesWithoutOneIngredientProps = AddRecipeProps & {
    missingIngredient: string
}

export const Dishes: React.FunctionComponent = () => {
    const { T } = useTranslationStore()
    const { recipes } = useCookieStore()
    const [proposalDishes, setProposalDishes] = useState<Array<AddRecipeProps>>([])
    const [dishesWithoutOneIngredient, setDishesWithoutOneIngredient]= useState<Array<DishesWithoutOneIngredientProps>>([])

    const {
        addIngredient,
        options,
        selectedIngredients,
        removeIngredient
    } = useRecipeActions()

    useEffect(() => {
        const dishesWithExactIngredients = recipes.reduce((acc, recipe) => {
            const checking = recipe.ingredients.reduce((acc, ingredient) =>
                selectedIngredients.includes(ingredient)
            , false)

            if (checking && recipe.ingredients.length === selectedIngredients.length) {
                return [...acc, recipe]
            }

            return acc
        }, [] as Array<AddRecipeProps>)

        const dishesWithoutOne = recipes.reduce((acc, recipe) => {
            if (recipe.ingredients.length < 2 || recipe.ingredients.length !== selectedIngredients.length + 1) {
                return acc
            }

            const missingIngredient = recipe.ingredients.filter(ingredient => !selectedIngredients.includes(ingredient))

            if (missingIngredient.length < 2) {
                const [ ingredient ] = missingIngredient

                return [...acc, {
                    ...recipe,
                    missingIngredient: ingredient
                }]
            }

            return acc
        }, [] as Array<DishesWithoutOneIngredientProps>)

        setProposalDishes(dishesWithExactIngredients)
        setDishesWithoutOneIngredient(dishesWithoutOne)
    }, [selectedIngredients])

    return (
        <div>
            <Title>
                {T.dishes}
            </Title>
            <InputWithDropdown
                options={options}
                selectOption={addIngredient}
            />
            <div>
                {selectedIngredients.length > 0 && (
                    <BadgeList
                        items={selectedIngredients}
                        title={T.selectedIngredients}
                        removeBadge={removeIngredient}
                    />
                )}
            </div>
            <DishesContainer>
                {T.searchedDishes}
                {proposalDishes.map(dishes => (
                    <div key={dishes.recipeName}>
                        {dishes.recipeName}
                    </div>
                ))}
            </DishesContainer>
            <DishesContainer>
                {T.dishesWithoutOne}
                {dishesWithoutOneIngredient.map(dishes => (
                    <div key={dishes.recipeName}>
                        {dishes.recipeName}
                    </div>
                ))}
            </DishesContainer>
        </div>
    )
}

const DishesContainer = styled.div`
    margin-top: 150px;
`
