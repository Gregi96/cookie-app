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
        deleteRecipe,
        optionalOptions,
        addOptionalIngredient,
        selectedOptionalIngredients,
        removeOptionalIngredient
    } = useRecipeActions()

    return (
        <div>
            <Title>
                {T.recipes}
            </Title>
            <Container>
                <FieldContainer>
                    <Label>
                        {T.nameOfRecipe}
                        <InputWithButton>
                            <Input
                                value={recipeName}
                                onChange={event => setRecipeName(event.target.value)}
                            />
                            {(selectedIngredients.length > 0 || selectedOptionalIngredients.length > 0) &&
                                recipeName && (
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
                </FieldContainer>
                <FieldContainer>
                    {T.searchIngredients}
                    <InputWithDropdown
                        options={options}
                        selectOption={addIngredient}
                    />
                </FieldContainer>
                <FieldContainer>
                    {T.optionalIngredients}
                    <InputWithDropdown
                        options={optionalOptions}
                        selectOption={addOptionalIngredient}
                    />
                </FieldContainer>
            </Container>
            <BadgeList
                items={selectedIngredients}
                title={T.selectedIngredients}
                removeBadge={removeIngredient}
            />
            <BadgeList
                items={selectedOptionalIngredients}
                title={T.selectedOptionalIngredients}
                removeBadge={removeOptionalIngredient}
            />
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
    flex-wrap: wrap;
`

const Label = styled.label`
    width: 100%;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
`

const InputWithButton = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    button {
      position: absolute;
      right: 10px;
    }
`

const FieldContainer = styled.div`
    width: 50%;
    margin-bottom: 10px;
`

