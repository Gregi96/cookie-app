import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AddRecipeProps, useCookieStore, useTranslationStore } from 'lib/stores'
import { useRecipeActions } from 'lib/hooks'
import { Title } from 'lib/styles'
import { InputWithDropdown, BadgeList } from 'lib/components'
import { dishesWithExactIngredientsHelper, dishesWithoutOneHelper } from './utils'
import { DishesWithoutOneIngredientProps } from './types'

export const Dishes: React.FunctionComponent = () => {
    const { T } = useTranslationStore()
    const { recipes } = useCookieStore()
    const [proposalDishes, setProposalDishes] = useState<Array<AddRecipeProps>>([])
    const [dishesWithoutOneIngredient, setDishesWithoutOneIngredient] = useState<Array<DishesWithoutOneIngredientProps>>([])

    const {
        addIngredient,
        options,
        selectedIngredients,
        removeIngredient
    } = useRecipeActions()

    useEffect(() => {
        const dishesWithExactIngredients = dishesWithExactIngredientsHelper({
            selectedIngredients,
            recipes
        })
        const dishesWithoutOne = dishesWithoutOneHelper({
            selectedIngredients,
            recipes
        })

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
            <BadgeList
                items={selectedIngredients}
                title={T.selectedIngredients}
                removeBadge={removeIngredient}
            />
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
