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

const Producers = () => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api/"

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + "producers",
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(response.data.producersList);
             let dat = response.data.producersList
             let result = []
             dat.map(res => {
                 let item;
                 let link = "/producers/" + res.producerId
                if (res.orgName) {
                    item = {
                        name: <a href={link}>res.orgName</a>,
                        inn: res.inn,
                        registrationDate: res.registrationDate,
                        accreditation: res.accreditation
                    }
                } else {
                    item = {
                        name: <a  href={link}>{res.lastName} {res.firstName} {res.middleName}</a>,
                        inn: res.inn,
                        registrationDate: res.registrationDate,
                        accreditation: res.accreditation
                    }
                }
                item.individual = (res.individual) ? 'физическое лицо' : "юридическое лицо"
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
        label: 'ФИО или название',
        field: 'name',
        sort: 'asc',
        width: 300
        
      },
      {
        label: 'ИНН',
        field: 'inn',
        sort: 'asc',
        width: 270
      },
      {
        label: 'ФЛ/ЮЛ',
        field: 'individual',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Дата регистрации',
        field: 'registrationDate',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Аккредитован',
        field: 'accreditation',
        sort: 'asc',
        width: 100
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

export default Producers;


