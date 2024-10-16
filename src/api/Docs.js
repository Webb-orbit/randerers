import axios from "axios"

// /api/v1/docs
class docs {

    async getalldocs(page = 0, limit, q) {
        try {
            if (!q) return await axios.get(`/api/v1/docs/alldocs?page=${page}`)
            return await axios.get(`/api/v1/docs/alldocs?q=${q}`)
        } catch (error) {
            console.log(error);
            return { err: true, message: error.response.message || "something went wrong" }
        }
    }

    async createdoc(title, content, shared) {
        try {
            return await axios.post('/api/v1/docs/create', {
                title, content, shared
            })
        } catch (error) {
            console.log(error);
            return { err: true }
        }
    }

    async getonedocument(id) {
        try {
            return await axios.get(`/api/v1/docs/get/${id}`)
        } catch (error) {
            console.log(error);
            return { err: true }
        }
    }

    async updatedocument(id, { title, content, shared }) {
        try {
            return await axios.patch(`/api/v1/docs/c/${id}`, {
                title, content, shared
            })
        } catch (error) {
            console.log(error);
            return { err: true }
        }
    }

    async deletedocument(id) {
        try {
            return await axios.delete(`/api/v1/docs/d/${id}`)
        } catch (error) {
            console.log(error);
            return { err: true }
        }
    }
}

const Docsbase = new docs()
export default Docsbase