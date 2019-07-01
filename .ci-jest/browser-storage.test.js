/**
 * Thanks be to
 *   https://jestjs.io/docs/en/expect#tothrowerror
 *   https://stackoverflow.com/questions/33811062
 *   https://stackoverflow.com/questions/6460604
 */



/**
 * @typedef forced_states
 * @type {Object|boolean}
 * @property {boolean} supports_local_storage - cached from `this.supportsLocalStorage()`
 * @property {boolean} supports_cookies       - cached from `this.supportsCookies()`
 * @property {boolean} storage_available      - cached on if either localStorage or cookies are supported
 */


/**
 * @author S0AndS0
 * @copyright AGPL-3.0
 * @example <caption>Jest Tests for Browser Storage</caption>
 * // Initialize new class instance and run tests
 * const test_storage = new Browser_Storage_Test();
 * test_storage.runTests();
 */
class Browser_Storage_Test {
  /**
   * Sets properties used by other methods of this class
   * @returns {none}
   * @property {object} storage - Class instance of `Browser_Storage` to test
   * @this Browser_Storage_Test
   * @class
   */
  constructor() {
    this.storage = new (require('../assets/javascript-modules/browser-storage/browser-storage.js'))();
  }

  runTests() {
    this.setAndGet();
    this.setAndGet({supports_local_storage: false});
    this.errorThrowers();
    this.resetsAndWipes();
  }

  /**
   * Sets properties for `this.storage` from key value pares
   * @returns {none}
   * @param {forced_states} states -
   * @this Browser_Storage_Test
   */
  forceStorageState(states) {
    Object.keys(states).forEach((key) => {
      test('Forcing ' + this.storage.constructor.name + '[' + key + '] to be ' + states[key], () => {
        this.storage[key] = states[key];
        expect(this.storage[key]).toBe(states[key]);
      });
    });
  }

  /**
   * Attempts to break `set()` and `get()` methods for `Browser_Storage` instance
   * @returns {none}
   * @param {forced_states} states - If object, passes to `this.forceStorageState`
   * @this Browser_Storage_Test
   */
  setAndGet(states = false) {
    if (typeof(states) === 'object') {
      this.forceStorageState(states);
    }

    test('Boolean with `set()` and `get()` methods', () => {
      expect(this.storage.set('test__boolean', true, 3)).toBe(true);
      expect(this.storage.get('test__boolean')).toBe(true);
    });

    test('String with `set()` and `get()` methods', () => {
      expect(this.storage.set('test__string', 'Spam!', 3)).toBe(true);
      expect(this.storage.get('test__string')).toBe('Spam!');
    });

    test('List with  `set()` and `get()` methods', () => {
      expect(this.storage.set('test__list', [1, "two", 4.2], 3)).toBe(true);
      expect(this.storage.get('test__list')).toEqual([1, "two", 4.2]);
    });

    test('JSON with `set()` and `get()` methods', () => {
      const test_json = {
        first_key: true,
        second_key: "Spam!",
        third_key: null,
        fourth_key: undefined,
        fifth_key: [
          'Well may be just\n\ta little\nbit',
          "more testing, shouldn't _hurt_",
          {
            but: [
              'just', 2, 'be on the',
              '"safer side"'
            ],
          },
        ],
      };

      expect(this.storage.set('test__json', test_json, 3)).toBe(true);

      const stored_json = this.storage.get('test__json');
      Object.keys(test_json).forEach((key) => {
        expect(test_json[key]).toStrictEqual(stored_json[key]);
      });
    });

    test('CharCode value with `set()` and `get()` methods', () => {
      // `9749` is decimal for _`hot beverage`_
      const test_char = String.fromCharCode('9749');
      expect(this.storage.set('test__charcode', test_char, 3)).toBe(true);
      expect(this.storage.get('test__charcode')).toBe(test_char);
    });

    test('CharCode key with `set()` and `get()` methods', () => {
      // `9842` is decimal for _`universal recycling`_
      const test_char = String.fromCharCode('9842');
      expect(this.storage.set(test_char, 'universal recycling', 3)).toBe(true);
      expect(this.storage.get(test_char)).toBe('universal recycling');
    });

  }

  /**
   * Reports failures if things do not throw errors when they should
   * @returns {none}
   * @this Browser_Storage_Test
   */
  errorThrowers() {
    this.forceStorageState({supports_local_storage: false, supports_cookies: false});

    test('Boolean `set()` without storage support', () => {
      expect(() => {
        this.storage.set('test__boolean', true, 3);
      }).toThrow(ReferenceError);
    });

    test('Getting previously set `test__boolean` without storage support', () => {
      expect(() => {
        this.storage.get('test__boolean');
      }).toThrow(ReferenceError);
    });
  }

  /**
   * Reports failures if any values _linger_ when wiping
   * @returns {none}
   * @this Browser_Storage_Test
   */
  resetsAndWipes() {
    test('Re-freshing class properties', () => {
      this.storage.constructorRefresh();
      expect(this.storage.supports_local_storage).toBe(true);
    });

    test('That values can be removed by key', () => {
      this.storage.keys().forEach((key) => {
        expect(this.storage.remove(key)).toBe(true);
        expect(this.storage.get(key)).toBe(undefined);
      });
    });

    this.forceStorageState({supports_local_storage: false});
    test('Clearing cookies', () => {
      expect(this.storage.clear()).toBe(true);
    });

    test('Than non-set key is undefined', () => {
      expect(this.storage.get('null')).toBe(undefined);
    });
  }

}


const test_storage = new Browser_Storage_Test();

test_storage.runTests();
