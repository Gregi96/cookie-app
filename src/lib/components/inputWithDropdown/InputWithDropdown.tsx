import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Input } from 'lib/components'
import { useClickOutside } from 'lib/hooks'

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
    const [isOpen, setIsOpen] = useState(false)
    const nodeRef = useRef<HTMLDivElement>(null)
    useClickOutside({
        outsideClick: () => {
            setIsOpen(false)
            setIngredientValue('')
            setDropdownOption([])
        },
        ref: nodeRef
    })

    const filterDropdownOption = (value: string) => {
        if (value === '') {
            setIngredientValue(value)

            return setDropdownOption([])
        }

        const filteredValue = options.filter(ingredient => ingredient.includes(value))

        setIngredientValue(value)
        setDropdownOption(filteredValue)
    }

    return (
        <Container ref={nodeRef}>
            <Input
                value={ingredientValue}
                onChange={filterDropdownOption}
                withDebounce
                clearIcon
                isOpenDropdown={() => setIsOpen(true)}
            />
            {isOpen && dropdownOption.length > 0 && (
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
    max-height: 314px;
    overflow-y: auto;
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
