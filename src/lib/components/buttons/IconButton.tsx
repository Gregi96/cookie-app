import React from 'react'
import styled from 'styled-components'

type IconButtonProps = {
    color?: string,
    backgroundColor?: string,
    icon: React.ReactNode,
    onClick?: VoidFunction
}

type ButtonStyles = {
    color?: string,
    backgroundColor?: string
}

export const IconButton: React.FunctionComponent<IconButtonProps> = ({
    icon,
    color,
    onClick,
    backgroundColor
}) => (
    <IconButtonContainer
        onClick={onClick}
        color={color}
        backgroundColor={backgroundColor}
    >
        {icon}
    </IconButtonContainer>
)

const IconButtonContainer = styled.div<ButtonStyles>`
    color: ${({ theme, color }) => color ? color : theme.colors.white};
    background-color: ${({ theme, backgroundColor }) => backgroundColor ? backgroundColor : theme.colors.white};
    cursor: pointer;
`
