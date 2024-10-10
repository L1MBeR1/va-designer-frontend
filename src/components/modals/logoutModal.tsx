'use client'

import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { APP_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

interface ILogoutModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const LogoutModal = ({ isOpen, onOpenChange }: ILogoutModalProps) => {
	const [loading, setLoading] = useState(false)
	const queryClient = useQueryClient()
	const [logoutError, setLogoutError] = useState<string | null>(null)
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onMutate() {
			setLoading(true)
			setLogoutError(null)
		},
		onSuccess() {
			toast.success('Успешный выход из аккаунта!')
			push(APP_PAGES.HOME)
			queryClient.removeQueries({ queryKey: ['profile'] })
		},
		onError() {
			setLogoutError('Ошибка при выходе. Попробуйте снова.')
		},
		onSettled() {
			setLoading(false)
		}
	})

	const handleLogout = () => {
		mutate()
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader>Выход из аккаунта</ModalHeader>
						<ModalBody>Вы действительно хотите выйти?</ModalBody>
						<ModalFooter>
							<Button
								color='primary'
								variant='light'
								size='lg'
								onPress={onClose}
							>
								Назад
							</Button>
							<Button
								color='danger'
								variant='solid'
								onClick={() => {
									handleLogout()
								}}
								size='lg'
							>
								Выйти
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default LogoutModal
