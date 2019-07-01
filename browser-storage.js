/**
 * Thanks be to:
 *   https://www.w3schools.com/js/js_cookies.asp
 *   https://gist.github.com/steveosoule/5679949
 *   https://jsdoc.app/about-getting-started.html
 *   https://jestjs.io/docs/en/getting-started
 *   https://stackoverflow.com/questions/5639346
 */


/**
 * @author S0AndS0
 * @copyright AGPL-3.0
 * @example <caption>Quick Usage for Browser Storage</caption>
 * // Initialize new class instance
 * const storage = new Browser_Storage();
 * if (!storage.storage_available) {
 *   console.error('No browser storage available!');
 * } else {
 *   if (!storage.supports_local_storage) {
 *     console.warn('Falling back to cookies!');
 *   }
 *   // Do stuff with local storage of browser!
 *   storage.set('test__string', 'Spam!', 7);
 *   console.log("storage.get('test__string') -> " + storage.get('test__string'));
 * }
 */
class Browser_Storage {
  /**
   * Sets properties used by other methods of this class
   * @returns {none}
   * @property {boolean} supports_local_storage - What `this.constructor.supportsLocalStorage()` had to say
   * @property {boolean} supports_cookies       - What `this.constructor.supportsCookies()` had to say
   * @property {boolean} storage_available      - If either of the above is `true`
   * @this Browser_Storage
   * @class
   */
  constructor() {
    this.supports_local_storage = this.constructor.supportsLocalStorage();
    this.supports_cookies = this.constructor.supportsCookies();
    this.storage_available = (this.supports_cookies || this.supports_local_storage) ? true : false;
  }

  /**
   * Copy of `this.constructor` that should not throw `TypeError` when called
   * @returns {none}
   * @this Browser_Storage
   */
  constructorRefresh() {
    this.supports_local_storage = this.constructor.supportsLocalStorage();
    this.supports_cookies = this.constructor.supportsCookies();
    this.storage_available = (this.supports_cookies || this.supports_local_storage) ? true : false;
  }

  /**
   * Tests and reports `boolean` if `localStorage` has `setItem` and `removeItem` methods
   * @returns {boolean}
   */
  static supportsLocalStorage() {
    // Because Opera and may be other browsers `setItem`
    // is available but with space set to _`0`_
    try {
      localStorage.setItem('test_key', true);
    } catch (e) {
      if (!(e instanceof ReferenceError)) throw e;
      return false;
    } finally {
      localStorage.removeItem('test_key');
    }
    return true;
  }

  /**
   * Reports if `navigator.cookieEnabled` or `document.cookie` are available
   * Note, use `this.supports_cookies` instead within tests.
   * @returns {boolean}
   * @this Browser_Storage
   */
  static supportsCookies() {
    if (navigator.cookieEnabled) return true;

    try {
      document.cookie = 'testcookie';
    } catch (e) {
      return false;
    }

    if (document.cookie.indexOf('testcookie') != -1) {
      this.remove('testcookie');
      return true;
    }
    return false;
  }

  /**
   * Gets decoded/JSON value for given key
   * @returns {*}
   * @throws {ReferenceError} When no browser based storage is available
   * @param {string|number} key - Name of key to look up value for.
   * @this Browser_Storage
   */
  get(key) {
    const encoded_key = encodeURIComponent(key);
    let decoded_value = undefined;
    if (this.supports_local_storage) {
      const raw_value = localStorage.getItem(encoded_key);
      if (raw_value === null) return undefined;
      return JSON.parse(decodeURIComponent(raw_value));
    } else if (this.supports_cookies) {
      const cookie_data = document.cookie.match('(^|;) ?' + encoded_key + '=([^;]*)(;|$)');
      if (cookie_data === null) return undefined;
      return JSON.parse(decodeURIComponent(cookie_data[2]));
    }

    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

  /**
   * Removes value by key from browser storage; cookies require page refresh
   * @returns {boolean}
   * @throws {ReferenceError} When no browser based storage is available
   * @this Browser_Storage
   */
  remove(key) {
    if (this.supports_local_storage) {
      localStorage.removeItem(key)
      return true;
    } else if (this.supports_cookies) {
      // Note, unsetting and expiring in the past is how
      // to remove one cookie upon the next page load.
      this.set(key, '', -7);
      return true;
    }
    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

  /**
   * Stores encoded JSON within browser
   * @returns {boolean}
   * @throws {ReferenceError} When no browser based storage is available
   * @param {string|number}           key - _variable name_ to store value under
   * @param {*}                     value - stored either under localStorage or as a cookie
   * @param {number} [days_to_live=false] - how long a browser is suggested to keep cookies
   * @this Browser_Storage
   */
  set(key, value, days_to_live = false) {
    const encoded_key = encodeURIComponent(key);
    const encoded_value = encodeURIComponent(JSON.stringify(value));

    if (this.supports_local_storage) {
      localStorage.setItem(encoded_key, encoded_value);
      return true;
    } else if (this.supports_cookies) {
      let expires = '';
      if (days_to_live) {
        const date = new Date();
        if (days_to_live == 0) {
          date.setTime(date.getTime());
        } else {
          date.setTime(date.getTime() + (days_to_live * 24 * 60 * 60 * 1000));
        }
        expires = '; expires=' + date.toGMTString();
      }

      document.cookie = encoded_key + '=' + encoded_value + expires + '; path=/';
      return true;
    }

    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

  /**
   * Lists keys that may point to values
   * @returns {boolean}
   * @throws {ReferenceError} When no browser based storage is available
   * @this Browser_Storage
   */
  keys() {
    if (this.supports_local_storage) {
      return Object.keys(localStorage);
    } else if (this.supports_cookies) {
      let cookie_keys = [];
      document.cookie.split(';').forEach((pare) => {
        cookie_keys.push(pare.split('=')[0]);
      });
      return cookie_keys;
    }

    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

  /**
   * Clears **all** stored values from either localStorage or cookies
   * @returns {boolean}
   * @throws {ReferenceError} When no browser based storage is available
   * @this Browser_Storage
   */
  clear() {
    if (this.supports_local_storage) {
      localStorage.clear();
      return true;
    } else if (this.supports_cookies) {
      document.cookie.split(';').forEach((cookie) => {
        const key = encodeURIComponent(cookie.split('=')[0].replace(/(^\s+|\s+$)/g, ''));
        if (key) this.remove(key);
      });
      return true;
    }

    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

}


/**
 * Exports are for Jest who uses Node for Travis-CI tests on gh-pages branch
 * https://javascript-utilities.github.io/browser-storage/
 */
if (typeof(module) !== 'undefined') module.exports = Browser_Storage;
