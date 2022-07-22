import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Icons } from 'assets'

type BadgeListProps = {
    items: Array<string>,
    title: string,
    removeBadge(item: string): void
}

export const BadgeList: React.FunctionComponent<BadgeListProps> = ({
    items,
    title,
    removeBadge
}) => (
    <Fragment>
        {Boolean(items.length) && (
            <Fragment>
                <Title>
                    {title}
                </Title>
                <BadgeContainer>
                    {items.map(ingredient => (
                        <Badge key={ingredient}>
                            {ingredient}
                            <RemoveIcon>
                                <Icons.Close
                                    onClick={() => removeBadge(ingredient)}
                                    width={15}
                                    height={15}
                                />
                            </RemoveIcon>
                        </Badge>
                    ))}
                </BadgeContainer>
            </Fragment>
        )}
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
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    background-color: ${({ theme }) => theme.colors.lightgray};
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
`

