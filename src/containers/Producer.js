import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button } from 'antd'
import axios from 'axios'
const { Meta } = Card

const Producer = ({match}) => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api/"
    const params = match.params
    const token = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    const sub = localStorage.getItem('sub')

    const [thisUser, setThisUser] = useState('');
    useEffect(() => {
        async function getAll() {
            await axios.get(apiLink + "producers/" + sub,
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(response.data);
             let dat = response.data
             setThisUser(dat)
             
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + "producers/" + params.id,
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(response.data.producersList);
             console.log(333, response.data)
             usersSet(response.data);
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);

      /*
      /producers/{id}/accreditation
      */
     async function accreditate() {
        await axios.put(apiLink + "producers/" + params.id + "/accreditation",
        {
            "accreditation": true
        },
        {
         headers: { Authorization: `Bearer ${token}` }
        })
       .then(function (response) {
         console.log(response.data);
         let dat = response.data
         window.location.href="/"
         
       })
       .catch(function (error) {
         console.log(error);
       });
      
    }

    async function block1() {
        await axios.put(apiLink + "producers/" + params.id + "/block",
        {
         headers: { Authorization: `Bearer ${token}` }
        })
       .then(function (response) {
         console.log(response.data);
         let dat = response.data
         window.location.href="/"
         
       })
       .catch(function (error) {
         console.log(error);
       });
      
    }


  return (
    <div className="contact-wrapper">
        <div>
           <Row gutter={16} style={{textAlign: '-webkit-center', marginTop: 30}}>
           {users ? 
               (
            <Col span={8}>
                <Card
                    hoverable
                    style={{ width: 640, textAlign: 'left' }}
                ><br/>
                    <h2>{users.orgName} {users.lastName} {users.firstName} {users.middleName}
                    </h2>
                    <p>ИНН: {users.inn}</p>
                    <p>{users.accreditation}</p>
                    <p>{users.phone}</p>
          
                    <p>Дата регистрации: <i>{users.registrationDate}</i> </p>
                    <p> {users.individual ? 'Физическое лицо' : 'Юридическое лицо'}</p>
                    <p>{users.accreditated ? 'Акрредитован' : "Неаккредитован"}</p>  
                    <p>{users.stack}</p>
                    <p>{users.quantity ? 'Количество персонала: ' + users.quantity : ''}</p>
                    <p>{users.activity}</p>

                    {(role === "ADMIN" || role === "LAWYER") ? 
                    <><br/>
                    <Button style={{ width: 160 }} type="primary" onClick={() => accreditate()}>Аккредитовать</Button><br/><br/>
                    <Button style={{ width: 160 }} type="primary" onclick={() => block1()}>Добавить в ЧС</Button>
                    </> : <></>}
                    
                </Card>
            </Col>
               )
            : ''}
        </Row>
        </div>
    </div>
  );
};

export default Producer


