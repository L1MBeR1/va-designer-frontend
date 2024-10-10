'use client'

import {
	Listbox,
	ListboxItem,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@nextui-org/react'
import { ReactNode, useState } from 'react'

import LogoutModal from '@/components/modals/logoutModal'

interface AccountPopoverProps {
	children: ReactNode
}

export default function AccountPopover({ children }: AccountPopoverProps) {
	const [openAccountPopover, setOpenAccountPopover] = useState(false)
	const [openLogoutModal, setOpenLogoutModal] = useState(false)

	const handleLogoutClick = () => {
		setOpenAccountPopover(false)
		setOpenLogoutModal(true)
	}

	return (
		<>
			<LogoutModal
				isOpen={openLogoutModal}
				onOpenChange={setOpenLogoutModal}
			/>
			<Popover
				backdrop={'transparent'}
				placement='right'
				showArrow={false}
				isOpen={openAccountPopover}
				onOpenChange={setOpenAccountPopover}
			>
				<PopoverTrigger>{children}</PopoverTrigger>
				<PopoverContent className='p-1'>
					<Listbox aria-label='Actions'>
						<ListboxItem
							key='exit'
							className='text-danger'
							onClick={handleLogoutClick}
						>
							Выйти из аккаунта
						</ListboxItem>
					</Listbox>
				</PopoverContent>
			</Popover>
		</>
	)
}
