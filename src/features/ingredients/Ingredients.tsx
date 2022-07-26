import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Icons } from 'assets'
import { useCookieStore, useTranslationStore } from 'lib/stores'
import { Title } from 'lib/styles'
import { Input, IconButton } from 'lib/components'

export const Ingredients: React.FunctionComponent = () => {
    const [ingredientValue, setIngredientValue] = useState('')
    const { ingredients, removeIngredient, addIngredient } = useCookieStore()
    const lastElementRef = useRef<null | HTMLDivElement>(null)
    const [scrollDownFlag, setScrollDownFlag] = useState(false)
    const { T } = useTranslationStore()

    const handleAddIngredient = () => {
        addIngredient(ingredientValue)
        setIngredientValue('')
        setScrollDownFlag(prev => !prev)
    }

    useEffect(() => {
        if (lastElementRef.current && scrollDownFlag) {
            lastElementRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [scrollDownFlag])

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
            <IngredientContainer>
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
                <div ref={lastElementRef}/>
            </IngredientContainer>
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
`

const IngredientContainer = styled.div`
    max-height: 500px;
    overflow-y: auto;
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
