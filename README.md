## Browser Storage


[`BrowserStorage.js`][relative_link__browser_storage] is a client side JavaScript wrapper for `localStorage` and `document.cookie` interactions.


------


#### Table of Contents


- [Requirements](#requirements)
- [Installation](#installation)
- [Security](#security)
- [Privacy](#privacy)
- [Support](#support)
- [License](#license)


> See the [`gh-pages`][branch__gh-pages] branch for example usage and code, which builds the live [demo hosted][live_demo] on GitHub Pages.


------


## Requirements


GitHub Pages hosting [help article][help_github_pages__submodules] states that one may use submodules pointing to any **public** GitHub tracked repository, this repository **is** public thus including the code of this project within your own is relatively painless by following the [Installation](#installation) portion of this `readme` file.


For the time being, hosting elsewhere is outside the scope of this `readme` file, but [_`git hooks`_][git_book__hooks] may be a helpful topic to research if hosting on a Virtual Private Server or other web hosts that allow for _post-push automation_. And setting _`cookie-free`_ as discussed on [ServerFault]((https://serverfault.com/questions/78227/what-is-a-cookie-free-domain)) probably would be a _good idea_ too.


## Installation


HTTPS `clone` URL to `your-project`...


```bash
cd your-project

_url='https://github.com/javascript-utilities/browser-storage.git'
_dir='javascript-modules/browser-storage'
## Note, for GitHub Pages utilizing Jekyll builds using
##  the `assets` directory is generally recommended
# _dir='assets/javascript-modules/browser-storage'

git submodule add -b master "${_url}" "${_dir}"
```


> Note, GitHub Pages **requires** the use of `https` links to make use of repositories within a `.gitmodules` file.
>
> And older versions of `git` may require the following to populate `${_dir}`...


```bash
git submodule update --init --recursive
```


Check that something similar to the following results from `git status`...


```git
On branch gh-pages

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .gitmodules
	new file:   javascript-modules/browser-storage
```


... `commit` and `push` these changes then notify anyone contributing to your project that...


```bash
git submodule update --init --recursive
git submodule update --merge
```


... commands may be useful for updating.


> Tip, those that make a fresh `clone` of your project may use...


```bash
git clone --recurse-submodules <your-repositorys-url>
```


> ... to set-up all the various submodules that your project utilizes.


> Note, if at any point in the future `git submodule foreach git status` reports a detached `HEAD`, and that is somehow bothersome then try...


```bash
cd javascript-modules/browser-storage
git checkout master
git pull
```


> ... to re-attach the submodule's `HEAD` once again.


##  Security


Values returned by the `get(key)` method are filtered through `encodeURIComponent`, however, :warning: this should **not** be considered _trusted_ input or fully _sanitized_. Authors utilizing code from this project should still use caution when handling returned values.


By default other sub-domains do **not** have access to data handled by `BrowserStorage`, authors utilizing code from this project are encouraged keep it that way as there are good reasons for browsers behaving like that. Project under the same sub-domain _should_ have access to `BrowserStorage`, meaning that authors may include code from this repository in multiple projects under the same GitHub account or or organization name and access client settings with JavaScript; all in all allowing for theming and other configurations to remain seamlessly consistent.


## Privacy


When cookies are used, `key` `value` pares are set within browser storage with the `path=/` parameter to mitigate risks of other sites reading client stored data. Additionally most browsers will send cookies on **every** request by default, meaning that interception and/or logging could be taking place by server administrators.


When `localStorage` is available **no** data is sent back to the server by default. For static sites, such as those hosted by GitHub Pages, this means that no data about client preferences are stored anywhere other than on the respective browser.


By default the code of this project does **not** send any data anywhere otherwise, and generally project authors using code from this project do **not** have access to any data stored by the `BrowserStorage` class.


## Support


Open a new _`Issue`_ (or up-vote currently opened <sub>[![Issues][badge__issues]][relative_link__issues]</sub> if similar) to report bugs and/or make feature requests a higher priority for project maintainers. Submit _`Pull Requests`_ after _`Forking`_ this repository to add features or fix bugs, and be counted among this project's <sub>[![Members][badge__contributors]][relative_link__members]</sub>


> See GitHub's documentation on [Forking][help_fork] and issuing [Pull Requests][help_pull_request] if these are new terms.
>
> Please check the chapter regarding [submodules][git_book__submodules] from the Git book prior to opening issues regarding submodule _trouble-shooting_


Supporting projects like this one through <sub>[![Liberapay][badge__liberapay]][liberapay_donate]</sub> or via Bitcoin <sub>[![BTC][badge__bitcoin]][btc]</sub> is most welcomed, and encourages the continued development of projects like these.


## License


```
Browser Storage documentation on a submodule for Git tracked web sites
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

[branch__gh-pages]: https://github.com/javascript-utilities/browser-storage/tree/gh-pages

[live_demo]: https://javascript-utilities.github.io/browser-storage/index.html


[badge__issues]: https://img.shields.io/github/issues/javascript-utilities/browser-storage.svg
[badge__contributors]: https://img.shields.io/github/forks/javascript-utilities/browser-storage.svg?color=005571&label=Contributors

[badge__liberapay]: https://img.shields.io/badge/Liberapay-gray.svg?logo=liberapay
[badge__bitcoin]: https://img.shields.io/badge/1Dr9KYZz9jkUea5xTxeGyScu7AwC4MwR5c-gray.svg?logo=bitcoin


[liberapay_donate]: https://liberapay.com/javascript-utilities/donate
[btc]: https://www.blockchain.com/btc/address/1Dr9KYZz9jkUea5xTxeGyScu7AwC4MwR5c
