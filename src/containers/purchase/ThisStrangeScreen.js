import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'antd';
import { useSSR } from 'react-i18next';

const Home = () => {

    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api"
    const getPath = '/purchases'

    const [purchaseData, setPurchaseData] = useState('');

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + getPath,
            {
             headers: { Authorization: `Bearer ${token}` },
             
                params: {
                  state: 'OVERALL'
                }
              
            })
           .then(function (response) {
             console.log(response.data);
             let dat = response.data
             let result = []
             let i = 1
             dat.map(res => {
                 let item;
                 let link = "/purchase/" + res.purchaseId
                 console.log(res, 'res')
                
                 item = {
                    name: <a href={link}>{res.name}</a>,
                    currency: res.currency,
                    description: res.description,
                    publicationDate: res.publicationDate,
                    number: res.number,
                    purchaseId: res.purchaseId,
                    stack: res.stack,
                    startDate: res.startDate,
                    status: res.status,
                    finishDate: res.finishDate,
                    closingDate: res.closingDate,
                    startingPrice: res.startingPrice,
                    key: i++
                }
                result.push(item)
             })
             //usersSet(result);
             setPurchaseData(result)
             /*
             const data = [
                {
                key: '1',
                name: 'John Brown',
                age: 32,
                stack: 'cpp',
                address: 'New York No. 1 Lake Park',
                },
                {
                key: '2',
                name: 'Jim Green',
                age: 42,
                stack: 'javascript',
                address: 'London No. 1 Lake Park',
                },
            ];
             */
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);




const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
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
        title: 'Статус',
        dataIndex: 'status',
  
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        sorter: (a, b) => a.status.length - b.status.length,
        sortDirections: ['descend'],
    },
    {
      title: 'Стартовая цена',
      dataIndex: 'startingPrice',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.startingPrice - b.startingPrice,
    },
    {
        title: 'Дата начала подачи заявок',
        dataIndex: 'startDate',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.startDate - b.startDate,
      },
      {
        title: 'Дата окончания подачи заявок',
        dataIndex: 'finishDate',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.finishDate - b.finishDate,
      },
      {
        title: 'Дата публикации',
        dataIndex: 'publicationDate',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.publicationDate - b.publicationDate,
      },
    {
        title: 'Stack',
        dataIndex: 'stack',
        filters: [
          {
            text: 'C++',
            value: 'cpp',
          },
          {
            text: 'CSS',
            value: 'css',
          },
          {
            text: 'JavaScript',
            value: 'javascript',
          },
          {
            text: 'PHP',
            value: 'php',
          },
          {
            text: 'MySQL',
            value: 'mysql',
          },
          {
            text: 'C#',
            value: 'csharp',
          },
          {
            text: 'Java',
            value: 'java',
            children: [
              {
                text: 'Spring',
                value: 'spring',
              },
              {
                text: 'JBehave',
                value: 'jbehave',
              },
            ],
          },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        /*
    currency: "RUB"
    number: 1
    purchaseId: "86d9715a-a990-45ae-9afc-524ed0b1637e"
 */
        onFilter: (value, record) => record.stack.indexOf(value) === 0,
        sorter: (a, b) => a.stack.length - b.stack.length,
        sortDirections: ['descend'],
      },
    
  ];
      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }

    return (<>
        <h2>Закупки</h2>
        <div className="flexToCenter">
           <Table columns={columns} dataSource={purchaseData} onChange={onChange} className="purchasesTable" />
        </div>
    </>)
}

export default Home

