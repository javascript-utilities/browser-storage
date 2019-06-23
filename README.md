## Browser Storage


[`BrowserStorage.js`][relative_link__browser_storage] is a client side JavaScript wrapper for `localStorage` and `document.cookie` interactions.


------


#### Table of Contents


- [Usage Example](#usage-example)
- [License](#license)


> See the [`master`][branch__master] branch for Installation, Requirements, and Support topics.
>
> Check the [live demo][live_demo] hosted by GitHub Pages of code contained within this branch that utilities code from the `master` branch.


------


## Usage Example


Source the JavaScript from this project within the `<head>` tags...


```html
<script src="BrowserStorage.js" type="text/javascript"></script>
```


Initialize an instance of `BrowserStorage` and test that some form of client side storage is available...


```html
<script type="text/javascript">
  const storage = new BrowserStorage();

  if (storage.storage_available != true) {
    throw new Error('We may never have any memory of this...');
  }
</script>
```


The following methods are available to the `storage` instance;


- `storage_available`, property returning `boolean` of if storage was available during initialization.

- `supportsLocalStorage()`, use `storage.supports_local_storage` property instead within tests, unless it is expected that permissions will change before the next page load on the same domain.

- `supportsCookies()`, much like `supportsLocalStorage` use `storage.supports_cookies` instead within tests to avoid re-checking.

- `constructorRefresh()`, a copy of `constructor()` that may be called after initialization to refresh class properties.

- `get(key)`, returns `null` or value (may be `boolean`, `integer`, `float`, or `string`) associated with passed `key`

- `remove(key)`, returns `boolean` after removing values associated with passed `key`

- `set(key, value, days_to_live)`, associates `key` with `value` for a number of `days_to_live`

- `clear()`, removes all locally stored _`value`s_ from browser storage.


> Note, if/when this class falls-back to using cookies both `remove(key)` and `clear()` methods require a page refresh to also remove stored `key` names.
>
> And when this class is using `localStorage` then _`set`'s_ `days_to_live` is currently _meaningless_.


## License


```
Browser Storage example usage documentation on a submodule for Git tracked web sites
Copyright (C) 2019  S0AndS0

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation; version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```



[help_fork]: https://help.github.com/en/articles/fork-a-repo
[help_pull_request]: https://help.github.com/en/articles/about-pull-requests
[help_github_pages__submodules]: https://help.github.com/en/articles/using-submodules-with-pages

[git_book__submodules]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
[git_book__hooks]: https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks


[relative_link__issues]: issues
[relative_link__members]: network/members
[relative_link__browser_storage]: BrowserStorage.js

[branch__master]: https://github.com/javascript-utilities/browser-storage/

[live_demo]: https://javascript-utilities.github.io/browser-storage/index.html


[badge__issues]: https://img.shields.io/github/issues/javascript-utilities/browser-storage.svg
[badge__contributors]: https://img.shields.io/github/forks/javascript-utilities/browser-storage.svg?color=005571&label=Contributors

[badge__liberapay]: https://img.shields.io/badge/Liberapay-gray.svg?logo=liberapay
[badge__bitcoin]: https://img.shields.io/badge/1Dr9KYZz9jkUea5xTxeGyScu7AwC4MwR5c-gray.svg?logo=bitcoin


[liberapay_donate]: https://liberapay.com/javascript-utilities/donate
[btc]: https://www.blockchain.com/btc/address/1Dr9KYZz9jkUea5xTxeGyScu7AwC4MwR5c
