import React from 'react'
import styled from 'styled-components'

export const Title: React.FunctionComponent = ({ children }) => (
    <TitleWrapper>
        {children}
    </TitleWrapper>
)

const TitleWrapper = styled.div`
    text-align: center;
    font-size: 32px;
    margin-bottom: 25px;
`
