import { TOAST_TYPE, useToastStore } from '@/store/toastStore'
import SuccessIcon from '@/assets/icons/success.svg?react'
import ErrorIcon from '@/assets/icons/error.svg?react'

const Toast = () => {
  const isOpen = useToastStore((state) => state.isOpen)
  const message = useToastStore((state) => state.message)
  const type = useToastStore((state) => state.type)
  return (
    <div>
      <div
        className={`pointer-events-none fixed top-10 left-1/2 z-50 -translate-x-1/2 transition-all duration-200 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}
      >
        <div
          className={`${type === TOAST_TYPE.SUCCESS ? 'border-switchwon-blue-500 bg-switchwon-blue-disabled' : 'border-switchwon-red bg-switchwon-red-disabled'} flex items-center gap-2 rounded-md border px-3 py-2 shadow-lg`}
        >
          {type === TOAST_TYPE.SUCCESS ? (
            <SuccessIcon width={20} height={20} />
          ) : (
            <ErrorIcon width={20} height={20} />
          )}
          <span className="text-switchwon-gray-0 text-lg font-medium">
            {message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Toast
