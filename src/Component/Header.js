import { Button, Flex, Img } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'
import logo from '../Images/logo.png'

const Header = () => {

    const navigate=useNavigate()

    function newpostbtn(){
        navigate('\addpost')
    }
    function postdatashow(){
        navigate('/home/1')
    }
    function home(){
        navigate('/')
    }
  return (
    <div>
         <Flex backgroundColor='#319795' justify='space-between' mb='4'>
         <Img src={logo} height='50' width='50' marginTop='3.5' marginLeft='3.5'/>
            
         <Flex justify='space-between' >
         <Button 
                margin='5' 
                padding='5' 
                fontSize='18' 
                fontWeight='bold' 
                color='#319795' 
                onClick={home}>Home </Button>
         <Button 
                margin='5' 
                padding='5' 
                fontSize='18' 
                fontWeight='bold' 
                color='#319795' 
                onClick={newpostbtn}>Add new Post </Button>
                <Button 
                margin='5' 
                padding='5' 
                fontSize='18' 
                fontWeight='bold' 
                color='#319795' 
                onClick={postdatashow}>Post Data Show </Button>
              </Flex>
              
         </Flex>
        
    </div>
  )
}

export default Header