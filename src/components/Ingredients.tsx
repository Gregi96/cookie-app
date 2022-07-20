import React, { useState } from 'react'
import styled from 'styled-components'
import { Icons } from 'assets'
import { useCookieStore, useTranslationStore } from 'lib/stores'
import { Title } from 'lib/styles'

export const Ingredients: React.FunctionComponent = () => {
    const [inputValue, setInputValue] = useState('')
    const { ingredients, removeIngredient, addIngredient } = useCookieStore()
    const { T } = useTranslationStore()

    const handleAddIngredient = () => {
        addIngredient(inputValue)
        setInputValue('')
    }

    return (
        <InnerContainer>
            <Title>
                {T.ingredients}
            </Title>
            <AddContainer>
                <input
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    placeholder={T.addIngredientPlaceholder}
                />
                <button onClick={handleAddIngredient}>
                    +
                </button>
            </AddContainer>
            <div>
                {ingredients.map(ingredient => (
                    <Ingredient
                        key={ingredient}
                    >
                        {ingredient}
                        <RemoveButton onClick={() => removeIngredient(ingredient)}>
                            <Icons.Bin/>
                        </RemoveButton>
                    </Ingredient>
                ))}
            </div>
        </InnerContainer>
    )
}

const InnerContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
`

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  input {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
  }
  button {
    width: 35px;
    height: 35px;
    margin-left: 5px;
    background-color: ${({ theme }) => theme.colors.bisque};
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.brown};
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.brown};
      color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.white};
    }
  }
`

const Ingredient = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bisque};
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.brown};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.darkgray};
`

const RemoveButton = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.brown};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.brown};
  }
`
