import { FC, useRef, useEffect, useCallback, useState } from 'react'

interface ModalProps {
    className?: string
    closeClassName?: string
    closeOnResize?: boolean
    children?: any
    showModalClose?: boolean
    open: boolean
    onClose: () => void
    onCloseEvent?: () => void
    onEnter?: () => void | null
}

const Modal: FC<ModalProps> = ({
    children,
    onClose,
    onCloseEvent,
    showModalClose = true,
    open,
    closeClassName,
    closeOnResize = false,
}) => {
    const ref = useRef() as React.MutableRefObject<HTMLDivElement>
    const [showModal, setShowModal] = useState(open)

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                return onClose()
            }
        },
        [onClose]
    )

    const onCloseHandler = () => {
        setShowModal(false)
        onClose()
        onCloseEvent?.()
    }

    useEffect(() => {
        setShowModal(open)
    }, [open])

    useEffect(() => {
        const modal = ref.current

        if (modal && showModal) {
            window.addEventListener('keydown', handleKey)
        }
        return () => {
            window.removeEventListener('keydown', handleKey)
        }
    }, [handleKey, showModal])

    if (!showModal) {
        return null
    }

    return (
        <div
            className='z-10 w-[90%] md:w-[22rem] h-auto modal bg-bgsecondary rounded-md p-4'
            aria-hidden={!showModal}
            tabIndex={!showModal ? -1 : 0}
        >
                <button className="block float-right hover:text-bgYellow" type="button" onClick={onCloseHandler}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                    >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M3,3 L21,21 M21,3 L3,21"
                        />
                    </svg>
                </button>
                <div
                    className={'w-full h-full overflow-y-auto focus:outline-none'}
                    role="dialog"
                    ref={ref}
                    id="modal-container"
                >
                    {children}
                </div>
        </div>

    )
}

export default Modal
