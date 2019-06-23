
// BrowserStorage is a JavaScript submodule for Git tracked web sites
// Copyright (C) 2019  S0AndS0
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation; version 3 of the License.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
      let key = 'test'
      let value = true;
      localStorage.setItem(key, value);
      localStorage.getItem(key);
      localStorage.removeItem(key);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Note, use `this.supports_cookies` instead within tests.
   * @returs {boolean}
   */
  supportsCookies() {
    if (navigator.cookieEnabled) return true;

    try {
      document.cookie = 'testcookie';
    } catch (e) {
      return false;
    } finally {
      if (document.cookie.indexOf('testcookie') != -1) {
        this.remove('testcookie');
        return true;
      }
      return false;
    }
  }

  /**
   * Copy of `constructor` method that should not through a type error
   */
  constructorRefresh() {
    this.supports_local_storage = this.supportsLocalStorage();
    this.supports_cookies = this.supportsCookies();
    this.storage_available = (this.supports_cookies || this.supports_local_storage) ? true : false;
  }

  /**
   * Gets specified value from browser storage and URI component encodes while returning
   * @returs {?boolean|?number|?string}
   * @this BrowserStorage
   */
  get(key) {
    let value = null;
    if (this.supports_local_storage) {
      value = localStorage.getItem(key);
    } else if (this.supports_cookies) {
      let cookie_data = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
      value = cookie_data ? cookie_data[2] : null;
    }
    return encodeURIComponent(value);
  }

  /**
   * Removes select value by key from browser storage; note for cookies, _full whipe_ will ocure on next page load
   * @returs {boolean}
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
    return false;
  }

  /**
   * Stores client settings within browser, _serverless_ in the truest sence
   * @peram {string|number}           key - _variable name_ to store value under
   * @peram {boolean|number|string} value - stored either under localStorage or as a cookie
   * @peram {number}         days_to_live - how long a browser is suggested to keep cookies
   * @returs {boolean}
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
   * @returs {boolean}
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
    return false;
  }

}
