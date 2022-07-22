import React from 'react'
import { SvgIcon } from 'lib/types'

export const Icon: React.FunctionComponent<SvgIcon> = ({
    width,
    fill,
    height,
    pointer,
    viewBox,
    children,
    onClick
}) => (
    <svg
        role="svg"
        width={width}
        height={height}
        onClick={onClick}
        fill={fill || 'black'}
        viewBox={viewBox || '0 0 24 24'}
        style={{
            cursor: (pointer || onClick) ? 'pointer' : undefined
        }}

    >
        {children}
    </svg>
)
