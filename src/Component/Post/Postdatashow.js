import React from 'react';
import { Heading, Stack, Container, Flex, Text, Grid, Spinner, useToast, Button } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { deletepost, fetchpostdata } from '../API/Index_Api';

const Postdatashow = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const cache=useQueryClient();

    const onSuccess = (data) => {
        // console.log("Success..!!1", data);
    }
    const onError = (error) => {
        console.log("Error.!!", error);
        toast({ status: 'error', title: error.message })
    }

    const { data, isLoading } = useQuery(["postsdata"], fetchpostdata, {
        keepPreviousData: true,
        onSuccess: onSuccess,
        onError: onError,
    });
    const {isLoading:isMutating,mutateAsync}=useMutation(["deletepost"],deletepost,
    {
        onError:(error)=>{
            toast({status:"error",title:error.message})
        },
        onSuccess:()=>{
          cache.invalidateQueries("postsdata")
        }
    })

    if (isLoading)
        return <Spinner
            placeItems='center'
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'>
            Loading...</Spinner>
    
    function editbtn(id) {
      navigate(`/postsingle/${id}`)
    }
    function viewbtn(id){
      navigate(`/postsingle/${id}`)
    }
    
    return (
        <div>
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
            {data?.map((post) => (
             <Stack key={post.id} p='4' boxShadow='md' borderRadius='xl' border='1px solid #ccc' m='5'>
               <Flex justify='flex-end'>
                    <Button  size='xs' background='#319795' color='white' onClick={()=>viewbtn(post.id)}>
                      View
                    </Button>
                    <Button mx='2' size='xs' background='#319795' color='white' onClick={()=>editbtn(post.id)}>
                      Edit
                    </Button>
                    <Button  size='xs' background='#319795' color='white'
                            isLoading={isMutating} onClick={async()=>{
                              await mutateAsync({id:post.id})
                            }}>
                      Delete
                    </Button>
                  </Flex>
               <Link  to={`/postsingle/${post.id}`}>
                <Stack >
                                    
                  <Flex justify='space-between'>
                    <Text>{post.user_id}</Text>
                    <Text>{post.id}</Text>
                  </Flex>
                  <Heading fontSize='2xl'>{post.title}</Heading>
                  <Text>{post.body}</Text>
                 
                </Stack>
              </Link>
             </Stack>
            ))
            }
          </>
        )
      }

                
            </Container>
        </div>
    )
}

export default Postdatashow