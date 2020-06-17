import React, { useState } from 'react'
import { FormControl, InputLabel, Input, TextareaAutosize, Button, Icon } from '@material-ui/core';
import { SendRounded } from '@material-ui/icons';
import classes from '../styles/contact.module.scss';
import Axios from 'axios';
import cls from 'classnames';

export default function ContactForm() {
    const url = "https://getform.io/f/1eafd699-0e5b-4438-8855-09b9f3d513a0";
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    const [name, setName] = useState({value: '', error: true});
    const [email, setEmail] = useState({value: '', error: true});
    const [message, setMessage] = useState({value: '', error: true});
    const [success, setsuccess] = useState(false)

    function validateAndSetName({target: {value}}) {
        setName({value, error: !value});
        setsuccess(false);
    }
    function validateAndSetEmail({target: {value}}) {
        setEmail({value, error: !emailRegex.test(value)});
        setsuccess(false);
    }
    function validateAndSetMessage({target: {value}}) {
        setMessage({value, error: !value || value.length < 10});
        setsuccess(false);
    }

    const submit = async (e) => {
        e.preventDefault();
        if (email.error || name.error || message.error) {
            return;
        }
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('message', message);
        const response = await Axios.post(url, data);
        setsuccess(response.status === 200);
    }

    return (
        <div>
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
                    <TextareaAutosize className={classes.textArea} aria-label="minimum height" rowsMin={3} placeholder="Message" onChange={validateAndSetMessage}/>
                    {message.value.length < 10 ? <span className={classes.messageLength}>{message.value.length}</span> : ''}
                </FormControl>
                </div>
                <div>
                    <div className={classes.submit}>
                        <span className={cls(classes.success, success ? '' : classes.hidden)}>Your message has been sent. I will contact you ✔️</span>      
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
            
        </div>
    )
}
