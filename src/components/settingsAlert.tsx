import { Dispatch, SetStateAction } from 'react'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import { Button } from '@components/ui/button'

interface Props {
  isAlertOpen: boolean
  setIsAlertOpen: Dispatch<SetStateAction<boolean>>
}

function SettingsAlert({ isAlertOpen, setIsAlertOpen }: Props) {
  return (
    <AlertDialog.Root open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialog.Trigger asChild>
        <Button Children="Delete Account" intent="danger" />
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow blur-xl fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white  p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none text-black ">
          <AlertDialog.Title className="m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className=" mt-4 mb-5 text-[15px] leading-normal">
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className=" bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                className=" bg-[#B3202C] text-white focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              // onClick={async () => {
              //   await HandlePromise(deleteUser())
              //   nookies.destroy(undefined, 'token')
              //   router.push('/')
              // }}
              >
                Yes, delete account
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default SettingsAlert
