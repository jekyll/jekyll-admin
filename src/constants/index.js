export const VERSION = 'v0.8.1';
export const ADMIN_PREFIX = getPrefix();

function getPrefix() {
  // TODO:
  // * 1 line does not compile (export const ADMIN_PREFIX = ...)
  // * window is not defined during tests, see why and test with baseurl
  // MD lexoyo: window is not defined at build time, as this file is included in webpack config
  return typeof window != 'undefined'
    ? `${window.location.pathname.split('/admin')[0]}/admin`
    : '.';
}
