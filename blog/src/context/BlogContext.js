import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) =>{
    switch(action.type){
        case 'get_blogposts': 
            return action.payload;
        case 'delete_blogpost' : 
            return state.filter((blogPost) => blogPost.id !== action.payload); // 82000 !== 82000
        /* case 'add_blogpost':
            return [...state, { 
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }]; */
        
        case 'edit_blogpost' : 
            return state.map ((blogPost)=>{
                return blogPost.id === action.payload.id ? action.payload : blogPost; 
            });

        /* case 'edit_blogpost': {
            return [...state, { 
                id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content
            }];
        } */
        default:
            return state;
    }
};

const getBlogPosts = (dispatch) =>{
    return async () =>{
        const response = await jsonServer.get('/blogposts');

        dispatch({type: 'get_blogposts', payload: response.data});
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogPosts', {title, content})
        // dispatch({type: 'add_blogpost', payload : {title, content}});
         if(callback){
             callback();
         }
        
    };
};


const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogPosts/${id}`);
        dispatch({type: 'delete_blogpost', payload : id});
    };
};

const editBlogPost = dispatch =>{
    return async (id, title, content, callback) =>{
        await jsonServer.put(`/blogPosts/${id}`, {title, content});
        dispatch({type: 'edit_blogpost', payload: { id, title, content}});
        if(callback){
            callback();
        }
    };
};

/* const editBlogPost = (dispatch) => {
    return (id) => {
        dispatch({type: 'edit_blogpost', payload : {title, content}});
    };
}; */

/* export const BlogProvider = ({children}) => {
    const [blogPosts, dispatch] = useReducer(blogReducer, []);
    const addBlogPost = () => {
        dispatch({type: 'add_blogpost'});
    };
    return (
        <BlogContext.Provider value = {{ data :  blogPosts, addBlogPost}}>
            {children}
        </BlogContext.Provider>
        );
}; */

//export default BlogContext;

export const {Context, Provider} = createDataContext(
                                                        blogReducer, 
                                                        {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts}, 
                                                        // [{title: 'Test Post', content: 'Test content', id: 1}]
                                                        []
                                                    );