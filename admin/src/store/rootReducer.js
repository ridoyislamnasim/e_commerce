import Chat from '@/pages/app/chat/store';
import auth from './api/auth/authSlice';
import layout from './layout';


const rootReducer = {
	layout,
	auth,
	Chat
};
export default rootReducer;
