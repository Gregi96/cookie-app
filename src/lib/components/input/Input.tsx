import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { debounceTime, Subject } from 'rxjs'
import { Icons } from 'assets'

type InputProps = {
    value: string,
    placeholder?: string,
    withDebounce?: boolean,
    clearIcon?: boolean,
    onClick?: VoidFunction,
    onChange(value: string): void
}

export const Input: React.FunctionComponent<InputProps> = ({
    withDebounce,
    onChange,
    value,
    placeholder,
    clearIcon,
    onClick
}) => {
    const inputChange = useMemo(() => new Subject<string>(), [])
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
                onClick={onClick}
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
