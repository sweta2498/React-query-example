import { Button, Heading, Stack, useToast } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { InputControl, SubmitButton, TextareaControl } from 'formik-chakra-ui'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { addnewpost, updatepost } from '../API/Index_Api'

let navigate;

const New_Update = ({isUpdate,id,olddata}) => {

    navigate = useNavigate();
    const toast = useToast();
    const cache=useQueryClient();
    const [editdata,seteditdata]=useState()

    const { isLoading, data, mutateAsync } = useMutation(
        isUpdate ? ["updatePost"] : ["addNewPost"], 
        isUpdate ? updatepost : addnewpost,
        {
            onSuccess:()=>{
                isUpdate ?  cache.invalidateQueries("postdata",id) 
                :
                cache.invalidateQueries("posts");
                // navigate('/1')
            },
            // onError: (error) => {
            //     toast({ status: "error", title: error.message })
            // },
            onMutate:async (newpost)=>{
                if(isUpdate){
                    await cache.cancelQueries("postdata");
                    const previousPost=cache.getQueryData(["postdata",id]);
                    cache.setQueryData(["postdata",id],(old)=>{
                        return {data:newpost};
                    })
                    return {previousPost};
                }
            },
               onError: (error,newpost,context) => {
                cache.setQueryData(["postdata",id],context.previousPost)
                toast({ status: "error", title: error.message })
            },

        })

    function cancelbtn() {
        navigate('/1')
    }
   
    return (
        <div>
            <Formik initialValues={{ title: "", body: "" }}
                onSubmit={async (values) => {
                    isUpdate ? await mutateAsync({ title: values.title, body: values.body,id })
                    :
                    await mutateAsync({ title: values.title, body: values.body })
                }}>
                <Form>
                    <Stack m='20' color='#319795'>
                        <Heading
                            fontSize='3xl'
                            textAlign='center'
                            mb='5' >{isUpdate ? "Update" : "Add New "}Post </Heading>
                        <InputControl name='title' label='Title' />
                        <TextareaControl name='body' label='Content' value={olddata.title}/>
                        <SubmitButton isLoading={isLoading}>{isUpdate ? "Update " : "Add"}POST</SubmitButton>
                        <Button background='#319795' color='white' onClick={cancelbtn}>Cancel</Button>
                      
                    </Stack>
                </Form>
            </Formik>
        </div>
    )
}

export default New_Update;