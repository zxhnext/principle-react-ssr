import { CHANGE_LIST } from "./constants";

const changeList = (list) => ({
    type: CHANGE_LIST,
    list
})

export const getTranslationList = (server) => {
    return (dispatch, getState, axiosInstance) => {
        return axiosInstance.get('/api/translation')
            .then(res => {
                if(res.data.status == 200) {
                    const list = res.data.data
                    dispatch(changeList(list))
                } else {
                    const list = []
                    dispatch(changeList(list))
                }
            })
    }
}