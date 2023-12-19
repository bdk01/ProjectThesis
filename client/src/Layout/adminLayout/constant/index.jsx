import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { SiCoursera } from 'react-icons/si'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'Manage-user',
		label: 'Manage-user',
		path: '/manage-user',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'Review-subject',
		label: 'Review-subject',
		path: '/review-subject',
		icon: <SiCoursera />
	},
	
	
	{
		key: 'Conversation',
		label: 'Conversation',
		path: '/admin/conversation',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [

]
