import React from 'react'
import styled from 'styled-components'

type ButtonStyles = {
    backgroundColor?: string,
    textColor?: string
}

type ButtonProps = {
    onClick: VoidFunction,
    textColor?: string,
    backgroundColor?: string,
    disabled?: boolean,
    content: string
}

export const Button: React.FunctionComponent<ButtonProps> = ({
    onClick,
    content,
    backgroundColor,
    disabled,
    textColor
}) => (
    <ButtonContainer
        onClick={onClick}
        backgroundColor={backgroundColor}
        textColor={textColor}
        disabled={disabled}
    >
        {content}
    </ButtonContainer>
)

const ButtonContainer = styled.button<ButtonStyles>`
    color: ${({ theme, textColor }) => textColor ? textColor : theme.colors.black};
    background-color: ${({ theme, backgroundColor }) => backgroundColor ? backgroundColor : theme.colors.white};
`
