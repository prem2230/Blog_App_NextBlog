
const apiRequest = async(url='',optionsObj=null, errMsg = null)=>{
    try{
      const accessToken = sessionStorage.getItem('accessToken');

        if (accessToken) {
            if (!optionsObj.headers) {
                optionsObj.headers = {};
            }
            optionsObj.headers.Authorization = accessToken;
        }

        const response = await fetch(url,optionsObj)
        const data = await response.json()
        
        if (!response.ok) {
          const errorMessage = data ? data.msg || errMsg || 'Reload the app' : errMsg || 'Reload the app';
            throw Error(errorMessage);
          }
      
          return { data, error: null }; 
      
        } catch (error) {
          return { data: null, error: error.message }; 
        }
}

export default apiRequest