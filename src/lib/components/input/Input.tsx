import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { debounceTime, Subject } from 'rxjs'
import { Icons } from 'assets'

const inputChange = new Subject<string>()

type InputProps = {
    value: string,
    placeholder?: string,
    withDebounce?: boolean,
    clearIcon?: boolean,
    onChange(value: string): void
}

export const Input: React.FunctionComponent<InputProps> = ({
    withDebounce,
    onChange,
    value,
    placeholder,
    clearIcon
}) => {
    const onChangeRef = useRef(onChange)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (onChange) {
            onChangeRef.current = onChange
        }
    }, [onChange])

    useEffect(() => {
        const subscription = inputChange
            .pipe(debounceTime(500))
            .subscribe(value => {
                onChangeRef.current(value)
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        if (value === '') {
            setInputValue('')
        }
    }, [value])

    return (
        <InputContainer>
            <InputStyle
                value={withDebounce ? inputValue : value}
                placeholder={placeholder}
                onChange={event => {
                    setInputValue(event.target.value)

                    if (withDebounce) {
                        return inputChange.next(event.target.value)
                    }

                    onChange(event.target.value)
                }}
            />
            {value && clearIcon && (
                <CloseWrapper>
                    <Icons.Close
                        width={20}
                        height={20}
                        onClick={() => {
                            setInputValue('')
                            onChange('')
                        }}
                    />
                </CloseWrapper>
            )}
        </InputContainer>
    )
}

const InputStyle = styled.input`
    width: 100%;
    padding: 10px;
`

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
`

const CloseWrapper = styled.div`
    position: absolute;
    right: 10px;
`
