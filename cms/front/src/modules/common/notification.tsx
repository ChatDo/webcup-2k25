// TODO: Fix "Comp is not a function"
'use client'

import { createSignal } from 'solid-js'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function NotificationComponent(props: {}) {
    const [show, setShow] = createSignal(true)

    return (
        <>
            {/* Global notification live region, render this permanently at the end of the document */}
            <div
                aria-live="assertive"
                class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition show={show}>
                        <div class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-closed:opacity-0 data-enter:transform data-enter:duration-300 data-enter:ease-out data-closed:data-enter:translate-y-2 data-leave:duration-100 data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
                            <div class="p-4">
                                <div class="flex items-start">
                                    <div class="shrink-0">
                                        <CheckCircleIcon aria-hidden="true" class="size-6 text-green-400" />
                                    </div>
                                    <div class="ml-3 w-0 flex-1 pt-0.5">
                                        <p class="text-sm font-medium text-gray-900">props.headline</p>
                                        <p class="mt-1 text-sm text-gray-500">props.description</p>
                                    </div>
                                    <div class="ml-4 flex shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                            class="inline-flex rounded-md bg-white text-gray-400
                                            hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                                        >
                                            <span class="sr-only">Close</span>
                                            <XMarkIcon aria-hidden="true" class="size-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
