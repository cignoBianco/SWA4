import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button, Form, Input, InputNumber,
DatePicker, Space  } from 'antd'
import axios from 'axios'
const { Meta } = Card
const { RangePicker } = DatePicker;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const WorkerForm = ({match}) => {

    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api"
    const getPath = '/purchases/'

  const onFinish = async (values) => {
    console.log(values);
    let json = values.purchase
    json['startDate'] = values['range-picker'][0]["_d"]
    json['finishDate'] = values['range-picker'][1]["_d"]
    console.log("json", json)
    const token = localStorage.getItem('user')
            await axios.post(apiLink + getPath ,
             json, {
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

  const [users, usersSet] = useState([])
    
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

      const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};


  return (
    <>
    <br/>
    <h2>Создать сотрудника</h2><br/>
    <div className="flexToCenter">

    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['purchase', 'lastName']}
        label="Фамилия"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['purchase', 'firstName']}
        label="Имя"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['purchase', 'middleName']}
        label="Отчество"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['purchase', 'type']}
        label="Роль"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['purchase', 'login']}
        label="Login"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['purchase', 'password']}
        label="Пароль"
        rules={[
          {
            required: true
          }
        ]}
      >
        <Input />
      </Form.Item>
      
   
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Создать сотрудника
        </Button>
      </Form.Item>
    </Form>

    </div></>
  );
};
  

export default WorkerForm