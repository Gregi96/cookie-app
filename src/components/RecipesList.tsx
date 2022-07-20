import React from 'react'
import { AddRecipeProps } from 'lib/stores/useCookieStore'
import styled from 'styled-components'

type RecipeListProps = {
    recipes: Array<AddRecipeProps>
}

export const RecipesList: React.FunctionComponent<RecipeListProps> = ({
    recipes
}) => (
    <div>
        {recipes.map((recipe, index) => (
            <Recipe key={index}>
                <RecipeName>
                    {recipe.recipeName}
                </RecipeName>
                <Ingredients>
                    <div>
                        Ingredients:
                    </div>
                    {recipe.ingredients.map((ingredient, index) => (
                        <Ingredient
                            key={index}
                        >
                            {ingredient}
                        </Ingredient>
                    ))}
                </Ingredients>
            </Recipe>
        ))}
    </div>
)

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
