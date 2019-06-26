/**
 * Thanks be to:
 *  https://www.w3schools.com/js/js_cookies.asp
 *  https://gist.github.com/steveosoule/5679949
 *  https://jsdoc.app/about-getting-started.html
 *  https://stackoverflow.com/questions/5639346/what-is-the-shortest-function-for-reading-a-cookie-by-name-in-javascript
 */


class BrowserStorage {
  /**
   * @this BrowserStorage
   * @copyright S0AndS0 2019 GNU AGPL version 3
   */
  constructor() {
    this.supports_local_storage = this.supportsLocalStorage();
    this.supports_cookies = this.supportsCookies();
    this.storage_available = (this.supports_cookies || this.supports_local_storage) ? true : false;
  }

  /**
   * Note, use `this.supports_local_storage` instead within tests.
   * @returns {boolean}
   */
  supportsLocalStorage() {
    try {
      localStorage.setItem('test_key', true);
    } catch (e) {
      return false;
    } finally {
      localStorage.removeItem('test_key');
    }
    return true;
  }

  /**
   * Note, use `this.supports_cookies` instead within tests.
   * @returns {boolean}
   * @this BrowserStorage
   */
  supportsCookies() {
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
   * Copy of `constructor` method that should not through a type error
   * @returns {none}
   * @this BrowserStorage
   */
  constructorRefresh() {
    this.supports_local_storage = this.supportsLocalStorage();
    this.supports_cookies = this.supportsCookies();
    this.storage_available = (this.supports_cookies || this.supports_local_storage) ? true : false;
  }

  /**
   * Gets specified value from browser storage and URI component encodes while returning
   * @returns {?boolean|?number|?string}
   * @param {string|number} key - Name of key to look up value for.
   * @throws Error when no local storage options where detected
   * @this BrowserStorage
   */
  get(key) {
    if (this.supports_local_storage) {
      return encodeURIComponent(localStorage.getItem(key));
    } else if (this.supports_cookies) {
      let value = null;
      let cookie_data = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      value = cookie_data ? cookie_data[2] : null;
      return encodeURIComponent(value);
    }
    throw new Error('No local browser storage options available!');
  }

  /**
   * Removes select value by key from browser storage; note for cookies, _full wipe_ will occur on next page load
   * @returns {boolean}
   * @throws Error when no local storage options where detected
   * @this BrowserStorage
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
    throw new Error('No local browser storage options available!');
  }

  /**
   * Stores client settings within browser, _serverless_ in the truest scene
   * @param {string|number}           key - _variable name_ to store value under
   * @param {boolean|number|string} value - stored either under localStorage or as a cookie
   * @param {number}         days_to_live - how long a browser is suggested to keep cookies
   * @returns {boolean}
   * @this BrowserStorage
   */
  set(key, value, days_to_live = false) {
    if (this.supports_local_storage) {
      localStorage.setItem(key, value);
      return true;
    } else if (this.supports_cookies) {
      let expires = '';
      if (days_to_live) {
        let date = new Date();
        if (days_to_live == 0) {
          date.setTime(date.getTime());
        } else {
          date.setTime(date.getTime() + (days_to_live * 24 * 60 * 60 * 1000));
        }
        expires = '; expires=' + date.toGMTString();
      }

      document.cookie = name + '=' + value + expires + '; path=/';
      return true;
    }
    return false;
  }

  /**
   * Clears **all** client settings from either localStorage or cookies
   * @returns {boolean}
   * @throws Error when no local storage options where detected
   * @this BrowserStorage
   */
  clear() {
    if (this.supports_local_storage) {
      localStorage.clear();
      return true;
    } else if (this.supports_cookies) {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let key = encodeURIComponent(cookie.split('=')[0].replace(/(^\s+|\s+$)/g, ''));
        if (typeof(key) == 'string' || typeof(key) == 'number') {
          this.remove(key);
        } else {
          return false;
        }
      }
      return true;
    }
    throw new Error('No local browser storage options available!');
  }

}
