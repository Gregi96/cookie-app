import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ScreenNames } from 'lib/routing'
import { useTranslationStore } from 'lib/stores'

type RouteLinkProps = {
    isActive: boolean
}

export const Navigation: React.FunctionComponent = () => {
    const { pathname } = useLocation()
    const { T } = useTranslationStore()

    return (
        <TopMenuContainer>
            <RouteWrapper isActive={ScreenNames.Ingredients === pathname}>
                <RouteLink to={ScreenNames.Ingredients}>
                    {T.ingredients}
                </RouteLink>
            </RouteWrapper>
            <RouteWrapper isActive={ScreenNames.Recipes === pathname}>
                <RouteLink to={ScreenNames.Recipes}>
                    {T.recipes}
                </RouteLink>
            </RouteWrapper>
            <RouteWrapper isActive={ScreenNames.Dishes === pathname}>
                <RouteLink to={ScreenNames.Dishes}>
                    {T.dishes}
                </RouteLink>
            </RouteWrapper>
        </TopMenuContainer>
    )
}

const TopMenuContainer = styled.div`
    display: flex;
    max-width: 400px;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 30px;
    margin: auto;
`

const RouteLink = styled(Link)`
    text-decoration: none;
`

const RouteWrapper = styled.div<RouteLinkProps>`
    padding: 10px 20px;
    text-decoration: none;
    background-color: ${({ isActive, theme }) => isActive ? theme.colors.brown : theme.colors.bisque};
    font-weight: bold;
    border-radius: 3px;
    a {
        color: ${({ isActive, theme }) => isActive ? theme.colors.white : theme.colors.darkgray};
    }
`
