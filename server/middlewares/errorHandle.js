module.exports = (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        msg: 'Unauthorized',
        status: 401
      };
    } else {
      throw err;
    }
  });
};
