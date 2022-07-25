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
                <RecipeName>
                    {dish.recipeName}
                </RecipeName>
                {missingIngredient && (
                    <MissingName>
                        {T.missingIngredient} {missingIngredient}
                    </MissingName>
                )}
            </DishName>
            <IngredientsWrapper>
                <IngredientsContainer>
                    {T.ingredients}
                    {dish.ingredients.map(ingredient => (
                        <div key={ingredient}>
                            {ingredient}
                        </div>
                    ))}
                </IngredientsContainer>
                {dish.optionalIngredients.length > 0 && (
                    <IngredientsContainer>
                        {T.optionalIngredients}
                        {dish.optionalIngredients.map(ingredient => (
                            <div key={ingredient}>
                                {ingredient}
                            </div>
                        ))}
                    </IngredientsContainer>
                )}
            </IngredientsWrapper>
        </DishContainer>
    )
}

const DishContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.bisque};
    display: flex;
    margin-bottom: 12px;
    padding: 5px;
    border-radius: 5px;
`

const DishName = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
`

const IngredientsContainer = styled.div`
    display: flex;
    gap: 5px;
`

const IngredientsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 30px;
`

const RecipeName = styled.div`
    background-color: ${({ theme }) => theme.colors.burlywood};
    padding: 5px 10px;
    border-radius: 5px;
`

const MissingName = styled.div`
    background-color: ${({ theme }) => theme.colors.brown};
    color: ${({ theme }) => theme.colors.white};
    margin-top: 10px;
    border-radius: 5px;
    padding: 5px 10px;
`
