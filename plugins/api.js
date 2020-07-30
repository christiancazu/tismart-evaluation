import APIService from '@/api/api.service';

import * as endpoints from '@/config/endpoints';

export default (ctx, inject) => {
  for (const endpoint in endpoints) {
    const service = APIService(ctx.$axios);
    inject(endpoint, service(endpoints[endpoint]));
  }
};
