import { Heading, Stack, Container, Flex, Text, Grid, Spinner, useToast, Button } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { deletepost, ferchdatasingle, fetchsinglepost } from '../API/Index_Api';
import New_Update from './New_Update';

const PostSingle = () => {

    const toast = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const [editdata, seteditdata] = useState(false);
    const cache=useQueryClient();

    useEffect(() => {
    seteditdata(false)
    }, [])
    
    const onSuccess = (data) => {
        // console.log("Success..!!1", data);
    }
    const onError = (error) => {
        // console.log("Error.!!", error);
        toast({ status: 'error', title: error.message })
    }

    const {isLoading:isMutating,mutateAsync}=useMutation(["deletepost"],deletepost,
    {
        onError:(error)=>{
            toast({status:"error",title:error.message})
        },
        onSuccess:()=>{
          cache.invalidateQueries("postsdata")
          navigate('/')
          seteditdata(false)
        }
    })

    const { data, isLoading } = useQuery(["postdata", parseInt(id)], () => ferchdatasingle(id), {
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

    function editbtn() {
        seteditdata(true)
    }
    function cancelbtn() {
        seteditdata(false)
    }

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
                        {
                            editdata && <New_Update isUpdate={true} id={data.id} olddata={data} />
                        }

                        <Stack p='4' boxShadow='md' borderRadius='xl' border='1px solid #ccc' marginTop='5'>
                            <Flex justify='space-between'>
                                <Text>{data.user_id}</Text>
                                <Text>{data.id}</Text>
                            </Flex>
                            <Heading fontSize='2xl'>{data.title}</Heading>
                            <Text>{data.body}</Text>

                            <Flex justify='space-between' mb='4'>
                                <Button colorScheme='orange'
                                    onClick={() => {
                                        navigate(`/postsingle/${data.id - 1}`);
                                    }}
                                    
                                    >
                                    Prev</Button>


                                <Button colorScheme='orange'
                                    onClick={() => { navigate(`/postsingle/${data.id + 1}`) }}>Next</Button>
                            </Flex>
                        </Stack>
                        <Text textAlign={'center'} marginTop='5'>Current Page : {id}</Text>
                       
                        <Flex justify='center' mt='5'>
                            <Button textAlign={'center'} background='#319795' fontSize='xl' padding='5' color='white'
                                isLoading={isMutating} onClick={async () => {
                                    await mutateAsync({ id: data.id })
                                }}>
                                Delete
                            </Button>
                            {
                            !editdata && <Flex mx='2' >
                                <Button textAlign={'center'} background='#319795' fontSize='xl' padding='5' color='white'
                                 onClick={editbtn}>Edit</Button>
                            </Flex>
                        }
                         {
                            editdata && <Flex mx='2'>
                                <Button textAlign={'center'} background='#319795' fontSize='xl' padding='5' 
                                color='white' onClick={cancelbtn}>Cancel</Button>
                            </Flex>
                        }
                        </Flex>
                    </>
                )
            }

        </Container>
    )
}


export default PostSingle