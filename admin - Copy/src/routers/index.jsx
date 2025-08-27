import AuthLayout from '@/layout/AuthLayout';
import Layout from '@/layout/Layout';
import ChildCategory from '@/pages/E-Commerce/ChildCategory/childCategory';
import ChildCategoryAdd from '@/pages/E-Commerce/ChildCategory/childCategoryAdd';
import ChildCategoryEdit from '@/pages/E-Commerce/ChildCategory/childCategoryEdit';
import ChildCategoryView from '@/pages/E-Commerce/ChildCategory/childCategoryView';
import SubChildCategoryView from '@/pages/E-Commerce/SubChildCategory/subChildCategoryView';
import SubChildCategory from '@/pages/E-Commerce/SubChildCategory/subChildCategory';
import SubChildCategoryAdd from '@/pages/E-Commerce/SubChildCategory/subChildCategoryAdd';
import SubChildCategoryEdit from '@/pages/E-Commerce/SubChildCategory/subChildCategoryEdit';
import Inventory from '@/pages/Management/Inentory/inventory';
import InventoryAdd from '@/pages/Management/Inentory/inventoryAdd';
import InventoryEdit from '@/pages/Management/Inentory/inventoryEdit';
import InventoryView from '@/pages/Management/Inentory/inventoryView';
import Order from '@/pages/Management/order/order';
import OrderAdd from '@/pages/Management/order/orderAdd';
import OrderEdit from '@/pages/Management/order/orderEdit';
import OrderView from '@/pages/Management/order/orderView';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Brand from '@/pages/E-Commerce/Brand/brand';
import BrandAdd from '@/pages/E-Commerce/Brand/brandAdd';
import BrandView from '@/pages/E-Commerce/Brand/brandView';
import BrandEdit from '@/pages/E-Commerce/Brand/brandEdit';
import User from '@/pages/User_Management/User/user';
import UserAdd from '@/pages/User_Management/User/userAdd';
import UserView from '@/pages/User_Management/User/userView';
import UserEdit from '@/pages/User_Management/User/userEdit';
import Role from '@/pages/User_Management/Role/role';
import RoleAdd from '@/pages/User_Management/Role/roleAdd';
import RoleView from '@/pages/User_Management/Role/roleView';
import RoleEdit from '@/pages/User_Management/Role/roleEdit';
import Warehouse from '@/pages/Warehouse/Warehouse/warehouse';
import WarehouseAdd from '@/pages/Warehouse/Warehouse/warehouseAdd';
import WarehouseView from '@/pages/Warehouse/Warehouse/warehouseView';
import WarehouseEdit from '@/pages/Warehouse/Warehouse/warehouseEdit';
import Transfer from '@/pages/Warehouse/Transfer/transfer';
import TransferAdd from '@/pages/Warehouse/Transfer/transferAdd';
import TransferView from '@/pages/Warehouse/Transfer/transferView';
import ReceviedTransfer from '@/pages/Warehouse/ReceivedTransfer/receviedTransfer';
import SendTransfer from '@/pages/Warehouse/SendTransfer/sendTransfer';
import ProfitReport from '@/pages/reports/profitReport/profitReport';
const Login = lazy(() => import('@/pages/auth/login'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const SubCategory = lazy(() => import('@/pages/E-Commerce/SubCategory/subCategory'));
const SubCategoryAdd = lazy(() => import('@/pages/E-Commerce/SubCategory/subCategoryAdd'));
const SubCategoryView = lazy(() => import('@/pages/E-Commerce/SubCategory/subCategoryView'));
const SubCategoryEdit = lazy(() => import('@/pages/E-Commerce/SubCategory/subCategoryEdit'));
const WishList = lazy(() => import('@/pages/E-Commerce/WishList/wishList'));
const WishListView = lazy(() => import('@/pages/E-Commerce/WishList/wishListView'));
const Coupon = lazy(() => import('@/pages/E-Commerce/coupon/coupon'));
const CouponAdd = lazy(() => import('@/pages/E-Commerce/coupon/couponAdd'));
const CouponView = lazy(() => import('@/pages/E-Commerce/coupon/couponView'));
const CouponEdit = lazy(() => import('@/pages/E-Commerce/coupon/couponEdit'));
const Product = lazy(() => import('@/pages/E-Commerce/Product/product'));
const ProductAdd = lazy(() => import('@/pages/E-Commerce/Product/productAdd'));
const ProductView = lazy(() => import('@/pages/E-Commerce/Product/productEdit'));
const ProductEdit = lazy(() => import('@/pages/E-Commerce/Product/productEdit'));
const Category = lazy(() => import('@/pages/E-Commerce/Category/category'));
const CategoryAdd = lazy(() => import('@/pages/E-Commerce/Category/categoryAdd'));
const CategoryEdit = lazy(() => import('@/pages/E-Commerce/Category/categoryEdit'));
const CategoryView = lazy(() => import('@/pages/E-Commerce/Category/categoryView'));
const Banner = lazy(() => import('@/pages/E-Commerce/banner/banner'));
const BannerAdd = lazy(() => import('@/pages/E-Commerce/banner/bannerAdd'));
const BannerEdit = lazy(() => import('@/pages/E-Commerce/banner/bannerEdit'));
const BannerView = lazy(() => import('@/pages/E-Commerce/banner/bannerView'));




const router = createBrowserRouter([
	{
		path: '',
		// errorElement: <Error />,
		children: [
			{
				path: '',
				element: <AuthLayout />,
				children: [
					{
						path: 'login',
						element: <Login />,
					},
				],
			},
			{
				path: ':role',
				element: <Layout type="admin" />,
				children: [
					{
						path: '',
						element: <Dashboard />,
					},


					{
						path: 'banner',
						children: [
							{
								path: '',
								element: <Banner />,
							},
							{
								path: 'new',
								element: <BannerAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <BannerView />,
									},
									{
										path: 'edit',
										element: <BannerEdit />,
									},
								],
							},
						],
					},
					{
						path: 'category',
						children: [
							{
								path: '',
								element: <Category />,
							},
							{
								path: 'new',
								element: <CategoryAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <CategoryView />,
									},
									{
										path: 'edit',
										element: <CategoryEdit />,
									},
								],
							},
						],
					},
					{
						path: 'product',
						children: [
							{
								path: '',
								element: <Product />,
							},
							{
								path: 'new',
								element: <ProductAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <ProductView />,
									},
									{
										path: 'edit',
										element: <ProductEdit />,
									},
								],
							},
						],
					},
					{
						path: 'sub-category',
						children: [
							{
								path: '',
								element: <SubCategory />,
							},
							{
								path: 'new',
								element: <SubCategoryAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <SubCategoryView />,
									},
									{
										path: 'edit',
										element: <SubCategoryEdit />,
									},
								],
							},
						],
					},
					{
						path: 'child-category',
						children: [
							{
								path: '',
								element: <ChildCategory />,
							},
							{
								path: 'new',
								element: <ChildCategoryAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <ChildCategoryView />,
									},
									{
										path: 'edit',
										element: <ChildCategoryEdit />,
									},
								],
							},
						],
					},
					{
						path: 'sub-child-category',
						children: [
							{
								path: '',
								element: <SubChildCategory />,
							},
							{
								path: 'new',
								element: <SubChildCategoryAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <SubChildCategoryView />,
									},
									{
										path: 'edit',
										element: <SubChildCategoryEdit />,
									},
								],
							},
						],
					},
					{
						path: 'brand',
						children: [
							{
								path: '',
								element: <Brand />,
							},
							{
								path: 'new',
								element: <BrandAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <BrandView />,
									},
									{
										path: 'edit',
										element: <BrandEdit />,
									},
								],
							},
						],
					},
					{
						path: 'warehouse',
						children: [
							{
								path: '',
								element: <Warehouse />,
							},
							{
								path: 'new',
								element: <WarehouseAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <WarehouseView />,
									},
									{
										path: 'edit',
										element: <WarehouseEdit />,
									},
								],
							},
						],
					},
					{
						path: 'transfer',
						children: [
							{
								path: '',
								element: <Transfer />,
							},
							{
								path: 'new',
								element: <TransferAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <TransferView />,
									},
									// {
									// 	path: 'edit',
									// 	element: <WarehouseEdit />,
									// },
								],
							},
						],
					},
					{
						path: 'send-transfer',
						children: [
							{
								path: '',
								element: <SendTransfer />,
							},
							// {
							// 	path: 'new',
							// 	element: <TransferAdd />,
							// },
							// {
							// 	path: ':id',
							// 	children: [
							// 		{
							// 			path: '',
							// 			element: <ReceviedTransferView />,
							// 		},
							// 		// {
							// 		// 	path: 'edit',
							// 		// 	element: <WarehouseEdit />,
							// 		// },
							// 	],
							// },
						],
					},
					{
						path: 'received-transfer',
						children: [
							{
								path: '',
								element: <ReceviedTransfer />,
							},
							// {
							// 	path: 'new',
							// 	element: <TransferAdd />,
							// },
							// {
							// 	path: ':id',
							// 	children: [
							// 		{
							// 			path: '',
							// 			element: <ReceviedTransferView />,
							// 		},
							// 		// {
							// 		// 	path: 'edit',
							// 		// 	element: <WarehouseEdit />,
							// 		// },
							// 	],
							// },
						],
					},
					{
						path: 'user',
						children: [
							{
								path: '',
								element: <User />,
							},
							{
								path: 'new',
								element: <UserAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <UserView />,
									},
									{
										path: 'edit',
										element: <UserEdit />,
									},
								],
							},
						],
					},
					{
						path: 'role',
						children: [
							{
								path: '',
								element: <Role />,
							},
							{
								path: 'new',
								element: <RoleAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <RoleView />,
									},
									{
										path: 'edit',
										element: <RoleEdit />,
									},
								],
							},
						],
					},
					{
						path: 'wish-list',
						children: [
							{
								path: '',
								element: <WishList />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <WishListView />,
									},
								],
							},
						],
					},
					{
						path: 'coupon',
						children: [
							{
								path: '',
								element: <Coupon />,
							},
							{
								path: 'new',
								element: <CouponAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <CouponView />,
									},
									{
										path: 'edit',
										element: <CouponEdit />,
									},
								],
							},
						],
					},
					{
						path: 'inventory',
						children: [
							{
								path: '',
								element: <Inventory />,
							},
							{
								path: 'new',
								element: <InventoryAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <InventoryView />,
									},
									{
										path: 'edit',
										element: <InventoryEdit />,
									},
								],
							},
						],
					},
					{
						path: 'order',
						children: [
							{
								path: '',
								element: <Order />,
							},
							{
								path: 'new',
								element: <OrderAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <OrderView />,
									},
									{
										path: 'edit',
										element: <OrderEdit />,
									},
								],
							},
						],
					},
					{
						path: 'profit-report',
						children: [
							{
								path: '',
								element: <ProfitReport />,
							},
							{
								path: 'new',
								element: <OrderAdd />,
							},
							{
								path: ':id',
								children: [
									{
										path: '',
										element: <OrderView />,
									},
									{
										path: 'edit',
										element: <OrderEdit />,
									},
								],
							},
						],
					},


				],
			},

		],
	},
]);

export default router;
