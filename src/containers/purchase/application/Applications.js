import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button } from 'antd'
import axios from 'axios'
import { Table } from 'antd';
const { Meta } = Card

const Applications = ({match}) => {

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
            await axios.get(apiLink + getPath + params.id + "/accreditation", //+ params.appId,
            
            {
             headers: { Authorization: `Bearer ${token}` }
            ,
            params:{
                kind: 'ALL'
            }})
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

    async function finishThis() {
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

    async function hide() {
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


    const [purchaseData, setPurchaseData] = useState('');

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + getPath + params.id + "/applications",
            {
             headers: { Authorization: `Bearer ${token}` },
             
                params: {
                  kind: 'ALL'
                }
              
            })
           .then(function (response) {
             console.log(response.data);
             let dat = response.data
             let result = []
             dat.map(res => {
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
             })
             //usersSet(result);
             setPurchaseData(result)
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);




const columns = [
    {
      title: 'Фамилия',
      dataIndex: 'lastName',

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.lastName.indexOf(value) === 0,
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortDirections: ['descend'],
    },
    {
        title: 'Имя',
        dataIndex: 'firstName',
  
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.firstName.indexOf(value) === 0,
        sorter: (a, b) => a.firstName.length - b.firstName.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Отчество',
        dataIndex: 'middleName',
  
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.middleName.indexOf(value) === 0,
        sorter: (a, b) => a.middleName.length - b.middleName.length,
        sortDirections: ['descend'],
      },
    {
        title: 'Описание',
        dataIndex: 'description',
  
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.description.indexOf(value) === 0,
        sorter: (a, b) => a.description.length - b.description.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Организация',
        dataIndex: 'orgName',
  
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.orgName.indexOf(value) === 0,
        sorter: (a, b) => a.orgName.length - b.orgName.length,
        sortDirections: ['descend'],
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
      {
        title: 'Дата публикации',
        dataIndex: 'publicationDate',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.publicationDate - b.publicationDate,
      }
    ,
    
  ];
      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }



  return (
    <>
        <h2>Заявки на закупку</h2>
        <div className="flexToCenter">
           <Table columns={columns} dataSource={purchaseData} onChange={onChange} className="purchasesTable" />
        </div>
    </>
  );
};

export default Applications


