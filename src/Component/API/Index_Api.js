import axios from "axios";
const user_id=1010;

export const fetchpostdata = async () => {
    try {
        const { data } = await axios.get(`http://localhost:4000/data`);
        console.log(data);
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch Posts!!')
    }
}

export const fetchpost = async (id) => {
    try {
      const { data } = await axios.get(`https://gorest.co.in/public/v1/posts?page=${id}`);
      // console.log(data);
      return data;
    }
    catch (error) {
      throw Error('Unable to fetch Posts!!')
    }
  }

export  const fetchsinglepost = async (id) => {
    try {
        const { data } = await axios.get(`https://gorest.co.in/public/v1/posts/${id}`);
        // console.log(data);
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch Posts!!')
    }
}

export  const ferchdatasingle = async (id) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/data/${id}`);
        // console.log(data);
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch Posts!!')
    }
}

  export const addnewpost = async ({ title, body }) => {
    
    try {
        const { data } = await axios.post(`http://localhost:4000/data`,
            { user_id,title, body },
            {
                headers: { "Content-Type": "application/json" }
            })
        // console.log("Data", data)
        alert("New Post added..!!")
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch Posts!!')
    }
}

export const updatepost = async ({ title, body,id }) => {
    
    try {
        const { data } = await axios.patch(`http://localhost:4000/data/${id}`,
            { user_id,title, body },
            {
                headers: { "Content-Type": "application/json" }
            })
        // console.log("Data", data)
        
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch Posts!!')
    }
}

export const deletepost = async ({ id }) => {
    
    try {
        const { data } = await axios.delete(`http://localhost:4000/data/${id}`,
            {
                headers: { "Content-Type": "application/json" }
            })
        // console.log("Data", data)
        
        return data;
    }
    catch (error) {
        throw Error('Unable to fetch Posts!!')
    }
}