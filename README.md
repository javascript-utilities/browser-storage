# Browser Storage Development
[heading__title]:
  #browser-storage-development
  "&#x2B06; Top of this page"

[`Browser_Storage.js`][browser_storage__master__source_code], a client side JavaScript wrapper for `localStorage` and `document.cookie` interactions.


> See the [`master` branch][browser_storage__master] for _Quick Start_ on installing and utilizing _`Browser_Storage.js`_. This branch contains development, testing, and source files of the [live demo][demo__browser_storage] for this project.
>
> The following are quick tips on setting up to develop, test, and improve this project. Please review _`Contributing`_ within [Community][browser_storage__community] prior to issuing first Pull Request.


## [![Byte size of Browser_Storage.js][badge__master__browser_storage__source_code]][browser_storage__master__source_code] [![Open Issues][badge__issues__browser_storage]][issues__browser_storage] [![Open Pull Requests][badge__pull_requests__browser_storage]][pull_requests__browser_storage] [![DeepScan Grade][badge__deepscan__browser_storage]][deepscan__browser_storage] [![Built Test Status][badge__travis_ci__browser_storage]][travis_ci__browser_storage] [![Latest commits][badge__commits__browser_storage__gh_pages]][commits__browser_storage__gh_pages] [![Browser_Storage Demo][badge__demo__browser_storage]][demo__browser_storage]


------


#### Table of Contents


- [&#x2B06; Top of ReadMe File][heading__title]

- [:bridge_at_night: Development Tips][heading__development_tips]

  - [:trident: Forking][heading__forking]
  - [:herb: First Clone][heading__first_clone]
  - [:100: Local Testing][heading__local_testing]
  - [:arrows_counterclockwise: Merge Updates][heading__merge_updates]
  - [:arrows_clockwise: Merge Improvements][heading__merge_improvements]

- [&#x1F5D2; Notes][heading__notes]

- [:copyright: License][heading__license]


------


## Development Tips
[heading__development_tips]:
  #development-tips
  "&#x1F309; Quick reference for those ready to improve this project"


### Forking
[heading__forking]:
  #forking
  "&#x1F531;"


[Fork][fork__browser_storage] this project to an Account or Organization with Push permissions. Doing so allows for _extended version locking_ as well as tracking any changes ready for consideration via Pull Requests.


### First Clone
[heading__first_clone]:
  #first-clone
  "&#x1F33F; Steps to ensure git knows about forked URLs in development branch and any tracked submodules"


The setup is a _bit_ more extensive because of how this project utilities submodules, however. following the next steps ensure _`Git`_ knows about forked URLs in development branch and any tracked submodules too.


**Shared Variables**


```Bash
_account_name="YourAccountsName"
_origin_url_git="git@github.com:javascript-utilities/browser-storage.git"
_fork_url_git="git@github.com:${_account_name}/browser-storage.git"
_fork_url_https="https://github.com/${_account_name}/browser-storage.git"
```


**`gh-pages` branch initial setup**


1. Clone your fork via _`_fork_url_git`_ value, then setup alternate _`remote`_ pointing to the value of _`_origin_url_git`_ for future updates

2. Enter the root directory for this repository, `fetch` and `checout` the `gh-pages` branch

3. Point submodule URL to _`_fork_url_https`_ value, then _`sync`_ and _`update`_ changes


```Bash
git clone --origin forked "${_fork_url_git}"
git remote add origin "${_origin_url_git}"


cd browser-storage
git fetch forked gh-pages:gh-pages
git checkout gh-pages


git config --file=.gitmodules submodule.browser-storage.url "${_fork_url_https}"
git submodule sync
git submodule update --init --recursive --remote
```


**_`ls -1a assets/javascript-modules/browser-storage`_** example output


```Bash
#> .
#> ..
#> browser-storage.js
#> .git
#> .github
#> LICENSE
```


**`master` branch as submodule initial setup**


1. Enter root directory of submodule, and reattach the _`HEAD`_ by explicitly checking out the _`master`_ branch

2. Setup submodule `remote` with _`_fork_url_https`_ value and fetch your fork one more time

3. Configure _`forked`_ _`remote`_ to be the default for _`git`_ interactions


```Bash
cd assets/javascript-modules/browser-storage
git checkout master


git remote add forked "${_fork_url_https}"
git fetch forked


git branch --set-upstream-to=forked/master
```


**_`git status`_** example output


```Bash
#> On branch gh-pages
#> Your branch is up-to-date with 'forked/gh-pages'.
#> nothing to commit, working directory clean
```


**_`git submodule foreach git status`_** example output


```Bash
#> Entering 'assets/javascript-modules/browser-storage'
#> On branch master
#> Your branch is up-to-date with 'forked/master'.
#> nothing to commit, working directory clean
```


### Local Testing
[heading__local_testing]:
  #local-testing
  "&#x1F4AF; After initial setup, run `npm test` prior to public commits"


**Install development dependencies** for running tests via _`Jest`_ JavaScript testing framework


```Bash
npm install --save-dev
```


**Run test** scripts under _`.ci-jest`_ subdirectory


```Bash
npm test
```


### Merge Updates
[heading__merge_updates]:
  #merge-updates
  "&#x1F504; Update your fork with edits from this repository"


1. Pull submodule updates from _`origin`_ remote

2. Pull development updates from _`origin`_ remote


```Bash
git submodule foreach git pull origin master

git pull origin gh-pages
```


> Hint, `vimdiff` is an excellent command-line tool for resolving most merge conflicts.


```Bash
git submodule foreach git push forked master

git push forked gh-pages
```


### Merge Improvements
[heading__merge_improvements]:
  #merge-improvements
  "&#x1F503; Notify maintainers of this repository that your edits are ready for consideration"


```Bash
git submodule foreach git push forked master

git push forked gh-pages
```


**:tada: Pull Requests :tada:** should be opened via Web UI on GitHub to notify maintainers of this repository that your fork is ready for consideration.


___


## Notes
[heading__notes]:
  #notes
  "&#x1F5D2; Additional resources and things to keep in mind when developing"


Once the _`gh-pages`_ branch has been checked out, please direct edits to the _`master`_ branch via the submodule path. And to avoid build errors be sure to commit and push updates for the _`master`_ branch **prior** to any commits required to update the _`gh-pages`_ branch references.


If developing on a local branch please merge back to the relevant _mainline_ branch before publicly pushing. And prior to any public pushes run **_`npm test`_** at the very least to catch errors that have been coded for.


Periodically check the [Community][browser_storage__community] page for this repository; specifically relevant updates can be found under _`Code of Conduct`_ guidelines and _`Pull Request`_ templates sections.


___


## License
[heading__license]:
  #license
  "&#x00A9; Legal bits of Open Source software"


```
Browser Storage submodule development documentation for Git tracked web sites
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



[browser_storage__master]:
  https://github.com/javascript-utilities/browser-storage/
  ""


[fork__browser_storage]:
  https://github.com/javascript-utilities/browser-storage/fork
  ""


[badge__deepscan__browser_storage]:
  https://deepscan.io/api/teams/4392/projects/6156/branches/49668/badge/grade.svg

[deepscan__browser_storage]:
  https://deepscan.io/dashboard#view=project&tid=4392&pid=6156&bid=49668
  "&#x1F916; All hail our robot overloads!"


[badge__travis_ci__browser_storage]:
  https://img.shields.io/travis/javascript-utilities/browser-storage/gh-pages.svg

[travis_ci__browser_storage]:
  https://travis-ci.com/javascript-utilities/browser-storage
  "&#x1F6E0; Automated tests with Jest and build logs"



[organization__master__readme__submodules]:
  https://github.com/javascript-utilities/.github/blob/master/README.md#submodules
  "&#9851; The hows, whys, and what fores submodules from Git are used"


[badge__commits__browser_storage__gh_pages]:
  https://img.shields.io/github/last-commit/javascript-utilities/browser-storage/gh-pages.svg

[commits__browser_storage__gh_pages]:
  https://github.com/javascript-utilities/browser-storage/commits/gh-pages
  "&#x1F4DD; History of changes on this branch"


[browser_storage__community]:
  https://github.com/javascript-utilities/browser-storage/community
  "&#x1F331; Dedicated to functioning code"



[badge__demo__browser_storage]:
  https://img.shields.io/website/https/javascript-utilities.github.io/browser-storage/index.html.svg?down_color=darkorange&down_message=Offline&label=Demo&logo=Demo%20Site&up_color=success&up_message=Online

[demo__browser_storage]:
  https://javascript-utilities.github.io/browser-storage/index.html
  "&#x1F52C; Open a console to interact with `storage` instance; no clone required for tests!"


[badge__issues__browser_storage]:
  https://img.shields.io/github/issues/javascript-utilities/browser-storage.svg

[issues__browser_storage]:
  https://github.com/javascript-utilities/browser-storage/issues
  "&#x2622; Search for and _bump_ existing issues or open new issues for project maintainer to address."


[badge__pull_requests__browser_storage]:
  https://img.shields.io/github/issues-pr/javascript-utilities/browser-storage.svg

[pull_requests__browser_storage]:
  https://github.com/javascript-utilities/browser-storage/pulls
  "&#x1F3D7; Pull Request friendly, though please check the Community guidelines"



[badge__master__browser_storage__source_code]:
  https://img.shields.io/github/size/javascript-utilities/browser-storage/browser-storage.js.svg?label=Browser_Storage.js

[browser_storage__master__source_code]:
  https://github.com/javascript-utilities/browser-storage/blob/master/browser-storage.js
  "&#x2328; Project source, one JavaScript file with ~108 lines of actionable code!"
