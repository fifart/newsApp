import axios from "axios";

export default axios.create({
   baseURL: 'https://panionia-idea.gr/wp-json/wp/v2/posts' 
});