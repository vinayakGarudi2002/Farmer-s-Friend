// export const incNumber = () => {
//     return {
//         type: 'INCREMENT',
//         payload: 2
//     }
// };

export const pay = (para) => {
    return {
        type: 'SET',
        payload: para
    }
}

export const payget = () => {
    return {
        type: 'GET'
    }
};