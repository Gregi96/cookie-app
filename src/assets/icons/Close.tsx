import React from 'react'
import { Icon } from 'components'
import { SvgIcon } from 'lib/types'

export const Close: React.FunctionComponent<SvgIcon> = props => (
    <Icon {...props}>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
    </Icon>
)
