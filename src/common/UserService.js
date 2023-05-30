import Ucred from "../context/Ucred"

const { default: nxu } = require("../context/Nxu")
const { default: ApiService } = require("./ApiService")


const UserService = {
    logout: () =>{
        return new Promise(async resolve=>{

            const NXU = await nxu.gnxut()

            if(NXU.ok){
                fetch(`${ApiService.url}/logout`,{
                    method:"GET",
                    headers:{
                      "Set-Cookie": NXU.result.sessionToken
                    }
                }).then(async response=>{
                    console.log(response)
            
                    if(response.status == 204){
            
                      const result = await nxu.delxut()
                      if(result.ok){
                        resolve({ok: true})
                      }else{
                        resolve({ok: false})
                      }
                      
                    }else{
                        resolve({ok: false})
                    }
                    
                }).catch(e=>{
                    resolve({ok: false})
                })
            }
        })
    },
    
}

export default UserService