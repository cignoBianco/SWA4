import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button, Form, Input, InputNumber,
  DatePicker, Space  } from 'antd'
import axios from 'axios'
import { Table } from 'antd';
const { Meta } = Card

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const Applications = ({match}) => {

  const [winners, setWinners] = useState('')

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
             let i = 1
             dat.map(res => {
                 let item;
                 let link = "/purchases/" + params.id + '/applications/' + res.id
                 console.log(res, 'res')
                
                 item = {
                    name: <a href={link}>{res.name}</a>,
                    individual: res.individual,
                    firstName: res.firstName,
                    middleName: res.middleName,
                    lastName: res.lastName,
                    orgName: res.orgName,
                    inn: res.inn,
                    description: <a href={link}>{res.description}</a>,
                    publicationDate: res.publicationDate,
                    producerId: res.producerId,
                    price: res.price,
                    id: res.width,
                    documents: res.documents,
                    key: i++
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

      //const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api"
     // const getPath = '/purchases/'
  
    const onFinish = async (values) => {
      console.log(values,winners);
      let json = values
      const token = localStorage.getItem('user')
              await axios.put(apiLink + getPath + params.id,
               
               {
                "status": "CLOSED",
                "winners": winners,
                "closingDesciprtion": values.description,
                "finishDocuments": ["1", "2", "3", "4", "5"]
               } , {
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
    };
/*
{
  "status": "CLOSED",
  "winners": ["123", "125"],
  "closingDesciprtion": "Они красавчики",
  "finishDocuments": ["1", "2", "3", "4", "5"]
} */

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

      

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          let w = []
          selectedRows.forEach(element => {
            w.push(element.producerId) 
          });
          setWinners(selectedRows)
          console.log("new winners", winners)
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };


      const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <>
        <h2>Выбрать победителей и опубликовать результат</h2>
        <div className="flexToCenter">
           <Table columns={columns} dataSource={purchaseData} onChange={onChange}
           rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }} 
           className="purchasesTable" />
        </div>
        <Form {...layout} name="nest-messages" onFinish={onFinish} >
      
      <Form.Item
        name={[ 'description']}
        label="Описание"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
     
   
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
           Опубликовать
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default Applications


