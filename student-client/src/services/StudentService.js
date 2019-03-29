import axios from 'axios'


export default {

    getAllStudents() {
        return axios.get('/api/students').then(response => {
            return response.data
        })
    },

    getStudent(id) {
        return axios.get('/api/students/' + id).then(response => {
            return response.data
        })
    },

    addStudent(student) {
        return axios.post('/api/students', student).then(response => {
            return response.data 
        })
    },

    updateStudent(student) {
        return axios.patch('/api/students/' + student.id , student).then(response => {
            return response.data
        })
    },

    deleteStudent(id) {
        return axios.delete('/api/students/' + id).then(response => {
            return response.data 
        })
    }
}