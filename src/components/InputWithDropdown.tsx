import React, { useEffect, useState } from 'react'
import { debounceTime, Subject } from 'rxjs'
import styled from 'styled-components'

const inputChange = new Subject<string>()

type InputWithDropdownProps = {
    optionsRef: React.MutableRefObject<Array<string>>,
    selectOption(item: string): void
}

export const InputWithDropdown: React.FunctionComponent<InputWithDropdownProps> = ({
    selectOption,
    optionsRef
}) => {
    const [dropdownOption, setDropdownOption] = useState<Array<string>>([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const subscription = inputChange
            .pipe(debounceTime(500))
            .subscribe(value => {
                if (value === '') {
                    return setDropdownOption([])
                }

                const filteredValue = optionsRef.current.filter(ingredient => ingredient.includes(value))

                setDropdownOption(filteredValue)
            })

        return () => subscription.unsubscribe()
    }, [])

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputChange.next(event.target.value)
    }

    return (
        <Container>
            <Input
                value={inputValue}
                onChange={event => {
                    setInputValue(event.target.value)
                    onInputChange(event)
                }}
            />
            {dropdownOption.length > 0 && (
                <Dropdown>
                    {dropdownOption.map(((item, index) => (
                        <DropdownItem
                            key={index}
                            onClick={() => {
                                selectOption(item)
                                setDropdownOption([])
                                setInputValue('')
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
`

const Container = styled.div`
    width: 100%;
    position: relative;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
`

const DropdownItem = styled.div`
    padding: 5px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.lightgray};
    }
`
