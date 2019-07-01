# Browser Storage
[heading__title]:
  #browser-storage
  "&#x2B06; Top of this page"


[`Browser_Storage.js`][browser_storage__master__source_code], a client side JavaScript wrapper for `localStorage` and `document.cookie` interactions.


[![Open Issues][badge__issues__browser_storage]][issues__browser_storage] [![Open Pull Requests][badge__pull_requests__browser_storage]][pull_requests__browser_storage] [![DeepScan Grade][badge__deepscan__browser_storage]][deepscan__browser_storage] [![Built Test Status][badge__travis_ci__browser_storage]][travis_ci__browser_storage] [![Browser_Storage Demo][badge__demo__browser_storage]][demo__browser_storage] [![Byte size of Browser_Storage.js][badge__master__browser_storage__source_code]][browser_storage__master__source_code] [![Latest commits][badge__commits__browser_storage__master]][commits__browser_storage__master]


------


#### Table of Contents


- [&#x2B06; Top of ReadMe File][heading__title]

- [&#9889; Quick Start][heading__quick_start]

  - [:memo: Edit Your ReadMe File][heading__edit_your_readme_file]
  - [&#x1F578; Edit Your HTML][heading__edit_your_html]
  - [:floppy_disk: Commit and Push][heading__commit_and_push]

- [&#x1F5D2; Notes][notes]

- [:copyright: License][heading__license]


------


## Quick Start
[heading__quick_start]:
  #quick-start
  "&#9889; ...well as quick as it may get with things like this"


**Bash Variables**


```Bash
_module_https_url='https://github.com/javascript-utilities/browser-storage.git'
_module_relative_path='assets/javascript-modules/browser-storage'
```


**Git Commands**


```Bash
cd "<your-git-project-path>"

git checkout gh-pages
git submodule add -b master "${_module_https_url}" "${_module_relative_path}"

git submodule update
cd "${_module_relative_path}"
git checkout master
git pull
```


> **Version Locking**; recommended for those that audit every dependency...


```Bash
git checkout tags/<tag_name> -b <branch_name>
```


> ... replace _`<tag_name>`_ with the tag to checkout and _`<branch_name>`_ with a custom name, eg...


```Bash
git checkout tags/v0.0.1 -b loc-v0.0.1
```


### Edit Your ReadMe File
[heading__edit_your_readme_file]:
  #edit-your-readme-file
  "&#X1F4DD; Suggested additions so everyone has a good time with submodules"


**Quick Start Section**


```MarkDown
Clone with the following to avoid incomplete downloads



    git clone --recurse-submodules <url-for-your-project>
```


**Updates/Upgrades Section**


```MarkDown
Update/upgrade submodules via


    git submodule update --init --recursive
    git submodule update --merge
```


### Edit Your HTML
[heading__edit_your_html]:
  #edit-your-html
  "&#x1F578; Source and utilize Browser_Storage features"


```HTML
<head>

  <script src="assets/javascript-modules/browser-storage/browser-storage.js"
          type="text/javascript"></script>


  <script type="text/javascript">
    const storage = new Browser_Storage();

    if (!storage.storage_available) {
      throw new Error('No storage available!');
    }

    storage.set('test__string', 'Spam!', 3);
    if (storage.get('test__string') !== 'Spam!') {
      throw new Error('Storage cannot be relied upon!')
    }

    console.log(':tada: Browser Storage seems to be available!');
  </script>

</head>
```


**Test that things work!**


Open a web browser pointing at the server hosting the above changes and try interacting with the `Browser_Storage()` instance...


```JavaScript
storage.set('something', true, 3);
console.log("storage.get('something') -> " + storage.get('something'));

storage.set('another-thing', {first: true}, 3);
const another_thing = storage.get('another-thing');
console.log('another_thing -> ' + another_thing);
```


### Commit and Push
[heading__commit_and_push]:
  #commit-and-push
  "&#x1F4BE; And congratulate yourself on not having to write something similar!"



```Bash
git add .gitmodules
git add assets/javascript-modules/browser-storage
git add README.md


git commit -F- <<'EOF'
:heavy_plus_sign: Adds javascript-utilities/browser-storage dependency


**Edits**


- `README.md` file, documentation updates for submodules


**Additions**

- `.gitmodules` file, tracks other Git repository code utilized by this project

- `assets/javascript-modules/browser-storage` submodule, Git tracked dependency
EOF


git push origin gh-pages
```


**:tada: Excellent! :tada:**


___


## Notes
[notes]:
  #notes
  "&#x1F5D2; Additional notes and links that may be worth clicking in the future"


The `get()` method returns **`undefined`** for undefined values, avoid setting keys to _`"undefined"`_ to avoid confusion.


To begin developing please clone to a separate directory, then checkout the `gh-pages` branch which tracks the `master` branch as a submodule. Prior to issuing a Pull Request please check the [Community][browser_storage__community] for any relevant updates.


Opening **new** Issues is supper! However, to avoid attention fragmentation be certain to search for related Issues that could be added to instead.


___


## License
[heading__license]:
  #license
  "&#x00A9; Legal bits of Open Source software"


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


[badge__commits__browser_storage__master]:
  https://img.shields.io/github/last-commit/javascript-utilities/browser-storage/master.svg

[commits__browser_storage__master]:
  https://github.com/javascript-utilities/browser-storage/commits/master
  "&#x1F4DD; History of changes on this branch"



[browser_storage__community]:
  https://github.com/javascript-utilities/browser-storage/community



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
