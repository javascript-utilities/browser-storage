## Classes

<dl>
<dt><a href="#Browser_Storage">Browser_Storage</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#stored_data--object">`stored_data`</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Browser\_Storage
**Kind**: global class  
**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  
**Author**: S0AndS0  
**Copyright**: AGPL-3.0  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| supports_local_storage | <code>boolean</code> | What `this.constructor.supportsLocalStorage()` had to say |
| supports_cookies | <code>boolean</code> | What `this.supportsCookies()` had to say |
| storage_available | <code>boolean</code> | If either of the above is `true` |


* [Browser_Storage](#Browser_Storage)
    * [`new Browser_Storage()`](#new-browser_storage)
    * _instance_
        * [`.constructorRefresh()`](#browser_storageconstructorrefresh--none) ⇒ <code>none</code>
        * [`.supportsCookies()`](#browser_storagesupportscookies--boolean) ⇒ <code>boolean</code>
        * [`._setCookieItem(key, value, [days_to_live])`](#browser_storage_setcookieitemkey-value-days_to_live--boolean) ⇒ <code>boolean</code>
        * [`._getCookieItem(key)`](#browser_storage_getcookieitemkey--) ⇒ <code>\*</code>
        * [`.getItem(key)`](#browser_storagegetitemkey--) ⇒ <code>\*</code>
        * [`.removeItem()`](#browser_storageremoveitem--boolean) ⇒ <code>boolean</code>
        * [`.setItem(key, value, [days_to_live])`](#browser_storagesetitemkey-value-days_to_live--boolean) ⇒ <code>boolean</code>
        * [`.keys()`](#browser_storagekeys--boolean) ⇒ <code>boolean</code>
        * [`.key(index)`](#browser_storagekeyindex--stringnumber) ⇒ <code>string</code> \| <code>number</code>
        * [`.clear()`](#browser_storageclear--boolean) ⇒ <code>boolean</code>
        * [`.iterator()`](#browser_storageiterator)
    * _static_
        * [`.supportsLocalStorage()`](#browser_storagesupportslocalstorage--boolean) ⇒ <code>boolean</code>

### `new Browser\_Storage()`
Sets properties used by other methods of this class

**Example** *(Quick Usage for Browser Storage)*  
```js
// Initialize new class instance
const storage = new Browser_Storage();
if (!storage.storage_available) {
  console.error('No browser storage available!');
} else {
  if (!storage.supports_local_storage) {
    console.warn('Falling back to cookies!');
  }
  // Do stuff with local storage of browser!
  storage.setItem('test__string', 'Spam!', 7);
  console.log("storage.getItem('test__string') -> " + storage.getItem('test__string'));
}
```
### `browser_Storage.constructorRefresh()` ⇒ <code>none</code>
Copy of `this.constructor` that should not throw `TypeError` when called

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  
### `browser_Storage.supportsCookies()` ⇒ <code>boolean</code>
Reports if cookies are enabled. Note, use `this.supports_cookies` instead within tests.

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  
### `browser_Storage.\_setCookieItem(key, value, [days_to_live])` ⇒ <code>boolean</code>
Use `this.setItem` instead. Attempts to set cookie

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | 
 | _variable name_ to store value under |
| value | <code>\*</code> | 
 | stored either under localStorage or as a cookie |
| [days_to_live] | <code>number</code> | <code>false</code>
 | how long a browser is suggested to keep cookies |

### `browser_Storage.\_getCookieItem(key)` ⇒ <code>\*</code>
Use `this.getItem` instead. Attempts to get cookie by _key_ via `match`

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | Name of key to look up value for. |

### `browser_Storage.getItem(key)` ⇒ <code>\*</code>
Gets decoded/JSON value for given key

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**Throws**:

- <code>ReferenceError</code> When no browser based storage is available

**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | Name of key to look up value for. |

### `browser_Storage.removeItem()` ⇒ <code>boolean</code>
Removes value by key from browser storage; cookies require page refresh

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**Throws**:

- <code>ReferenceError</code> When no browser based storage is available

**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  
### `browser_Storage.setItem(key, value, [days_to_live])` ⇒ <code>boolean</code>
Stores encoded JSON within browser

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**Throws**:

- <code>ReferenceError</code> When no browser based storage is available

**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> \| <code>number</code> | 
 | _variable name_ to store value under |
| value | <code>\*</code> | 
 | stored either under localStorage or as a cookie |
| [days_to_live] | <code>number</code> | <code>false</code>
 | how long a browser is suggested to keep cookies |

### `browser_Storage.keys()` ⇒ <code>boolean</code>
Lists keys that may point to values

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**Throws**:

- <code>ReferenceError</code> When no browser based storage is available

**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  
### `browser_Storage.key(index)` ⇒ <code>string</code> \| <code>number</code>
Gets key name by index address

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**Throws**:

- <code>ReferenceError</code> When no browser based storage is available

**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Key name to return by index |

### `browser_Storage.clear()` ⇒ <code>boolean</code>
Clears **all** stored values from either localStorage or cookies

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**Throws**:

- <code>ReferenceError</code> When no browser based storage is available

**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  
### `browser_Storage.iterator()`
Generates `{data.key: data.value}` JSON from localStorage or cookies

**Kind**: instance method of [<code>Browser\_Storage</code>](#Browser_Storage)  
**this**: [<code>Browser\_Storage</code>](#Browser_Storage)  
### `Browser_Storage.supportsLocalStorage()` ⇒ <code>boolean</code>
Tests and reports `boolean` if `localStorage` has `setItem` and `removeItem` methods

**Kind**: static method of [<code>Browser\_Storage</code>](#Browser_Storage)  
## `stored\_data` : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>number</code> \| <code>float</code> | `data.key` from `localStorage` or cookies |
| value | <code>\*</code> | `data.value` from `localStorage` or cookies |

