import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button } from 'antd'
import axios from 'axios'
const { Meta } = Card

const Producer = ({match}) => {

    const [users, usersSet] = useState([])
    const apiLink = "https://gitlab.academy.smw.tom.ru/ssp-oct-2020/antikriptonit/backend/"
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
        await axios.put(apiLink + "producers/" + params.id + "/unblock",
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
                    style={{ width: 240 }}
                >
                    <h2>{users.orgName} {users.lastName} {users.firstName} {users.middleName}
                    </h2>
                    <p>ИНН: {users.inn}</p>
                    <p>Дата регистрации: {users.accreditation}</p>
                    <p> {users.individual ? 'Физическое лицо' : 'Юридическое лицо'}</p>
                     
                   <i>{users.registrationDate}</i> 
                    {(thisUser.role === "ADMIN" || thisUser.role === "LAWYER") ? 
                    <>
                    <Button type="primary" onClick={() => accreditate()}>Убрать из ЧС</Button>
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


