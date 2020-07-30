export const actions = {
  async create ({ commit }, data) {
    const result = await this.$careerAPI.create(data);
    return result;
  }
};
