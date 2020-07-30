export default $axios => resource => ({
  get: () => $axios.$get(`${resource}`),

  create: data => $axios.$post(`${resource}`, data)
});
