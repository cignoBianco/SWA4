import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, 
    Form, Input, InputNumber, Button } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux';

const { Meta } = Card
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

const GetAccreditation = ({match}) => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api/"
    const params = match.params
    const token = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    const sub = localStorage.getItem('sub')

    const [thisUser, setThisUser] = useState('');
    useEffect(() => {
        async function getAll() {
            await axios.get(apiLink + "producers/" + sub,
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(response.data);
             let dat = response.data
             setThisUser(dat)
             window.location.href="/success-accreditation"
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);

    const onFinish = async (values) => {
        console.log(values);
        await axios.put(apiLink + "producers/" + sub + "/apply",
            {
                phone: values.phone,
                stack: values.stack
            },
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log(response.data.producersList);
             console.log(333, response.data)
             usersSet(response.data);
           })
           .catch(function (error) {
             console.log(error);
           });
      };

  return (
    <div className="contact-wrapper">
        <div style={{textAlign: 'left', padding: '2em 1em'}}>
        <h5 style={{marginBottom:40, textAlign:'left'}}>Подать заявку на аккредитацию</h5>
       <Form {...layout} style={{    width: 400, textAlignLast: 'left'}} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="ФИО"
        
        value="Рязанцев Егор"
        disabled
      >
       <p>Рязанцев Егор</p>
      </Form.Item>
      <Form.Item
        name={['user', 'individual']}
        label="Тип"
        rules={[
          {
            type: 'string',
          },
        ]}
      >
       <p>Физическое лицо</p>
      </Form.Item>
      <Form.Item
        name={['user', 'inn']}
        label="ИНН"
        rules={[
          {
            type: 'number'
          },
        ]}
      >
       <p>78747654933</p>
      </Form.Item>
      <Form.Item name={['user', 'phone']} label="Номер телефона">
        <p>+79526548788</p>
      </Form.Item>
      <Form.Item name={['user', 'stack']} label="Стек технологий">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};

export default GetAccreditation


