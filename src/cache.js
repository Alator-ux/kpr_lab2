class CacheVC{
    constructor(value, accCount){
        this.value = value
        this.accCount = accCount
    }
}
class Cache{
    constructor(){
        this.dict = {}
        this.log = []
    }
    insert(key, value, accCount = 1) {
        if(accCount < 1){
            return
        }
        this.dict[key] = new CacheVC(value, accCount);
    }
    get(key) {
        if (!(key in this.dict)) {
            return null
        }
        let res = this.dict[key]
        this.dict[key].accCount--;
        if (this.dict[key].accCount == 0){
            delete this.dict[key]
        }
        this.log.push(`key=${key}, value=${res.value}, accCount=${res.accCount}\n`)
        return res.value
    }
    statistics(){
        var res = []
        let i = 0
        for (let key in this.dict) {
            res.push(`N: ${i}, key=${key}, value=${this.dict[key].value}, accCount=${this.dict[key].accCount}\n`)
            i++;
        }
        return res.join('');
    }
    logs(){
        return this.log.join('')
    }
}
export {Cache}