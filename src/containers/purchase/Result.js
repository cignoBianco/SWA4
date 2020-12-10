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

                    <p>Победители:{users.winners}</p>
                    <p>Описание:{users.closingDescription}</p>

                    
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


