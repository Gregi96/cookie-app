import React, { useState } from 'react'
import styled from 'styled-components'
import { Icons } from 'assets'
import { useCookieStore, useTranslationStore } from 'lib/stores'
import { Title } from 'lib/styles'
import { Input } from './Input'
import { IconButton } from './IconButton'

export const Ingredients: React.FunctionComponent = () => {
    const [ingredientValue, setIngredientValue] = useState('')
    const { ingredients, removeIngredient, addIngredient } = useCookieStore()
    const { T } = useTranslationStore()

    const handleAddIngredient = () => {
        addIngredient(ingredientValue)
        setIngredientValue('')
    }

    return (
        <InnerContainer>
            <Title>
                {T.ingredients}
            </Title>
            <AddContainer>
                <Input
                    value={ingredientValue}
                    onChange={setIngredientValue}
                    placeholder={T.addIngredientPlaceholder}
                />
                <IconButton
                    icon={(
                        <Icons.Plus
                            pointer
                            height={30}
                            width={30}
                            onClick={handleAddIngredient}
                        />
                    )}
                />
            </AddContainer>
            <div>
                {ingredients.map(ingredient => (
                    <Ingredient key={ingredient}>
                        {ingredient}
                        <IconButton
                            icon={(
                                <Icons.Bin
                                    width={24}
                                    height={24}
                                    onClick={() => removeIngredient(ingredient)}
                                />
                            )}
                        />
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
