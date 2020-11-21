import React, { useState } from 'react'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

function SignUp(props) {

    const history = useHistory()
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
                                    <Form.Input label='First Name' placeholder='Enter first name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input label='Last Name' placeholder='Enter last name' />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Email'
                                        placeholder='Enter Email'
                                        
                                    />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Password'
                                        placeholder='Enter Password'
                                       
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Confirm Password'
                                        placeholder='Enter Password again'
                                    />
                                </Form.Group>

                                <Button.Group widths='2'>
                                    <Button
                                        secondary
                                       
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