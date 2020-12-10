import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button, Form, Input, InputNumber,
DatePicker, Space  } from 'antd'
import axios from 'axios'
const { Meta } = Card

const Application = ({match}) => {

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api"
    const getPath = '/purchases/'
    const params = match.params
    const token = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    const sub = localStorage.getItem('sub')

    const [thisUser, setThisUser] = useState('');
    useEffect(() => {
        async function getUser() {
            await axios.get(apiLink + "producers/" + sub,
            {
             headers: { Authorization: `Bearer ${token}` }
            })
           .then(function (response) {
             console.log('u',response.data);
             let dat = response.data
             setThisUser(dat)
             
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getUser()
      }, []);


    let link = "/purchases/" + params.id + '/applications'

    const onFinish = async (values) => {
        console.log(values);
        let json = values.purchase
        json['name'] = thisUser.name || this.orgName
        //json['finishDate'] = values['range-picker'][1]["_d"]
        console.log("json", json)
        const token = localStorage.getItem('user')
                await axios.post(apiLink + link ,
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

  return (
    <><br/>
    <h2>Подать заявку</h2><br/>
    <div className="flexToCenter">

    <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <p>ФИО / Название организации: {thisUser.organizationName || thisUser.name}</p>
        <p>{thisUser.individual ? 'Физическое лицо' : "Юридическое лицо"}</p>
        <p>ИНН: {thisUser.inn}</p>
        <p>Телефон: {thisUser.phone}</p>
        <p>Технологический стек: {thisUser.stack}</p>
      <Form.Item
        name={['purchase', 'description']}
        label="Описание"
        
        rules={[
          {
            required: true,
            message: "Требуется описание заявки"
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
   
      <Form.Item
        name={['purchase', 'price']}
        label="Цена"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 999999999,
            required: true,
            message: 'Заполните поле!'
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Подать заявку
        </Button>
      </Form.Item>
    </Form>

    </div></>
  );
};

export default Application


