import { Button, Heading, Stack, useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { InputControl, SubmitButton, TextareaControl } from 'formik-chakra-ui'
import React from 'react'
import { useNavigate } from 'react-router'
import { addnewpost } from '../API/Index_Api'

let navigate;

const NewPost = () => {

    navigate = useNavigate();
    const toast = useToast();
    const cache=useQueryClient();

    const { isLoading, data, mutateAsync } = useMutation(["addNewPost"], addnewpost,
        {
            onSuccess:()=>{
                cache.invalidateQueries("posts");
                navigate('/')
            },
            onError: (error) => {
                toast({ status: "error", title: error.message })
            }
        })

    function cancelbtn() {
        navigate('/1')
    }
    return (
        <div>
            <Formik initialValues={{ title: "", body: "" }}
                onSubmit={async (values) => {
                    console.log(values);
                    await mutateAsync({ title: values.title, body: values.body })
                }}>
                <Form>
                    <Stack m='40' color='#319795'>
                        <Heading
                            fontSize='3xl'
                            textAlign='center'
                            mb='5' >Add New Post </Heading>
                        <InputControl name='title' label='Title' />
                        <TextareaControl name='body' label='Content' />
                        <SubmitButton>ADD POST</SubmitButton>
                        <Button background='#319795' color='white' onClick={cancelbtn}>Cancel</Button>
                    </Stack>
                </Form>
            </Formik>
        </div>
    )
}

export default NewPost;