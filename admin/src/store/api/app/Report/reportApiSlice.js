import { apiSlice } from '@/store/api/apiSlice';

export const reportApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getReports: builder.query({
			query: () => 'report',
			providesTags: ['Report'],
		}),

		getReportsByPagination: builder.query({
			query: ({ page = 1, limit = 10, order = 'desc', search = '' }) =>
				`report/pagination?page=${page}&limit=${limit}&order=${order}&search=${search}`,
			providesTags: ['Report'],
		}),

		getOrderReport: builder.query({
			query: ({duration}) => `report/order?duration=${duration}`,
			providesTags: ['Report'],
		}),
		getProfitReport: builder.query({
			query: ({duration = 'this-year', warehouseRef}) => `report/profit-loss?duration=${duration}&warehouseRef=${warehouseRef}`,
			providesTags: ['Report'],
		}),

	}),
});

export const {
	useGetReportsQuery,
	useGetReportsByPaginationQuery,
	useGetOrderReportQuery, //
	useGetProfitReportQuery, //

} = reportApi;
