import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card } from 'antd'
import axios from 'axios'
const { Meta } = Card

const Producer = ({match}) => {

    const [users, usersSet] = useState([])
    const apiLink = "https://gitlab.academy.smw.tom.ru/ssp-oct-2020/antikriptonit/backend/"
    const params = match.params

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + "workers/" + params.id,
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(333, response.data)
             usersSet(response.data);
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
                    style={{ width: 240 }}
                >
                    <h2>{users.lastName} {users.firstName} {users.middleName}
                    </h2>
                    <p>Должность: {users.type}</p>
                    <p>Логин: {users.login}</p>

                    
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


