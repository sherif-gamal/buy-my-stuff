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
            <div>
            <p>Solve the Captcha to show phone number: {showNumber ? '0404487294' : '04********'} </p>
            <Recaptcha
                sitekey="6Lfp1aUZAAAAADFdjTJymKN70KO5WjaFk8-hfX08"
                verifyCallback={() => setShowNumber(true)}
            />
            
            
            <ContactForm />
            </div>
            
        </Layout>
    )
}
