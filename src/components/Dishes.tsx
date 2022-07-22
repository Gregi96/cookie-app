import React from 'react'
import { useTranslationStore } from 'lib/stores'

export const Dishes: React.FunctionComponent = () => {
    const { T } = useTranslationStore()

    return (
        <div>
            {T.dishes}
        </div>
    )
}
