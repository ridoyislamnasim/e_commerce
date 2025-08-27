const navMenu = (userRole, permissions) => [
	{
		isHeadr: true,
		title: 'menu',
	},
	// 1_admin, 2_operation, 3_accounts, 4_general_user
	// For Admin
	...([

		// ...[permissions?.banner?.access == false || 
		// {
		// 	title: 'Dashboard 77',
		// 	icon: 'heroicons-outline:home',
		// 	link: '/dmin',
		// } ],
		...([{
			title: 'Dashboard ',
			icon: 'heroicons-outline:home',
			link: '/dashboard',
		},]),
		// ...(permissions?.aboutUs?.access === true
		// 	? [{
		// 		title: 'About Us',
		// 		icon: 'heroicons-outline:home',
		// 		link: '/admin/Banner',
		// 	},]
		// 	: []),

		...(permissions?.banner?.access === true || permissions?.category?.access === true
			|| permissions?.subCategory?.access === true || permissions?.wishlist?.access === true
			|| permissions?.coupon?.access === true
			? [
				{
					title: 'E-Commerce',
					icon: 'mdi:world',
					child: [
						...(permissions?.banner?.access === true
							? [
								{
									childtitle: 'Banner',
									childlink: `/${userRole}/banner`,
								},
							]
							: []),

						...(permissions?.category?.access === true
							? [
								{
									childtitle: 'Category',
									childlink: `/${userRole}/category`,
								},
							]
							: []),
						...(permissions?.subCategory?.access === true
							? [
								{
									childtitle: 'Sub Category',
									childlink: `/${userRole}/sub-category`,
								},
							]
							: []),
						...(permissions?.chilsCategory?.access === true
							? [
								{
									childtitle: 'Child Category',
									childlink: `/${userRole}/child-category`,
								},
							]
							: []),
						...(permissions?.subChilsCategory?.access === true
							? [
								{
									childtitle: 'Sub Child Category',
									childlink: `/${userRole}/sub-child-category`,
								},
							]
							: []),
						...(permissions?.brand?.access === true
							? [
								{
									childtitle: 'Brand',
									childlink: `/${userRole}/brand`,
								},
							]
							: []),

						// ...(permissions?.subCategory?.access === true
						// 	? [
						{
							childtitle: 'Product',
							childlink: `/${userRole}/product`,
						},
						// ]
						// : []),
						...(permissions?.wishlist?.access === true
							? [
								{
									childtitle: 'Wishlist',
									childlink: `/${userRole}/wish-list`,
								},
							]
							: []),
						...(permissions?.coupon?.access === true
							? [
								{
									childtitle: 'Coupon',
									childlink: `/${userRole}/coupon`,
								},
							]
							: []),
					],
				},
			]
			: []),
		...(permissions?.inventory?.access === true || permissions?.order?.access === true
			|| permissions?.shippingMethod?.access === true || permissions?.paymentService?.access === true
			|| permissions?.paymentService?.access === true
			? [
				{
					title: 'Management',
					icon: 'mdi:world',
					child: [
						...(permissions?.inventory?.access === true
							? [
								{
									childtitle: 'Inventory',
									childlink: `/${userRole}/inventory`,
								},
							]
							: []),

						...(permissions?.order?.access === true
							? [
								{
									childtitle: 'Order',
									childlink: `/${userRole}/order`,
								},
							]
							: []),
						...(permissions?.shippingMethod?.access === true
							? [
								{
									childtitle: 'Shipping Method',
									childlink: `/${userRole}/designation`,
								},
							]
							: []),
						...(permissions?.paymentService?.access === true
							? [
								{
									childtitle: 'Payment Service',
									childlink: `/${userRole}/designation`,
								},
							]
							: []),
					],
				},
			]
			: []),
			...(permissions?.inventory?.access === true || permissions?.order?.access === true
				|| permissions?.shippingMethod?.access === true || permissions?.paymentService?.access === true
				|| permissions?.paymentService?.access === true
				? [
					{
						title: 'Warehouse',
						icon: 'mdi:world',
						child: [
							...(permissions?.inventory?.access === true
								? [
									{
										childtitle: 'Warehouse',
										childlink: `/${userRole}/warehouse`,
									},
								]
								: []),
	
							...(permissions?.inventory?.access === true
								? [
									{
										childtitle: 'Transfer Warehouse',
										childlink: `/${userRole}/transfer`,
									},
								]
								: []),
							...(permissions?.inventory?.access === true
								? [
									{
										childtitle: 'Transfer List',
										childlink: `/${userRole}/send-transfer`,
									},
								]
								: []),
							...(permissions?.inventory?.access === true
								? [
									{
										childtitle: 'Received Transfer',
										childlink: `/${userRole}/received-transfer`,
									},
								]
								: []),
						],
					},
				]
				: []),
				...(permissions?.banner?.access === true || permissions?.category?.access === true
					|| permissions?.subCategory?.access === true || permissions?.wishlist?.access === true
					|| permissions?.coupon?.access === true
					? [
						{
							title: 'Report',
							icon: 'mdi:world',
							child: [
								...(permissions?.banner?.access === true
									? [
										{
											childtitle: 'Profit Report',
											childlink: `/${userRole}/profit-report`,
										},
									]
									: []),
								...(userRole?.toLowerCase() === 'admin'
									? [
										{
											childtitle: 'User Role',
											childlink: `/${userRole}/role`,
										},
									]
									: []),
		
							],
						},
					]
					: []),
		...(permissions?.inventory?.access === true
			? [
				{
					title: 'Support ',
					icon: 'mdi:world',
					child: [
						...(permissions?.inventory?.access === true
							? [
								{
									childtitle: 'Contact Info',
									childlink: '/admin/slider',
								},
							]
							: []),
					],
				},
			]
			: []),
		...(permissions?.banner?.access === true || permissions?.category?.access === true
			|| permissions?.subCategory?.access === true || permissions?.wishlist?.access === true
			|| permissions?.coupon?.access === true
			? [
				{
					title: 'User Management',
					icon: 'mdi:world',
					child: [
						...(permissions?.banner?.access === true
							? [
								{
									childtitle: 'All User',
									childlink: `/${userRole}/user`,
								},
							]
							: []),
						...(userRole?.toLowerCase() === 'admin'
							? [
								{
									childtitle: 'User Role',
									childlink: `/${userRole}/role`,
								},
							]
							: []),

					],
				},
			]
			: []),


	]),


];

export default navMenu;
