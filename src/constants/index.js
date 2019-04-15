export const VERSION = 'v0.8.1';
export const ADMIN_PREFIX = getPrefix();

function getPrefix() {
  // TODO:
  // * 1 line does not compile (export const ADMIN_PREFIX = ...)
  // * window is not defined during tests, see why and test with baseurl
  return typeof window != 'undefined'
    ? `${window.location.pathname.split('/admin')[0]}/admin`
    : '/admin';
}
