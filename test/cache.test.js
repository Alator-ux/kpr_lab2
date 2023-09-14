import {Cache} from "../src/cache";

describe('CACHE', () =>{
    test('AccCount 2 to 0', () => {
        let cache = new Cache()
        cache.insert('key1', 123, 2)
        let r = cache.get('key1')
        expect(r).toBe(123);
        r = cache.get('key1')
        expect(r).toBe(123);
        r = cache.get('key1')
        expect(r).toBe(null);
    });
    test('AccCount def value to 0', () => {
        let cache = new Cache()
        cache.insert('key2', 123)
        let r = cache.get('key2')
        expect(r).toBe(123);
        r = cache.get('key2')
        expect(r).toBe(null);
    });
    test('Incorrect accCount value', () => {
        let cache = new Cache()
        cache.insert('key3', 123, 0)
        let r = cache.get('key3')
        expect(r).toBe(null);
    });
    test('Multiple cache elems', () => {
        let cache = new Cache()
        cache.insert('key1', 123, 2)
        cache.insert('key2', 457)
        cache.insert('key3', 9, 10)
        let kv = cache.get('key1')
        expect(kv).toBe(123);
        kv = cache.get('key2')
        expect(kv).toBe(457);
        kv = cache.get('key3')
        expect(kv).toBe(9);
        kv = cache.get('key2')
        expect(kv).toBe(null);
    });
    test('Redefine key', () => {
        let cache = new Cache()
        cache.insert('key1', 123, 2)
        cache.insert('key1', 457, 3)
        let kv = cache.get('key1')
        expect(kv).toBe(457);
    });
    test('Get from empty cache', () =>{
        let cache = new Cache()
        let kv = cache.get("key1")
        expect(kv).toBe(null);
    });
    test('Statistics with one cache elem', () =>{
        let cache = new Cache()
        cache.insert('key1', 123, 2)
        let s = cache.statistics()
        expect(s).toBe("N: 0, key=key1, value=123, accCount=2\n")
    })
    test('Statistics with three cache elem', () =>{
        let cache = new Cache()
        cache.insert('key1', 123, 2)
        cache.insert('key2', 23, 5)
        cache.insert('key3', 78)
        let s = cache.statistics()
        expect(s).toBe("N: 0, key=key1, value=123, accCount=2\nN: 1, key=key2, value=23, accCount=5\nN: 2, key=key3, value=78, accCount=1\n")
    })

    test('Log with one cache elem', () =>{
        let cache = new Cache()
        cache.insert('key1', 123, 2)
        cache.get("key1")
        let s = cache.logs()
        expect(s).toBe("key=key1, value=123, accCount=1\n")
    })
    test('Log with three cache elem', () =>{
        let cache = new Cache()
        cache.insert('key1', 123, 2)
        cache.insert('key2', 23, 5)
        cache.insert('key3', 78)
        cache.get('123')
        cache.get('key2')
        cache.get('key3')
        let s = cache.logs()
        expect(s).toBe("key=key2, value=23, accCount=4\nkey=key3, value=78, accCount=0\n")
    })
})