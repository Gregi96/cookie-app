import React from 'react'
import styled from 'styled-components'
import { Icons } from 'assets'
import { AddRecipeProps, useTranslationStore } from 'lib/stores'
import { IconButton } from './IconButton'

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
        <div>
            {recipes.map((recipe, index) => (
                <Recipe key={index}>
                    <RecipeName>
                        {recipe.recipeName}
                    </RecipeName>
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
        </div>
    )
}

const Recipe = styled.div`
    display: flex;
    padding: 10px;
    background-color: bisque;
    margin-top: 10px;
`

const RecipeName = styled.div`
    width: 20%;
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
