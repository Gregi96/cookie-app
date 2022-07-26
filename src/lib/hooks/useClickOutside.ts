import { useEffect, RefObject } from 'react'

type UseClickOutsideProps<T> = {
    outsideClick: VoidFunction,
    ref: RefObject<T>
}

export const useClickOutside = <T extends HTMLElement>({
    outsideClick,
    ref
}: UseClickOutsideProps<T>) => {
    useEffect(() => {
        const clickOutside = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                outsideClick()
            }
        }

        window.addEventListener('mousedown', clickOutside, true)

        return () => {
            window.removeEventListener('mousedown', clickOutside, true)
        }
    }, [])
}
