import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useCookieStore, useTranslationStore } from 'lib/stores'
import { useRecipeActions } from 'lib/hooks'
import { Title } from 'lib/styles'
import { InputWithDropdown, BadgeList } from 'lib/components'
import { dishesWithExactIngredientsHelper, dishesWithoutOneHelper } from './utils'

export const Dishes: React.FunctionComponent = () => {
    const { T } = useTranslationStore()
    const { recipes } = useCookieStore()

    const {
        addIngredient,
        options,
        selectedIngredients,
        removeIngredient
    } = useRecipeActions()

    const proposalDishes = useMemo(() => dishesWithExactIngredientsHelper({
        selectedIngredients,
        recipes
    }), [selectedIngredients])
    const dishesWithoutOneIngredient = useMemo(() => dishesWithoutOneHelper({
        selectedIngredients,
        recipes
    }), [selectedIngredients])

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
