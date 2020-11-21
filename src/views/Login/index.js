import React ,{useState} from 'react'
import { Form, Grid, Segment, Button, Icon, Modal } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import {SigninUser,googleSignIn,FacebookSignIn} from '../../config/Firebase'
import firebase from '../../config/Firebase'

function Signup() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [provider,setProvider]=useState('')
    const [googleProvider,setGoogleProvider]=useState('')
    const history = useHistory()

    const setLogin=async function(){
        try{
            const result =await SigninUser(email,password)
            localStorage.setItem('userId',result.user.uid)
            history.push('/Chat')
        }
        catch(e){
            alert(e.message)
        }
    }

    const GoogleUser=async function(){
      try{
        const result=await googleSignIn(googleProvider)
        localStorage.setItem('userId',result.user.uid)
        history.push('/Chat')
        firebase.firestore().collection('users').doc(result.user.uid).set({email:result.user.email,fullName:result.user.displayName})
      }
      catch(e)
      {
          alert(e.message)
      }
    }

    const FacebookUser=async function(){
        try{
          const result=await FacebookSignIn(provider)
          var token = result.credential.accessToken;
          var user = result.user;
          console.log(token)
          localStorage.setItem('userId',result.user.uid)
          history.push('/Chat')
          firebase.firestore().collection('users').doc(result.user.uid).set({email:result.user.email,fullName:result.user.displayName})
        }
        catch(e)
        {
            alert(e.message)
        }
      }

    return (
      <div >
         <Grid style={{ width: 382, verticalAlign: 'left' }}>
                <Grid.Column style={{ backgroundColor: 'white', border: '1px solid transparent', borderRadius: '2%', padding: '4%' }}>
                    <h1 style={{ color: 'black', textAlign: "center" }}>Login</h1>
                    <hr />
                    <Form>
                        <Segment style={{ padding: '4%' }}>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Email'
                                    placeholder='Enter Email'
                                onChange={(e)=>setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Password'
                                    placeholder='Enter Password'
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button.Group widths='2'>
                                <Button
                                    secondary
                                    onClick={setLogin}
                                >Login</Button>
                            </Button.Group>
                            <div style={{
                                textAlign: 'center',
                                fontSize: ' 15px',
                                color: 'black',
                                marginTop: '2%'
                            }}>
                                <p >Didn't Have an account? <button
                                    style={{ border: 'none', backgroundColor: 'white', color: 'blue' }}
                                   onClick={()=>history.push('/Signup')}
                                >Sign Up</button></p>
                                <hr />
                                <span style={{ fontWeight: 'bold' }}>OR Join Via</span>
                            </div>

                            <Button.Group widths='2' style={{ marginTop: '3%' }}>
                                <Button
                                    color='facebook'
                                    onClick={FacebookUser}
                                     >
                                    <Icon name='facebook' /> Facebook
                                </Button>
                                <Button
                                    color='red'
                                    onClick={GoogleUser}
                                    style={{ marginLeft: '1%' }}>
                                    <Icon name='google' /> Google
                                </Button>
                            </Button.Group>

                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        
      </div>
    );
  }
  
  export default Signup;
  