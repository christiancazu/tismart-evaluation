export default $axios => resource => ({
  get: params => $axios.$get(`${resource}`, { params })
});
