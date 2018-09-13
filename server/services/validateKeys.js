
//takes in 2 parameter the obj to validate its keys and the array of expected keys in the object

let validateKey = function(obj,keys){
    //validate the obj and confirm its is an object
    if(typeof obj === "undefined" && typeof obj.length ==="undefined"){
        return false;
    }else{
        let objetctKey = Object.keys(obj);
        if(objetctKey.length !== keys.length){
            return false;
        }else{
            let keyMatch;
            for(let i=0; i < keys.length; i++){
                keyMatch = false;
                for(let j=0;j<objetctKey.length;j++){
                    if(keys[i] === objetctKey[j]){
                        keyMatch = true;
                        
                    }
                }
                if(!keyMatch){
                    return false;
                }
            }
            if(keyMatch){
                return true
            }else{
                return false;
            }
        }
    }
}

export default validateKey