import EncryptedStorage  from "react-native-encrypted-storage"

const nxu = {
    snxut : (val)=>{
        return new Promise(resolve=>{
            EncryptedStorage.setItem('nxu', JSON.stringify(val))
                .then(()=>{
                    resolve({ok: true})
                })
                .catch(e=>{
                    console.log(e)
                    resolve({ok: false})
                })
        })
    },

    gnxut: ()=>{
        return new Promise(resolve=>{
            EncryptedStorage.getItem('nxu')
                .then((val)=>{
                    const result = JSON.parse(val)
                    resolve({ok: true, result})
                }).catch(e=>{
                    resolve({ok: false})
                })
        })
    },

    delxut: ()=>{
        return new Promise(resolve =>{
            EncryptedStorage.removeItem('nxu')
                .then(()=>{
                    resolve({ok: true})
                })
                .catch(e=>{
                    resolve({ok:false, e})
                })
        })
    }
}

export default nxu