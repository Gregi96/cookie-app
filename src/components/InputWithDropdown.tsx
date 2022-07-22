import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from './Input'

type InputWithDropdownProps = {
    options: Array<string>,
    selectOption(item: string): void
}

export const InputWithDropdown: React.FunctionComponent<InputWithDropdownProps> = ({
    selectOption,
    options
}) => {
    const [dropdownOption, setDropdownOption] = useState<Array<string>>([])
    const [ingredientValue, setIngredientValue] = useState('')

    const filterDropdownOption = (value: string) => {
        if (value === '') {
            return setDropdownOption([])
        }

        const filteredValue = options.filter(ingredient => ingredient.includes(value))

        setIngredientValue(value)
        setDropdownOption(filteredValue)
    }

    return (
        <Container>
            <Input
                value={ingredientValue}
                onChange={filterDropdownOption}
                withDebounce
            />
            {dropdownOption.length > 0 && (
                <Dropdown>
                    {dropdownOption.map((item => (
                        <DropdownItem
                            key={item}
                            onClick={() => {
                                selectOption(item)
                                setDropdownOption([])
                                setIngredientValue('')
                            }}
                        >
                            {item}
                        </DropdownItem>
                    )))}
                </Dropdown>
            )}
        </Container>
    )
}

const Dropdown = styled.div`
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    border: 1px solid ${({ theme }) => theme.colors.red};
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1;
`

const Container = styled.div`
    width: 100%;
    position: relative;
`

const DropdownItem = styled.div`
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }
`
