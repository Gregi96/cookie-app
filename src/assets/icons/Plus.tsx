import React from 'react'
import { Icon } from 'components'
import { SvgIcon } from 'lib/types'

export const Plus: React.FunctionComponent<SvgIcon> = props => (
    <Icon {...props}>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
    </Icon>
)
