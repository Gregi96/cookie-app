import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Icons } from 'assets'

type BadgeListProps = {
    items: Array<any>,
    title: string,
    removeBadge(item: string): void
}

export const BadgeList: React.FunctionComponent<BadgeListProps> = ({
    items,
    title,
    removeBadge
}) => (
    <Fragment>
        <Title>
            {title}
        </Title>
        <BadgeContainer>
            {items.length > 0 && (items.map((ingredient, index) => (
                <Badge key={index}>
                    {ingredient}
                    <RemoveIcon onClick={() => removeBadge(ingredient)}>
                        <Icons.Close/>
                    </RemoveIcon>
                </Badge>
            )))}
        </BadgeContainer>
    </Fragment>
)

const BadgeContainer = styled.div`
    display: flex;
`

const Title = styled.div`
    margin-top: 5px;
    margin-bottom: 12px;
`

const Badge = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.colors.bisque};
    padding: 5px 10px;
    margin-right: 15px;
    border-radius: 7px;
`

const RemoveIcon = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    background-color: ${({ theme }) => theme.colors.lightgray};
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
`

