/**
 * Functions file
 */

class DataBase {
    /**
     * 
     * @param {string} collection 
     */
    getCollectionBlobInformation(collection){
        return localStorage.getItem(collection);
    }
    /**
     * 
     * @param {string} collectionName 
     * @param {string} valueParsed 
     */
    setCollectionBlobInformation(collectionName, valueParsed){
        localStorage.setItem(collectionName, valueParsed);
    }
    /**
     * 
     * @param {string} collection 
     */
    getPartialCollectionBlobInformation(collection){
        return sessionStorage.getItem(collection);
    }
    /**
     * 
     * @param {string} collectionName 
     * @param {string} valueParsed 
     */
    setPartialCollectionBlobInformation(collectionName, valueParsed){
        sessionStorage.setItem(collectionName, valueParsed);
    }
}

var DB = new DataBase;