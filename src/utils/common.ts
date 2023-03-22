import routes from '../../config/routes';
import type { IRout } from '@/layout/UseTabsLayout';

const retrunArr: IRout[] = [];
const matchRedirectRoutes = (routeArr: IRout[]) => {
  routeArr.map((item) => {
    if (item.routes) {
      matchRedirectRoutes(item.routes);
    } else {
      if (item.redirect) {
        retrunArr.push(item);
      }
    }
  });
  return retrunArr;
};

export const redirectRoutes: IRout[] = matchRedirectRoutes(routes);
