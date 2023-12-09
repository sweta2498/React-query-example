import { Heading, Stack, Container, Flex, Text, Grid, Spinner, useToast, Button } from '@chakra-ui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchpost, fetchsinglepost } from '../API/Index_Api';

const Home = () => {

  const toast = useToast();
  const { id } = useParams();
  // console.log(id);
  const pageid = parseInt(id)
  const navigate = useNavigate()

  const onSuccess = (data) => {
    // console.log("Success..!!1", data);
  }
  const onError = (error) => {
    console.log("Error.!!", error);
    toast({ status: 'error', title: error.message })
  }

  const { data, isLoading, isSuccess } = useQuery(["posts", pageid], () => fetchpost(pageid), {
    // cacheTime:3000, ////// default 0 sec
    // staleTime:5000, ////// default 0 sec
    // refetchInterval:5000,
    // refetchIntervalInBackground:true,
    // refetchOnWindowFocus:false,
    // enabled:false,
    keepPreviousData: true,
    onSuccess: onSuccess,
    onError: onError,
  });

  ////////////dependent query ///////////////boolean value true then run othervise no
  // const {data:singlePOst}=useQuery(["post",1734],()=>fetchsinglepost(1734),{
  //   enabled:isSuccess,
  //   onError:(error)=>{
  //     toast({status:"error",title:error.message})
  //   }
  // })
  // console.log("Posts==",data);
  // console.log("post=====",singlePOst);

  //////multiple query /////////
  // let pid=[1734,1729,1728];
  // const QueryResult=useQueries(pid.map(id=>{
  //   return{
  //     QueryKey:['postlist',id],
  //     QueryFn:()=>fetchsinglepost(id)
  //   }
  // }))



  if (isLoading)
    return <Spinner
      placeItems='center'
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'>
      Loading...</Spinner>

  return (
    <Container maxW='1300px' mt='4'>
      {
        isLoading ? (<Grid placeItems='center' height='100vh'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Grid>) : (
          <>
            <Flex justify='space-between' mb='4'>
              <Button colorScheme='orange'
                onClick={() => {
                  if (data.meta.pagination.links.previous !== null) {
                    navigate(`/home/${pageid - 1}`);
                  }
                }}
                disabled={data.meta.pagination.links.previous === null}>
                Prev</Button>

              <Text>Current Page : {pageid}</Text>
              <Button colorScheme='orange'
                onClick={() => {
                  if (data.meta.pagination.links.next !== null) {
                    navigate(`/home/${pageid + 1}`)
                  }
                }}
                disabled={data.meta.pagination.links.next === null}
              >Next</Button>
            </Flex>

            {data.data?.map((post) => (
              <Link key={post.id} to={`/post/${post.id}`}>
                <Stack p='4' boxShadow='md' borderRadius='xl' border='1px solid #ccc' m='5'>
         
                  <Flex justify='space-between'>
                    <Text>{post.user_id}</Text>
                    <Text>{post.id}</Text>
                  </Flex>
                  <Heading fontSize='2xl'>{post.title}</Heading>
                  <Text>{post.body}</Text>
                </Stack>
              </Link>
            ))

            }

          </>
        )
      }

    </Container>
  )
}

export default Home;