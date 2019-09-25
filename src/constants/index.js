export const VERSION = 'v0.8.1';
export const ADMIN_PREFIX = getPrefix();

function getPrefix() {
  return `${window.location.pathname.split('/admin')[0]}/admin`;
}
