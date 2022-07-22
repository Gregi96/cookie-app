import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'lib/styles'
import { ScreenLayout } from 'components/ScreenLayout'

export const App = () => (
    <ThemeProvider theme={theme}>
        <AppContainer>
            <ScreenLayout/>
        </AppContainer>
    </ThemeProvider>
)

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
`
