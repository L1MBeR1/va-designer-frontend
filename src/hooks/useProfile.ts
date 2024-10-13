import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

const useProfile = () => {
	return useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		staleTime: 600000,
		retry: 0
	})
}

export default useProfile
