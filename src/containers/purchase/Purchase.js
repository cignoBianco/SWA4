import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button } from 'antd'
import axios from 'axios'
const { Meta } = Card

const Purchase = ({match}) => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api"
    const getPath = '/purchases/'
    const params = match.params
    const token = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    const sub = localStorage.getItem('sub')

    const [thisUser, setThisUser] = useState('');

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + getPath + params.id,
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(response.data);
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
     async function finish() {
        await axios.put(apiLink + "purchases/" + params.id ,
        {
          "status": "CANCELED",
          //"winners": ["123", "125"],
          "closingDesciprtion": "Отменено",
         // "finishDocuments": ["1", "2", "3", "4", "5"]
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

    async function finishThis() {
      await axios.put(apiLink + "purchases/" + params.id ,
      {
        "status": "CANCELED",
        //"winners": ["123", "125"],
        "closingDesciprtion": "Отменено",
       // "finishDocuments": ["1", "2", "3", "4", "5"]
      },
      {
       headers: { Authorization: `Bearer ${token}` }
      })
     .then(function (response) {
       console.log(response.data);
       let dat = response.data
       window.location.href="/purchase/create"
       
     })
     .catch(function (error) {
       console.log(error);
     }); 
    }

    async function hide() {
      await axios.put(apiLink + "purchases/" + params.id ,
      {
        "status": "CANCELED",
        //"winners": ["123", "125"],
        "closingDesciprtion": "Отменено",
       // "finishDocuments": ["1", "2", "3", "4", "5"]
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

    async function view() {
        await axios.get(apiLink + "purchases/" + params.id + "/applications",
        {
         headers: { Authorization: `Bearer ${token}` }
        })
       .then(function (response) {
         console.log(response.data);
         let dat = response.data
        // window.location.href="/" UUU
         
       })
       .catch(function (error) {
         console.log(error);
       }); 
    }

    async function send() {
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
         window.location.href="/applications"
         
       })
       .catch(function (error) {
         console.log(error);
       }); 
    }

    let link = "/purchases/" + params.id + '/applications'
    let linkSend = "/purchase/" + params.id + "/applications"
    let linkAdmin = "/purchase/" + params.id + "/a/result"

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
                    <h2>{users.name} 
                    </h2>
                    <p>: {users.subject}</p>
                    <p>Описание: {users.description}</p>
                    <p>{users.status}</p>
                    <p>Дата создания: <i>{users.publicationDate}</i> </p>
                    
                    <p>Дата начала подачи заявок: <i>{users.startDate}</i> </p>
                    <p>Дата окончания подачи заявок: <i>{users.finishDate}</i> </p>
                    <br/><p>Стэк: {users.stack}</p>
                   
                    <p>
                        Стартовая цена: {users.startingPrice} {users.currency}
                    </p>

                    {(role === "ADMIN" || role === "LAWYER") ? 
                    <><br/>
                    <Button style={{ width: 160 }} type="primary"><a href={linkAdmin}>Выбрать победителей и завершить</a></Button><br/><br/>
                    <Button style={{ width: 160 }} type="primary" onClick={() => finishThis()}>Завершить текущий этап и добавить новый этап</Button><br/><br/>
                    <Button style={{ width: 160 }} type="primary" ><a href={link}>Просмотреть заявки</a></Button><br/><br/>
                    
                    <Button style={{ width: 160 }} type="primary" onClick={() => hide()}>Снять с публикации</Button><br/><br/>
                    </> : <>
                    <Button style={{ width: 160 }} type="primary"><a href={linkSend}>Подать заявку</a></Button><br/><br/>
                    </>} 
                    
                </Card>
            </Col>
               )
            : ''}
        </Row>
        </div>
    </div>
  );
};

export default Purchase


