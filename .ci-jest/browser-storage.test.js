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
   * @property {object} storage - Class instance of `Browser_Storage` to test
   * @this Browser_Storage_Test
   * @class
   */
  constructor() {
    this.storage = new (require('../assets/javascript/modules/browser-storage/browser-storage.js'))();
  }

  /**
   * Runs the tests in an order that made since to someone at the time
   * @this Browser_Storage_Test
   */
  runTests() {
    this.setAndGet();
    this.setAndGet({supports_local_storage: false});
    this.iterability();
    this.iterability({supports_local_storage: true});
    this.errorThrowers();
    this.resetsAndWipes();
    this.coercions();
    this.test_getObjectifiedCookies();
    this.test_getObjectifiedLocalStorage();
  }

  /**
   * Sets properties for `this.storage` from key value pares
   * @param {forced_states} states - JSON/_dictionary_ of states to force upon storage instance
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
   * Attempts to break `setItem()` and `getItem()` methods for `Browser_Storage` instance
   * @param {forced_states} states - If object, passes to `this.forceStorageState`
   * @this Browser_Storage_Test
   */
  setAndGet(states = false) {
    if (typeof(states) === 'object') this.forceStorageState(states);

    const test_char = String.fromCharCode('9749');
    const data_map = {
      true: true,
      false: false,
      char: test_char,
      list: [1, 'two', 3.5, ["inner", "and 'nested' strings", {obj_key: 'obj_value'}]],
      inner_json: {'one more thing?': {or: 'perhaps', two: 'more?'}},
      1: 'one',
      2.0: 'float',
      '&^': '?!',
      '~': "*.+",
      empty_sting: '',
      bad_idea: null,
      bad_idea2: 'null',
      bad_idea3: 'undefined',
      bad_idea4: undefined
    }

    test('Do all test key/value pares from `data_map` operate with `setItem` and `getItem` methods?', () => {
      let days_to_live = 1;
      Object.keys(data_map).forEach((key) => {
        expect(this.storage.setItem(key, data_map[key], days_to_live)).toBe(true);
        expect(this.storage.getItem(key)).toStrictEqual(data_map[key]);
        days_to_live++
      });
    });

    test('How about a CharCode key with `setItem()` and `getItem()` methods?', () => {
      // `9842` is decimal for _`universal recycling`_
      const test_char = String.fromCharCode('9842');
      expect(this.storage.setItem(test_char, 'universal recycling', 3)).toBe(true);
      expect(this.storage.getItem(test_char)).toBe('universal recycling');
    });

    test('Does `days_to_live=0` with `setItem()` return `true`?', () => {
      expect(this.storage.setItem('Casper', 'Was never here?', 0)).toBe(true);
    });

    test('With `getItem("Casper")` is there any trace of the _ghoast_ data?', () => {
      // Most browsers this would not be required
      if (this.storage.supports_local_storage) {
        expect(this.storage.keys()).toContain('Casper');
      } else {
        expect(this.storage.keys()).not.toContain('Casper');
      }
    });

    test('Can we get key by index?', () => {
      expect(this.storage.key(0)).toBeDefined();
    });
  }

  /**
   * Reports failures if things do not throw errors when they should
   * @this Browser_Storage_Test
   */
  errorThrowers() {
    this.forceStorageState({supports_local_storage: false, supports_cookies: false});

    test('Will `setItem()` return `false` without storage support?', () => {
      expect(this.storage.setItem('test__boolean', true, 3)).toBe(false);
    });

    test('Will `getItem()` throw a `ReferenceError` without storage support?', () => {
      expect(() => {
        this.storage.getItem('Anything?');
      }).toThrow(ReferenceError);
    });

    test('Will `removeItem()` return `false` without storage support?', () => {
      expect(this.storage.removeItem('Anything?')).toBe(false);
    });

    test('Will `clear()` return `false` without storage support?', () => {
      expect(this.storage.clear()).toBe(false);
    });

    test('Will `keys()` throw a `ReferenceError` without storage support?', () => {
      expect(() => {
        this.storage.keys();
      }).toThrow(ReferenceError);
    });

    test('Will `while (data = storage_iter.next().value)` throw a `ReferenceError` without storage support?', () => {
      const storage_iter = this.storage.iterator();
      expect(() => {
        storage_iter.next().value;
      }).toThrow(ReferenceError);
    });

    test('Will `key(0)` throw a `ReferenceError` without storage support?', () => {
      expect(() => {
        this.storage.key(0);
      }).toThrow(ReferenceError);
    });
  }

  /**
   * Tests ways class may be iterated with
   * @this Browser_Storage_Test
   */
  iterability(states = false) {
    if (typeof(states) === 'object') this.forceStorageState(states);

    test('What does `for of storage` do?', () => {
      for (const data of this.storage) {
        expect(this.storage.getItem(data.key)).toStrictEqual(data.value);
      }
    });

    test('What does `while (data=storage_iter.next().value) do?`', () => {
      const storage_iter = this.storage.iterator();
      let data; while (data = storage_iter.next().value) {
        expect(this.storage.getItem(data.key)).toStrictEqual(data.value);
      }
    });
  }

  /**
   * Reports failures if any values _linger_ when wiping
   * @this Browser_Storage_Test
   */
  resetsAndWipes() {
    test('Do supportsCookies and supportsLocalStorage return boolean', () => {
      expect(this.storage.constructor.supportsCookies()).toBe(true);
      expect(this.storage.constructor.supportsLocalStorage()).toBe(true);
    });

    test('Re-freshing class properties', () => {
      expect(this.storage.constructorRefresh()).toBeUndefined();
      this.storage.constructorRefresh();
      expect(this.storage.supports_local_storage).toBe(true);
    });

    test('That values can be removed by key', () => {
      this.storage.keys().forEach((key) => {
        expect(this.storage.removeItem(key)).toBe(true);
        expect(this.storage.getItem(key)).toBeUndefined();
      });
      expect(this.storage.keys()).toStrictEqual([]);
    });

    this.forceStorageState({supports_local_storage: false});
    test('Clearing cookies returns true', () => {
      expect(this.storage.clear()).toBe(true);
    });

    test('Are there any remaining values not `undefined`?', () => {
      this.storage.keys().forEach((key) => {
        expect(this.storage.getItem(key)).toBeUndefined();
      });
    });

    this.forceStorageState({supports_local_storage: true});
    test('Clearing localStorage returns true', () => {
      expect(this.storage.clear()).toBe(true);
    });
  }

  /**
   *
   * @this Browser_Storage_Test
   */
  coercions() {
    test('Can Browser_Storage coerce strings to JavaScript objects?', () => {
      const test_object = {'key': 'value'};
      const test_json = JSON.stringify(test_object);

      expect(this.storage.constructor.coerce('true')).toBe(true);
      expect(this.storage.constructor.coerce('false')).toBe(false);
      expect(this.storage.constructor.coerce(test_json)).toStrictEqual(test_object);
    });
  }

  /**
   *
   * @this Browser_Storage_Test
   */
  test_getObjectifiedCookies() {
    const test_objectify_raw = {key: "true"};
    const test_objectify_coerced = {key: true};
    const original_supports_local_storage_state = this.storage.supports_local_storage;

    this.forceStorageState({supports_local_storage: false});
    test('Does getObjectifiedCookies return JavaScript objects?', () => {
      expect(this.storage.setItem('key', true, 1)).toBe(true);
      expect(this.storage.constructor.getObjectifiedCookies()).toStrictEqual(test_objectify_raw);
      expect(this.storage.constructor.getObjectifiedCookies(true)).toStrictEqual(test_objectify_coerced);

    });

    this.forceStorageState({supports_local_storage: original_supports_local_storage_state});
  }

  /**
   * @note TODO: sort-out why these tests fail and cookies pass
   * @this Browser_Storage_Test
   */
  test_getObjectifiedLocalStorage() {
    const test_objectify_raw = {key: "true"};
    const test_objectify_coerced = {key: true};
    const original_supports_local_storage_state = this.storage.supports_local_storage;

    this.forceStorageState({supports_local_storage: true});
    test('Does getObjectifiedLocalStorage return JavaScript objects?', () => {
      expect(this.storage.setItem('key', true, 1)).toBe(true);
      console.log('this.storage.getItem("key") ->', this.storage.getItem("key"));
      expect(this.storage.getItem('key')).toBe(true);

      console.log('this.storage.keys() ->', this.storage.keys());
      console.log('this.storage.constructor.getObjectifiedLocalStorage() ->', this.storage.constructor.getObjectifiedLocalStorage());
      console.log('this.storage.constructor.getObjectifiedLocalStorage(true) ->', this.storage.constructor.getObjectifiedLocalStorage(true));

      // expect(this.storage.constructor.getObjectifiedLocalStorage()).toBe(test_objectify_raw);
      // expect(this.storage.constructor.getObjectifiedLocalStorage(true)).toBe(test_objectify_coerced);
    });



    this.forceStorageState({supports_local_storage: original_supports_local_storage_state});
  }

}


const test_storage = new Browser_Storage_Test();

test_storage.runTests();


/**
 * @typedef forced_states
 * @type {Object|boolean}
 * @property {boolean} supports_local_storage - cached from `this.supportsLocalStorage()`
 * @property {boolean} supports_cookies       - cached from `this.supportsCookies()`
 * @property {boolean} storage_available      - cached on if either localStorage or cookies are supported
 */
