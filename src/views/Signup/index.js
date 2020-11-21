import React, { useState } from 'react'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import {SignupUser} from '../../config/Firebase'
import firebase from '../../config/Firebase'

function SignUp(props) {

    
    const [fullName,setFullname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [cnfirmPassword,setCnfirmPassword]=useState('')
    const history = useHistory()

const getUser=async function(){
    try{
        if(password !== cnfirmPassword){
            return alert('Password Does not Matched')
        }
        else{
            const result=await SignupUser(email,password)
            localStorage.setItem('userId',result.user.uid)
            firebase.firestore().collection('users').doc(result.user.uid).set({email,fullName})
            history.push('/Chat')
        }      
    }
    catch(e){
        alert(e.message)
    }

}

    return (
        <div>

            <div className="App-header">
                <Grid style={{ width: 382, verticalAlign: 'left' }}>
                    <Grid.Column style={{ backgroundColor: 'white', border: '1px solid transparent', borderRadius: '2%', padding: '4%' }}>
                        <h1 style={{ color: 'black', textAlign: "center" }}>Sign Up</h1>
                        <hr />
                        <Form>
                            <Segment style={{ padding: '4%' }}>

                                <Form.Group widths='equal'>
                                    <Form.Input 
                                    label='Full Name'
                                     placeholder='Enter your full name' 
                                     onChange={(e)=>setFullname(e.target.value)}
                                     />
                                </Form.Group>

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
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Confirm Password'
                                        placeholder='Enter Password again'
                                        onChange={(e)=>setCnfirmPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button.Group widths='2'>
                                    <Button
                                        secondary
                                       onClick={getUser}
                                    >Sign Up</Button>
                                </Button.Group>
                                <div style={{
                                    textAlign: 'center',
                                    fontSize: ' 15px',
                                    color: 'black',
                                    marginTop: '2%'
                                }}>
                                    <p >Already Have an acoount? <button
                                        style={{ border: 'none', backgroundColor: 'white', color: 'blue' }}
                                        onClick={() => { history.push('/') }}
                                    >Login</button></p>
                                </div>


                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>


        </div>
    )
}
export default SignUp