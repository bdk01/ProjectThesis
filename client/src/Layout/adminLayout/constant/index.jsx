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
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsFilePostFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'Statitics',
		label: 'Statitics',
		path: '/admin/statitics',
		icon: <FaChartLine />
	},
	{
		key: 'Manage-user',
		label: 'Manage-user',
		path: '/manage-user',
		icon: <MdOutlineManageAccounts  />
	},
	{
		key: 'Manage-posts',
		label: 'Manage-posts',
		path: '/manage-posts',
		icon: <BsFilePostFill />
	},
	{
		key: 'Manage-subject',
		label: 'Manage-subject',
		path: '/review-subject',
		icon: <SiCoursera />
	},
	
	
	{
		key: 'Conversation',
		label: 'Conversation',
		path: '/admin/conversation',
		icon: <HiOutlineAnnotation />
	},

	
	
	
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [

]
