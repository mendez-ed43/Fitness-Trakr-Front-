
const{REACT_APP_API_URL = 'https://fitnesstrac-kr.herokuapp.com/api'} = process.env

const callApi = async ({url, method, token, body}) => {
    try {
        const options = {
            method: method ? method.toUpperCase() : 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };
        if(token) options.headers['Authorization'] = `Bearer ${token}`;
        // console.log("optiones<><><>", options);
        const response = await fetch(`${REACT_APP_API_URL}${url}`, options);
        const data = await response.json();
        if(data.error) {
            throw (data.error)
        }
        return data        
    } catch (error) {
        console.error(error)
    }
}

export default callApi;