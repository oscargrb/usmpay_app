import EncryptedStorage  from "react-native-encrypted-storage"

const Ucred = {
    sUcred: (data)=>{
        return new Promise(resolve=>{
            EncryptedStorage.setItem('Ucred', JSON.stringify({
                data
            }))
                .then(()=>{
                    resolve({ok: true})
                })
                .catch(e=>{
                    console.log(e)
                    resolve({ok: false})
                })
        })
    },
    sUcred: ()=>{
        return new Promise(resolve=>{
            EncryptedStorage.getItem('Ucred')
                .then((val)=>{
                    const result = JSON.parse(val)
                    resolve({ok: true, result})
                }).catch(e=>{
                    resolve({ok: false})
                })
        })
    },
    FingPref: ()=>{
         
    }
}