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
    gUcred: ()=>{
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
    cFingPref: ()=>{
        return new Promise(resolve=>{
            EncryptedStorage.setItem('fingerPref', JSON.stringify({
                pref: false
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
    gFingerPref:()=>{
        return new Promise(resolve=>{
            EncryptedStorage.getItem('fingerPref')
                .then((val)=>{
                    const result = JSON.parse(val)
                    resolve({ok: true, result})
                }).catch(e=>{
                    resolve({ok: false})
                })
        })
    },
    SetFingerPref: (pref)=>{
        return new Promise(resolve=>{
            EncryptedStorage.setItem('fingerPref', JSON.stringify({
                pref: pref
            }))
                .then(()=>{
                    resolve({ok: true})
                })
                .catch(e=>{
                    console.log(e)
                    resolve({ok: false})
                })
        })
    }
}

export default Ucred