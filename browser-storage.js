//@ts-check
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
 *   storage.setItem('test__string', 'Spam!', 7);
 *   console.log("storage.getItem('test__string') -> " + storage.getItem('test__string'));
 * }
 */
class Browser_Storage {
  /**
   * Sets properties used by other methods of this class
   * @property {boolean} supports_local_storage - What `this.constructor.supportsLocalStorage()` had to say
   * @property {boolean} supports_cookies       - What `this.supportsCookies()` had to say
   * @property {boolean} storage_available      - If either of the above is `true`
   * @this Browser_Storage
   * @class
   */
  constructor() {
    this.supports_local_storage = Browser_Storage.supportsLocalStorage();
    this.supports_cookies = Browser_Storage.supportsCookies();
    this.storage_available = (this.supports_cookies || this.supports_local_storage) ? true : false;
  }

  /**
   * Copy of `this.constructor` that should not throw `TypeError` when called
   * @this Browser_Storage
   */
  constructorRefresh() {
    this.supports_local_storage = Browser_Storage.supportsLocalStorage();
    this.supports_cookies = Browser_Storage.supportsCookies();
    this.storage_available = (this.supports_cookies || this.supports_local_storage) ? true : false;
  }

  /**
   * Coerces values into JavaScript object types
   * @function coerce
   * @param {any} value
   * @returns {any}
   * @throws {!SyntaxError}
   * @example
   * coerce('1');
   * //> 1
   *
   * coerce('stringy');
   * //> "stringy"
   *
   * coerce('{"key": "value"}');
   * //> {key: "value"}
   */
  static coerce(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      /* istanbul ignore next */
      if (!(e instanceof SyntaxError)) {
        throw e;
      }

      // @ts-ignore
      if (['undefined', undefined].includes(value)) {
        return undefined;
      }
      // @ts-ignore
      else if (['NaN', NaN].includes(value)) {
        return NaN;
      }
      return value;
    }
  }

  /**
   * Translates `document.cookie` key value strings into dictionary
   * @param {boolean?} [coerce_values=false] - When `true` will coerce value types
   * @returns {Object<string, string>|Object<string, any>}
   */
  static getObjectifiedCookies(coerce_values = false) {
    return document.cookie.split(';').reduce((accumulator, data) => {
      const key_value = data.split('=');
      const key = key_value[0].trim();

      let value = decodeURIComponent(key_value[1].trim());
      if (coerce_values === true) {
        value = Browser_Storage.coerce(value);
      }
      accumulator[key] = value;

      return accumulator;
    }, {});
  };

  /**
   * Translates `localStora` key value strings into dictionary
   * @param {boolean?} [coerce_values=false] - When `true` will coerce value types
   * @returns {Object<string, string>|Object<string, any>}
   // * @this Browser_Storage
   */
  static getObjectifiedLocalStorage(coerce_values = false) {
    // @ts-ignore
    return Object.entries(localStorage).reduce((accumulator, [encoded_key, encoded_value]) => {
      if (coerce_values === true) {
        encoded_value = Browser_Storage.coerce(encoded_value);
      }
      accumulator[decodeURIComponent(encoded_key)] = encoded_value;
      return accumulator;
    }, {});
  }

  /**
   * Tests and reports `boolean` if `localStorage` has `setItem` and `removeItem` methods
   * @returns {boolean}
   */
  static supportsLocalStorage() {
    // Because Opera and may be other browsers `setItem`
    // is available but with space set to _`0`_
    try {
      localStorage.setItem('test_key', 'true');
    } catch (e) {
      /* istanbul ignore next */
      if (!(e instanceof ReferenceError)) throw e;
      /* istanbul ignore next */
      return false;
    } finally {
      localStorage.removeItem('test_key');
    }
    return true;
  }

  /**
   * Reports if cookies are enabled. Note, use `this.supports_cookies` instead within tests.
   * @returns {boolean}
   * @this Browser_Storage
   */
  static supportsCookies() {
    // Browser support detection must be interactive as some
    // may be _full_ or not enabled without updating state!
    if (Browser_Storage._setCookieItem('testcookie', '', 7)) {
      return Browser_Storage._setCookieItem('testcookie', '', -7);
    }
    /* istanbul ignore next */
    return false;
  }

  /**
   * Use `this.setItem` instead. Attempts to set cookie
   * @returns {boolean}
   * @param {Object|string|number}  key - _variable name_ to store value under
   * @param {JSON|Object}           value - stored either under localStorage or as a cookie
   * @param {Object|number|boolean} [days_to_live=false] - how long a browser is suggested to keep cookies
   */
  static _setCookieItem(key, value, days_to_live = false) {
    const encoded_key = encodeURIComponent(key);
    const encoded_value = encodeURIComponent(JSON.stringify(value));

    let expires = '';
    if (isNaN(days_to_live) == false) {
      const date = new Date();
      const now = date.getTime();
      if (days_to_live == 0) {
        date.setTime(now);
      } else {
        date.setTime(now + (days_to_live * 24 * 60 * 60 * 1000));
      }
      expires = `; expires=${date.toUTCString()}`;
    }

    try {
      document.cookie = `${encoded_key}=${encoded_value}${expires}; path=/`;
    } catch (e) {
      /* istanbul ignore next */
      if (!(e instanceof ReferenceError)) throw e;
      /* istanbul ignore next */
      return false;
    }
    return true;
  }

  /**
   * Use `this.getItem` instead. Attempts to get cookie by _key_ via `match`
   * @returns {JSON|Object}
   * @param {Object|string|number} key - Name of key to look up value for.
   */
  static _getCookieItem(key) {
    const encoded_key = encodeURIComponent(key);
    const cookie_data = document.cookie.match(`(^|;) ?${encoded_key}=([^;]*)(;|$)`);
    if (cookie_data === null || cookie_data[2] === 'undefined') return undefined;
    return JSON.parse(decodeURIComponent(cookie_data[2]));
    // return Browser_Storage.coerce(decodeURIComponent(cookie_data[2]));
  }

  /**
   * Gets decoded/JSON value for given key
   * @returns {JSON|Object}
   * @throws {ReferenceError} When no browser based storage is available
   * @param {Object|string|number} key - Name of key to look up value for.
   * @this Browser_Storage
   */
  getItem(key) {
    if (this.supports_local_storage) {
      const encoded_key = encodeURIComponent(key);
      const raw_value = localStorage.getItem(encoded_key);
      if (raw_value === null || raw_value === 'undefined') return undefined;
      return JSON.parse(decodeURIComponent(raw_value));
      // return Browser_Storage.coerce(decodeURIComponent(raw_value));
    } else if (this.supports_cookies) {
      return Browser_Storage._getCookieItem(key);
    }

    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

  /**
   * Removes value by key from browser storage; cookies require page refresh
   * @returns {boolean}
   * @this Browser_Storage
   */
  removeItem(key) {
    if (this.supports_local_storage) {
      localStorage.removeItem(key);
      return true;
    } else if (this.supports_cookies) {
      // Note, unsetting and expiring in the past is how
      // to remove one cookie upon the next page load.
      return this.setItem(key, '', -7);
    }
    return false;
  }

  /**
   * Stores encoded JSON within browser
   * @returns {boolean}
   * @param {Object|string|number} key - _variable name_ to store value under
   * @param {any}                  value - stored either under localStorage or as a cookie
   * @param {number|boolean} [days_to_live=false] - how long a browser is suggested to keep cookies
   * @this Browser_Storage
   */
  setItem(key, value, days_to_live = false) {
    if (this.supports_local_storage) {
      localStorage.setItem(
        encodeURIComponent(key),
        encodeURIComponent(JSON.stringify(value))
      );
      return true;
    } else if (this.supports_cookies) {
      return Browser_Storage._setCookieItem(key, value, days_to_live);
    }
    return false;
  }

  /**
   * Lists keys that may point to values
   * @returns {Array}
   * @throws {ReferenceError} When no browser based storage is available
   * @this Browser_Storage
   */
  keys() {
    if (this.supports_local_storage) {
      return Object.keys(localStorage);
    } else if (this.supports_cookies) {
      let cookie_keys = [];
      document.cookie.split(';').forEach((pare) => {
        cookie_keys.push(pare.split('=')[0].trim());
      });
      return cookie_keys;
    }

    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

  /**
   * Gets key name by index address
   * @returns {string|number}
   * @throws {ReferenceError} When no browser based storage is available
   * @param {number} index - Key name to return by index
   * @this Browser_Storage
   */
  key(index) {
    if (this.supports_local_storage) {
      return localStorage.key(index);
    } else if (this.supports_cookies) {
      // @ts-ignore
      const encoded_value = document.cookie.split(';')[index].split('=')[0].trimStart();
      if (encoded_value == undefined) return undefined;
      return decodeURIComponent(encoded_value);
    }

    throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
  }

  /**
   * Clears **all** stored values from either localStorage or cookies
   * @returns {boolean}
   * @this Browser_Storage
   */
  clear() {
    if (this.supports_local_storage) {
      localStorage.clear();
      return true;
    } else if (this.supports_cookies) {
      document.cookie.split(';').forEach((cookie) => {
        const decoded_key = decodeURIComponent(cookie.split('=')[0].trim());
        this.removeItem(decoded_key);
      });
      return true;
    }
    return false;
  }

  /**
   * Generates `{data.key: data.value}` JSON from localStorage or cookies
   * @yields {stored_data}
   * @this Browser_Storage
   */
  *iterator() {
    if (this.supports_local_storage) {
      const keys = Object.keys(localStorage);
      for (let i = 0; i < keys.length; i++) {
        const encoded_key = keys[i];
        const decoded_key = decodeURIComponent(encoded_key);
        const raw_value = localStorage.getItem(encoded_key);
        // Note, `JSON.pars()` has a _finicky appetite_
        if (raw_value === null || raw_value === undefined || raw_value === 'undefined') {
          yield { key: decoded_key, value: undefined };
        } else {
          yield { key: decoded_key, value: JSON.parse(decodeURIComponent(raw_value)) };
        }
      }
    } else if (this.supports_cookies) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const decoded_key = decodeURIComponent(cookies[i].split('=')[0].trim());
        yield { key: decoded_key, value: Browser_Storage._getCookieItem(decoded_key) };
      }
    }
    else {
      throw new ReferenceError('Browser storage unavailable as of last constructorRefresh()');
    }
  }

  /**
   * See `this.iterator()` method
   * @returns {stored_data}
   * @this Browser_Storage
   */
  // @ts-ignore
  [Symbol.iterator]() {
    // @ts-ignore
    return this.iterator();
  }

}


/**
 * Exports are for Jest who uses Node for Travis-CI tests on gh-pages branch
 * https://javascript-utilities.github.io/browser-storage/
 */
if (typeof module !== 'undefined') module.exports = Browser_Storage;


/**
 * @typedef stored_data
 * @type {Object}
 * @property {string|number} key   - `data.key` from `localStorage` or cookies
 * @property {*}             value - `data.value` from `localStorage` or cookies
 */
