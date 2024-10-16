import axios from "axios"

// /api/v1/share
class share {
    async addnewshare(docid, {privated}){
        return await axios.post(`/api/v1/share/create/${docid}`, {
            privated
        })
    }
    
    async getoneshare(shareid){
        return await axios.get(`/api/v1/share/getone/${shareid}`)
    }
    
    async updateshare(shareid, { privated, views }){
        return await axios.patch(`/api/v1/share/c/${shareid}`, {
            privated, views 
        })
    }

    async getallshares(){
        return await axios.get(`/api/v1/share/allshares`)
    }

    async deleteshare(shareid){
        return await axios.delete(`/api/v1/share/d/${shareid}`)
    }
}

const Sharebase = new share()
export default Sharebase