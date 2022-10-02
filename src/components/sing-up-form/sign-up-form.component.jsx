import { useState } from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

import FormInput  from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component"

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confrimPassword: ''
  }

const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confrimPassword } = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }


    const handleSubmit = async(event) => {
        event.preventDefault()

        if (password !== confrimPassword) {
            alert("passwords do not match");
            return;
        }
        try {
        const {user} = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, { displayName})
        resetFormFields()

        } catch(err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Can not create user, email already in use')

            } else {
                console.log('user creation encounted an error', err)
            }
        }


    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setFormFields({...formFields, [name] : value})
        
    }


  
  return (
    <div className="sign-up-container">
        <h2>Don't have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <label>Display Name</label>
            <FormInput 
                label="Display Name"
                type='text' 
                required
                onChange={handleChange}
                name='displayName'
                value={displayName}
            />

            <FormInput 
                label='email' 
                required
                onChange={handleChange}
                name='email'
                value={email}
            />
            <FormInput 
                label='password' 
                required
                onChange={handleChange}
                name='password'
                value={password}
            />
            <FormInput 
                label='password' 
                required
                onChange={handleChange}
                name='confrimPassword'
                value={confrimPassword}
            />
            <Button buttonType='google' type='submit'>Sign Up</Button>
        </form>
        


    </div>
  )
}

export default SignupForm