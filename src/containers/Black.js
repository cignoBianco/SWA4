import React, { useState, useEffect } from 'react'
import { Tag, Row, Col, Statistic, Card, Button, Form, Input, InputNumber,
  DatePicker, Space  } from 'antd'
import axios from 'axios'
const { Meta } = Card

const Producer = ({match}) => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api/"
    const params = match.params
    const token = localStorage.getItem('user')
    const role = localStorage.getItem('role')
    const sub = localStorage.getItem('sub')

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

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
             
           })
           .catch(function (error) {
             console.log(error);
           });
          
        }
    
        getAll()
      }, []);

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + "producers/" + params.id,
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
          
        }
    
        getAll()
      }, []);

      /*
      /producers/{id}/accreditation
      */
     async function accreditate() {
        await axios.put(apiLink + "producers/" + params.id + "/unblock",
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
    const getPath = '/purchases/'

      const onFinish = async (values) => {
    console.log(333, values);
    let json = values.purchase
    let st = values['range-picker'][0]["_d"]
    let d = st.toISOString()
    d = d.substring(0,10)
    d = new Date(d)
    let cd = d.getDate()+'-'+d.getMonth()+'-'+d.getYear()
   
let st2 = values['range-picker'][1]["_d"]
let d2 = st2.toISOString()
d2 = d2.substring(0,10)
d2 = new Date(d)
let cd2 = d.getDate()+'-'+d.getMonth()+'-'+d.getYear()    

let tempStack = []
tempStack.push(json.stack)
json['stack'] = tempStack

    console.log(cd, cd2)
    json['startDate'] = cd
    json['finishDate'] = cd2
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
                    <h2>{users.orgName} {users.lastName} {users.firstName} {users.middleName}
                    </h2>
                    <p>ИНН: {users.inn}</p>
                    <p>Дата регистрации: {users.accreditation}</p>
                    <p> {users.individual ? 'Физическое лицо' : 'Юридическое лицо'}</p>
                     
                   <i>{users.registrationDate}</i> 
                    {(role === "ADMIN" || role === "LAWYER") ? 
                    <>
                     <Form {...layout} name="nest-messages" onFinish={onFinish} >
      
      <Form.Item
        name={[ 'bloackComment']}
        label="Описание"
        rules={[
          {
            required: true
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
     
    </Form>
                    <Button type="primary" onClick={() => accreditate()}>Убрать из ЧС</Button>
                    </> : <></>}
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


