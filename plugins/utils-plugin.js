import utils from '~/plugins/custom/utils';

export default (ctx, inject) => {
    inject('utils', utils(ctx.isDev));
};
