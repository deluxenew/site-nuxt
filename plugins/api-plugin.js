import api from '~/plugins/custom/api';

export default (ctx, inject) => {
  inject('api', api(ctx.app.$axios));
};
