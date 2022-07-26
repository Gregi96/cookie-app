import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Icons } from 'assets'
import { AddRecipeProps, useTranslationStore } from 'lib/stores'
import { IconButton } from 'lib/components'

type RecipeListProps = {
    recipes: Array<AddRecipeProps>,
    removeRecipe(recipe: string): void
}

export const RecipesList: React.FunctionComponent<RecipeListProps> = ({
    recipes,
    removeRecipe
}) => {
    const { T } = useTranslationStore()

    return (
        <Fragment>
            {recipes.map((recipe, index) => (
                <Recipe key={index}>
                    <RecipeName>
                        {recipe.recipeName}
                    </RecipeName>
                    <IngredientsContainer>
                        <Ingredients>
                            <div>
                                {T.ingredients}:
                            </div>
                            {recipe.ingredients.map(ingredient => (
                                <Ingredient key={ingredient}>
                                    {ingredient}
                                </Ingredient>
                            ))}
                        </Ingredients>
                        {recipe.optionalIngredients.length > 0 && (
                            <OptionalIngredients>
                                {T.optionalIngredients}
                                {recipe.optionalIngredients.map(ingredient => (
                                    <Ingredient key={ingredient}>
                                        {ingredient}
                                    </Ingredient>
                                ))}
                            </OptionalIngredients>
                        )}
                    </IngredientsContainer>
                    <RemoveRecipeWrapper>
                        <IconButton
                            icon={(
                                <Icons.Bin
                                    width={24}
                                    height={24}
                                    onClick={() => removeRecipe(recipe.recipeName)}
                                />
                            )}
                        />
                    </RemoveRecipeWrapper>
                </Recipe>
            ))}
        </Fragment>
    )
}

const Recipe = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.bisque};
    margin-top: 10px;
`

const RecipeName = styled.div`
    width: 20%;
    background-color: ${({ theme }) => theme.colors.burlywood};
    padding: 5px 10px;
    margin-right: 30px;
    border-radius: 5px;
    align-self: flex-start;
`

const Ingredients = styled.div`
    display: flex;
`

const Ingredient = styled.div`
    margin-left: 15px;
`

const RemoveRecipeWrapper = styled.div`
    margin-left: auto;
`

const OptionalIngredients = styled.div`
    width: 100%;
    display: flex;
    margin-top: 15px;
`

const IngredientsContainer = styled.div`
    display: flex;
    flex-direction: column;
`
