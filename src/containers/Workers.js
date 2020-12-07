import React, { useState, useEffect, useMemo } from 'react'
import { Tag, Row, Col, Statistic, Card,
    Table, Button, Space } from 'antd'
import axios from 'axios'
import { 
    TwitterOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    LinkedinOutlined,
    LikeOutlined
} from '@ant-design/icons'
import "./producers.css";
import { MDBDataTable } from 'mdbreact';

const Workers = () => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api"

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + "workers",
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(response.data.producersList);
             let dat = response.data.producersList
             let result = []
             dat.map(res => {
                 let item;
                 let link = "/workers/" + res.id
                
                    item = {
                        name: <a href={link}>res.lastName res.firstName res.middleName</a>,
                        type: res.type,
                        login: res.login
                    }
                
                result.push(item)
             })
             usersSet(result);
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);
/*
fio or name
inn
date
isaccreditated

*/
/*
name
inn
registrationDate
accreditation
*/
  const data = {
    columns: [
      {
        label: 'ФИО',
        field: 'name',
        sort: 'asc',
        width: 300
        
      },
      {
        label: 'Должность',
        field: 'type',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Логин',
        field: 'login',
        sort: 'asc',
        width: 270
      }
    ],
    rows: users
  };

  return (
    <MDBDataTable
      striped
      bordered
      data={data}
    />
  );
}

export default Workers;


