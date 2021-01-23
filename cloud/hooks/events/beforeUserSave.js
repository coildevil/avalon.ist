const Environment = require('../../constructors/environment');

module.exports = async (request) => {
  const environment = await Environment.getGlobal();
  const user = request.object;
  const { context } = request;

  const onLockdown = environment.get('onLockdown') || false;

  user.validateLoginData({ onLockdown });

  if (context) {
    const { presence } = context;

    if (presence) {
      const instanceCount = user.get('instanceCount');
      user.set('instanceCount', parseInt(Math.max(0, instanceCount)));

      Environment.checkOnlinePlayers({ user });
    }
  }

  return true;
};
