
// import { deleteCookies } from './deleteCookies';
import { authKey } from '@/contents/authKey';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const logout = (router: AppRouterInstance) => {
   localStorage.removeItem(authKey);
//    deleteCookies([authKey, 'refreshToken']);
   router.push('/');
   window.location.reload();
};
