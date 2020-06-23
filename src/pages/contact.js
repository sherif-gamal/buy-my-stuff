import React from 'react'
import SEO from '../components/seo';
import ContactForm from '../components/contactForm';
import Layout from '../components/layout';
import Recaptcha from 'react-recaptcha';
import { useState } from 'react';


export default function Contact() {
    const [showNumber, setShowNumber] = useState(false);
    return (
        <Layout>
            <SEO title="Contact me" />
            <div style={{marginTop: 20}}>
            <h4>Solve the Captcha to show phone number or send a message using the form below: {showNumber ? '0404487294' : '04********'} </h4>
            <Recaptcha
                sitekey="6Ldi4aUZAAAAAM5Y6M3smu018e3zTK1c5cRqdqG_"
                verifyCallback={() => setShowNumber(true)}
            />
            <ContactForm />
            </div>
            
        </Layout>
    )
}
