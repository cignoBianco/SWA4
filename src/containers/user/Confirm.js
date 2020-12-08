/*
params.code
activate/code
*/
import React, { useState, createRef } from 'react'
import axios from 'axios'

const Confirm = ({ match }) => {
    const params = match.params
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api/"
    axios.get(apiLink + "activate/" + params.code)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    return (
        <h1>Your email is activated</h1>
    )
}

export default Confirm