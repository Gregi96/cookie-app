import { useEffect, MouseEvent, RefObject } from 'react'

type useClickOutsideProps<T> = {
    handler: VoidFunction,
    ref: RefObject<T>
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>({ handler, ref }: useClickOutsideProps<T>) => {
    useEffect(() => {
        const clickOutside = (ev: MouseEvent) => {
            if (ref.current && !ref.current.contains(ev.target as Node)) {
                handler()
            }
        }

        // @ts-ignore
        window.addEventListener('mousedown', clickOutside, true)

        return () => {
            // @ts-ignore
            window.removeEventListener('mousedown', clickOutside, true)
        }
    }, [])
}
