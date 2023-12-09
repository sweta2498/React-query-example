import { Heading, Stack, Container, Flex, Text, Grid, Spinner, useToast, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router';
import { fetchsinglepost } from '../API/Index_Api';




const Post = () => {

    const toast = useToast();
    const { id } = useParams();
    const navigate = useNavigate()

    const onSuccess = (data) => {
        // console.log("Success..!!1", data);
    }
    const onError = (error) => {
        // console.log("Error.!!", error);
        toast({ status: 'error', title: error.message })
    }

    const { data, isLoading } = useQuery(["post", id], () => fetchsinglepost(id), {
        // cacheTime:3000, ////// default 0 sec
        // staleTime:5000, ////// default 0 sec
        // refetchInterval:5000,
        // refetchIntervalInBackground:true,
        // refetchOnWindowFocus:false,
        // enabled:false,
        // keepPreviousData: true,
        onSuccess: onSuccess,
        onError: onError,
    });
    // console.log(data);
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
                        <Stack p='4' boxShadow='md' borderRadius='xl' border='1px solid #ccc' marginTop='5'>
                            <Flex justify='space-between'>
                                <Text>{data.data.user_id}</Text>
                                <Text>{data.data.id}</Text>
                            </Flex>
                            <Heading fontSize='2xl'>{data.data.title}</Heading>
                            <Text>{data.data.body}</Text>

                            <Flex justify='space-between' mb='4'>
                            <Button colorScheme='orange'
                                onClick={() => {
                                    navigate(`/post/${data.data.id - 1}`);
                                }}>
                                Prev</Button>

                            
                            <Button colorScheme='orange'
                                onClick={() => { navigate(`/post/${data.data.id + 1}`) }}>Next</Button>
                        </Flex>
                        </Stack>
                        <Text textAlign={'center'} marginTop='5'>Current Page : {id}</Text>
                        
                    </>
                )
            }

        </Container>
    )
}

export default Post;