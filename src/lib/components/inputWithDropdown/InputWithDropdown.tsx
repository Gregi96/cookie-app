import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
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
        onClickOutside: () => {
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

    const animateDropdownContainer = {
        open: {
            opacity: 1,
            y: '20px' ,
            display: 'block'
        },
        initial: {
            display: 'none',
            opacity: 1,
            y: '5px'
        },
        exit: {
            opacity: 0,
            y: '5px',
            transitionEnd: {
                display: 'none'
            }
        }
    }

    const animateItem = {
        initial: {
            opacity: 0,
            height: 0
        },
        exit: {
            height: 0,
            opacity: 0
        },
        animate: {
            opacity: 1,
            height: '26px'
        }
    }

    return (
        <Container ref={nodeRef}>
            <Input
                value={ingredientValue}
                onChange={filterDropdownOption}
                withDebounce
                clearIcon
            />
            <AnimatePresence>
                {dropdownOption.length > 0 && (
                    <motion.div
                        variants={animateDropdownContainer}
                        initial={'initial'}
                        animate={'open'}
                        exit={'exit'}
                    >
                        <Dropdown>
                            <AnimatePresence>
                                {dropdownOption.map((item => (
                                    <motion.div
                                        variants={animateItem}
                                        key={item}
                                        initial={'initial'}
                                        animate={'animate'}
                                        exit={'exit'}
                                    >
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
                                    </motion.div>
                                )))}
                            </AnimatePresence>
                        </Dropdown>
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    )
}

const Dropdown = styled.div`
    width: 100%;
    position: absolute;
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
