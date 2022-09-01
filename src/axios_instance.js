import axios from 'axios'
import qs from "qs"
axios.interceptors.request.use(async (config) => {
//只针对get方式进行序列化
    if (config.method === 'get') {
        config.paramsSerializer = function(params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }
    })