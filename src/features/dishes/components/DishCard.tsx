import React from 'react'
import styled from 'styled-components'
import { AddRecipeProps, useTranslationStore } from 'lib/stores'

type DishCardProps = {
    dish: AddRecipeProps,
    missingIngredient?: string
}

export const DishCard: React.FunctionComponent<DishCardProps> = ({
    dish,
    missingIngredient
}) => {
    const { T } = useTranslationStore()

    return (
        <DishContainer>
            <DishName>
                {dish.recipeName}
                {missingIngredient && (
                    <div>
                        {T.missingIngredient} {missingIngredient}
                    </div>
                )}
            </DishName>
            <IngredientsContainer>
                {dish.ingredients.map(ingredient => (
                    <div key={ingredient}>
                        {ingredient}
                    </div>
                ))}
            </IngredientsContainer>
        </DishContainer>
    )
}

const DishContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.bisque};
    margin-bottom: 12px;
    padding: 5px;
    border-radius: 5px;
`

const DishName = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 4px;
`

const IngredientsContainer = styled.div`
    display: flex;
    gap: 5px;
`
