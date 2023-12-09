import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Home from './Component/Home/Home';
import Post from './Component/Post/Post';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Header from './Component/Header';
import NewPost from './Component/Post/NewPost';
import Postdatashow from './Component/Post/Postdatashow';
import PostSingle from './Component/Post/PostSingle';
import New_Update from './Component/Post/New_Update';
// provides valuable tools to improve reliability of server data

function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false,
        refetchInterval:10000
      }
    }
  });
  
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/home/:id" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/addpost" element={ <NewPost/>} />
            <Route path="/newupdate" element={ <New_Update/>} />
            <Route path="/" element={ <Postdatashow/>} />
            <Route path="/postsingle/:id" element={ <PostSingle/>} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider >
    </ChakraProvider>
  );
}

export default App;
