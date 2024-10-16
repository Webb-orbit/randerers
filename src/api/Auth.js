import axios from "axios"

// /api/v1/client
class auth {
    async createclient(email, username, password, avatar) {
        const cuser =  await axios.post(`/api/v1/client/createclent`, {
            email, username, password, avatar
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
              },
              withCredentials: true
        })
        if (cuser) {
            return await this.login(email, password)
        }
    }
    
    async login(email, password) {
        return await axios.post('/api/v1/client/login', {
            email,
            password,
        },{
            withCredentials:true
        })
    }

    async currentclient() {
        return await axios.get('/api/v1/client/getuser')
    }

    async logout() {
        return await axios.get(`/api/v1/client/logout`)
    }

    async changepassword(oldpass, newpass) {
        return await axios.patch(`/api/v1/client/c/password`, {
            oldpassword: oldpass,
            newpassword: newpass
        })
    }

    async updateaccount({email, username, apikey}) {
        return await axios.patch(`/api/v1/client/c/detiles`, {
            email, username, apikey
        })
    }

    async updateavatar(file) {
        return await axios.patch(`/api/v1/client/c/avatar`, {
            avatar: file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    async addapikey(apikey) {
        return await axios.post(`/api/v1/client/addkey`, {
            apikey
        })
    }
    
    async getapikey(){
        return await axios.get(`/api/v1/client/getapikay`)
    }

    async deleteapikey(){
        return await axios.delete(`/api/v1/client/deleapikey`)
    }
}

const Authbase = new auth()
export default Authbase