import React from 'react'
import styled from 'styled-components'
import { useTranslationStore } from 'lib/stores'
import { Title } from 'lib/styles'
import { useRecipeActions } from 'lib/hooks'
import { BadgeList } from './BadgeList'
import { RecipesList } from './RecipesList'
import { InputWithDropdown } from './InputWithDropdown'

export const Recipes: React.FunctionComponent = () => {
    const { T } = useTranslationStore()
    const { recipeName,
        setRecipeName,
        optionsRef,
        addIngredient,
        removeIngredient,
        selectedIngredients,
        addNewRecipe,
        recipes
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
                            {selectedIngredients.length > 0 && recipeName.length > 0 && (
                                <button onClick={addNewRecipe}>
                                    Add
                                </button>
                            )}
                        </InputWithButton>
                    </Label>
                    {selectedIngredients.length > 0 && (
                        <BadgeList
                            items={selectedIngredients}
                            title={T.selectedIngredients}
                            removeBadge={item => removeIngredient(item)}
                        />
                    )}
                </LeftContainer>
                <RightContainer>
                    {T.searchIngredients}
                    <InputWithDropdown
                        optionsRef={optionsRef}
                        selectOption={item => addIngredient(item)}
                    />
                </RightContainer>
            </Container>
            {recipes.length > 0 && (
                <RecipesList recipes={recipes}/>
            )}
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

