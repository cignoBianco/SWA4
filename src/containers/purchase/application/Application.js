import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button } from 'antd'
import axios from 'axios'
const { Meta } = Card

const Application = ({match}) => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api"
    const getPath = '/purchases/'
    const params = match.params
    const token = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    const sub = localStorage.getItem('sub')

    const [thisUser, setThisUser] = useState('');

   /* useEffect(() => {
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
      }, []);*/


    let link = "/purchases/" + params.id + '/applications'


    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + getPath + params.id + "/applications/" + params.appId,
            {
             headers: { Authorization: `Bearer ${token}` }
              
            })
           .then(function (response) {
             console.log(response.data);
             let dat = response.data
             let result = []
             /*dat.map(res => {
                 let item;
                 let link = "/purchases/" + res.purchaseId + '/accreditation'
                 console.log(res, 'res')
                
                 item = {
                    name: <a href={link}>{res.name}</a>,
                    individual: res.individual,
                    firstName: res.firstName,
                    middleName: res.middleName,
                    lastName: res.lastName,
                    orgName: res.orgName,
                    inn: res.inn,
                    description: res.description,
                    publicationDate: res.publicationDate,
                    producerId: res.producerId,
                    price: res.price,
                    id: res.width,
                    documents: res.documents,
                }
                result.push(item)
             })*/
             //usersSet(result);
             usersSet(dat)
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);


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

                  
                    
                </Card>
            </Col>
               )
            : ''}
        </Row>
        </div>
    </div>
  );
};

export default Application


