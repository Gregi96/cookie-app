import { useEffect, RefObject } from 'react'

type UseClickOutsideProps<T> = {
    onClickOutside: VoidFunction,
    ref: RefObject<T>
}

export const useClickOutside = <T extends HTMLElement>({
    onClickOutside,
    ref
}: UseClickOutsideProps<T>) => {
    useEffect(() => {
        const clickOutside = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutside()
            }
        }

        window.addEventListener('mousedown', clickOutside, true)

        return () => {
            window.removeEventListener('mousedown', clickOutside, true)
        }
    }, [])
}
