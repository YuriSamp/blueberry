import * as Popover from '@radix-ui/react-popover'
import { useAtomValue } from 'jotai'
import { RxCross1 } from 'react-icons/rx'

import { emotionsOptions } from 'src/context/emotionsOptions'
import { UpperCaseFirstLetter } from 'src/helpers/uppercaseFirstLetter'
import { BsInfoCircle } from 'react-icons/bs'
export function DiaryPopover() {
  const options = useAtomValue(emotionsOptions)

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="border border-[#2A292B] w-36 h-12 cursor-pointer rounded-md bg-white brutalism-box flex justify-between items-center px-8  ">
          <p>Colors</p>
          < BsInfoCircle />
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[260px] bg-white  ml-10 sm:ml-0 drop-shadow-xl  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                Colors of emotions
              </p>
              <button>
                <Popover.Close
                  className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center  outline-none cursor-pointer"
                  aria-label="Close"
                >
                  <RxCross1 />
                </Popover.Close>
              </button>
            </div>
            <ul>
              {options.map((option) => (
                <li
                  key={option.id}
                  className="flex justify-between items-center w-full py-1"
                >
                  <div className="flex gap-3 items-center">
                    <div
                      style={{ backgroundColor: option.color }}
                      className={`h-5 w-5 rounded-md`}
                    ></div>
                    <p className="">{UpperCaseFirstLetter(option.emotion)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
