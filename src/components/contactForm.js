import React, { useState } from 'react'
import { FormControl, InputLabel, Input, TextareaAutosize, Button, Icon } from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';
import classes from '../styles/contact.module.scss';
import Axios from 'axios';
import cls from 'classnames';
import { computeMessage } from '../utils'

export default function ContactForm({cart}) {
    const url = "https://getform.io/f/1eafd699-0e5b-4438-8855-09b9f3d513a0";
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    const defaultMessage = computeMessage(cart);
    const [name, setName] = useState({value: '', error: true});
    const [email, setEmail] = useState({value: '', error: true});
    const [message, setMessage] = useState({value: defaultMessage, error: !defaultMessage});
    const [success, setsuccess] = useState(false);
    const [error, setError] = useState(false);

    function validateAndSetName({target: {value}}) {
        setName({value, error: !value});
        setsuccess(false);
    }
    function validateAndSetEmail({target: {value}}) {
        setEmail({value, error: !emailRegex.test(value)});
        setsuccess(false);
    }
    function validateAndSetMessage(value) {
        if (value === message.value) return;
        setMessage({value, error: !value});
        setsuccess(false);
    }

    const submit = async (e) => {
        e.preventDefault();
        setError(false);
        if (email.error || name.error || message.error) {
            setError(true);
            return;
        }
        const data = new FormData();
        data.append('name', name.value);
        data.append('email', email.value);
        data.append('message', message.value);
        const response = await Axios.post(url, data);
        setsuccess(response.status === 200);
    }

    return (
            <form name="contact" method="POST" data-netlify="true" className={classes.form}>
                <div className={classes.fullWidth}>
                    <FormControl className={cls(classes.formInput, name.error ? classes.error : '')}>
                        <InputLabel htmlFor="my-input">Name</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={validateAndSetName}/>
                        <div className={classes.errorMsg}>{name.error}</div>
                    </FormControl>
                    <FormControl className={cls(classes.formInput,  email.error ? classes.error : '')}>
                        <InputLabel htmlFor="my-input">Email Address</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={validateAndSetEmail} />
                        <div className={classes.errorMsg}>{email.error}</div>
                    </FormControl>
                </div>
                <div>
                <FormControl className={cls(classes.messageContainer, message.error ? classes.error : '')}>
                    <textarea name="" 
                        id="" cols="30" placeholder="Message" rows="10" className={classes.textArea}
                        defaultValue={defaultMessage}
                        onChange={({target}) => validateAndSetMessage(target.value)} />
                </FormControl>
                </div>
                <div>
                    <div className={classes.submit}>
                        <span className={cls(classes.success, success ? '' : classes.hidden)}>Your message has been sent. I will contact you ✔️</span>   
                        <span className={cls(classes.err, error ? '' : classes.hidden)}>Please fix the errors above and try again 😥</span>  
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<SendRounded />}
                            onClick={submit}
                        >
                            Send
                        </Button>
                    </div>
                    
                </div>
            </form>
    )
}
