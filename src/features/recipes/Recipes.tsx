import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslationStore } from 'lib/stores'
import { Title } from 'lib/styles'
import { useRecipeActions } from 'lib/hooks'
import { BadgeList, RecipesList, InputWithDropdown, Button } from 'lib/components'

export const Recipes: React.FunctionComponent = () => {
    const { T } = useTranslationStore()
    const [recipeName, setRecipeName] = useState('')
    const {
        addIngredient,
        removeIngredient,
        selectedIngredients,
        addNewRecipe,
        recipes,
        options,
        deleteRecipe
    } = useRecipeActions()

    return (
        <div>
            <Title>
                {T.recipes}
            </Title>
            <Container>
                <LeftContainer>
                    <Label>
                        {T.nameOfRecipe}
                        <InputWithButton>
                            <Input
                                value={recipeName}
                                onChange={event => setRecipeName(event.target.value)}
                            />
                            {selectedIngredients.length > 0 && recipeName && (
                                <Button
                                    onClick={() => {
                                        addNewRecipe(recipeName)
                                        setRecipeName('')
                                    }}
                                    content={T.add}
                                />
                            )}
                        </InputWithButton>
                    </Label>
                    <BadgeList
                        items={selectedIngredients}
                        title={T.selectedIngredients}
                        removeBadge={removeIngredient}
                    />
                </LeftContainer>
                <RightContainer>
                    {T.searchIngredients}
                    <InputWithDropdown
                        options={options}
                        selectOption={addIngredient}
                    />
                </RightContainer>
            </Container>
            <RecipesList
                recipes={recipes}
                removeRecipe={deleteRecipe}
            />
        </div>
    )
}

const Container = styled.div`
    display: flex;
    align-items: start;
`

const Label = styled.label`
    width: 100%;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
`

const InputWithButton = styled.div`
    position: relative;
    button {
      position: absolute;
      top: 0;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
`

const LeftContainer = styled.div`
    width: 100%;
`

const RightContainer = styled.div`
    width: 100%;
`

