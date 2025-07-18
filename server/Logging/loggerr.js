import axios from 'axios';

export const logEvent = async (stack, level, pkg, message) => {
  try {
    const validStacks = ['backend', 'frontend'];
    const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
    const validPackages = [
      'cache', 'controller', 'cron_job', 'db', 'domain',
      'handler', 'repository', 'route', 'service',
      'auth', 'config', 'middleware', 'utils'
    ];

    if (
      !validStacks.includes(stack) ||
      !validLevels.includes(level) ||
      !validPackages.includes(pkg)
    ) return;

    await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: pkg,
      message
    });
  } catch (err) {
    console.error('[LOGGER FAILED]', err.message);
  }
};
