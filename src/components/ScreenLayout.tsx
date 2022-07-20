import React, { Fragment } from 'react'
import { renderRoutes } from 'lib/routing'
import { Navigation } from './Navigation'
import styled from 'styled-components'

export const ScreenLayout: React.FunctionComponent = () => {

    return (
        <Fragment>
            <Navigation/>
            <Container>
                {renderRoutes()}
            </Container>
        </Fragment>
    )
}

const Container = styled.div`
    height: calc(100% - 96px);
    padding-left: 50px;
    padding-right: 50px;
`
