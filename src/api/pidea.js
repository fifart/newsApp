import axios from "axios";

export default axios.create({
   baseURL: 'https://reformer.gr/wp-json/wp/v2/posts' 
});