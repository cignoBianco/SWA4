import React, { useState, createRef } from 'react'
import {  Layout, Tabs, Typography, Drawer, Form, 
  Button, Col, Row, Input, Select, DatePicker, Checkbox,
  Tooltip, AutoComplete, Cascader, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {  PlusOutlined, UserOutlined, LockOutlined,
  EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined } from '@ant-design/icons'
import { StickyContainer, Sticky } from 'react-sticky';
import Captcha from "react-numeric-captcha";
import "./captcha.css";
import Fingerprint from './../../components/FIngerprint.js'
import axios from 'axios'
import jwt from 'jwt-decode'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const { Content, Footer } = Layout;
const { TabPane } = Tabs;


const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api/";
const signup = (data) => {
  const body = JSON.stringify('{ "login": "user@mail.com","password": "12345","orgName": "ООО СофтСофтСофт","innNumber": "0123123123123","phoneNumber": 8005553535}')
  axios.post(apiLink + "register/entity", body)
  .then(function (response) {
    console.log(response);
    window.location.href='/';
  })
  .catch(function (error) {
    console.log(error);
  });
}

const getall = () => {
  const token = localStorage.getItem('user')
   axios.get(apiLink + "producers",
   {
    headers: { Authorization: `Bearer ${token}` }
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}


const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);

const Signup = () => {

  const [visible, setVisible] = useState(0);
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    getall()
    await signup1(values)
   // localStorage.setItem('user', Date.now());
    //setVisible(0);
    
  };

  const onFinishLogin = async (values) => {
    console.log('Received values of form: ', values)
    await signin(values)
   // localStorage.setItem('user', Date.now());
    //setVisible(0);
    
  };

  const signup1 = (data = 0) => {
    const body = '{ "login": "user@mail.com","password": "12345","orgName": "ООО СофтСофтСофт","innNumber": "0123123123123","phoneNumber": 8005553535}'
    console.log(1, data)
    axios.post(apiLink + "register/entity", { 
      "login": data.email,
      "password": data.password,
      "orgName": data.organization,
      "innNumber": data.inn,
      "phoneNumber": data.phone
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const [fing, setFing] = useState(0);

  const signin = (data = 0) => {
    
    const fingerprint = Fingerprint().then((data)=>setFing(data))
    console.log("fingerprint:")
    console.log(fingerprint)
    axios.post(apiLink + "auth", { 
      "login": data.email,
      "password": data.password,
      "fingerprint": fing
  })
    .then(function (response) {
      console.log(response.accessToken, response);
      localStorage.setItem('user', response.data.accessToken)
      const toke = jwt(response.data.accessToken); // decode your token here
      console.log("toke: ", toke)
      localStorage.setItem('role', toke.role);
      localStorage.setItem('sub', toke.sub);
      //getall()
      window.location.href='/';
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onSubmit = data => console.log(data);

  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="7">+7</Option>
        <Option value="375">+375</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const [person, setPerson] = useState(0)

  const [getCaptcha, toggleCaptcha] = useState(0)
  const [ captchaDone, setCaptchaDone ] = useState(0)
  let captcha = createRef();
  let [captchaMessage, setCaptchaMessage] = useState('');
  const captchaSubmit = e => {
    
    //e.preventDefault();
    if (captchaDone) {
      setCaptchaMessage("Form submitted ")
      toggleCaptcha(0)
    } else {
      setCaptchaMessage("Wrong captcha! Try again. ")
      console.log('wrong')
    }

    
  };

    return (
      <>
        <span onClick={() => setVisible(1)}>
           Вход
        </span>
        <Drawer
          //title="Create a new account"
          width={'max-content'}
          onClose={ () => setVisible(0)}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
            </div>
          }
        >
          <StickyContainer>
            <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} style={{width: 500}}>
              <TabPane tab="Регистрация" key="1" >
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                name="Зарегистрироваться"
                onFinish={onFinish}
                onSubmit={onSubmit}
                initialValues={{
                  prefix: '7',
                }}
                scrollToFirstError
              >
            <Form.Item style={{
                    display: 'flex',
                    justifyContent: 'center'
            }}>
            <Radio.Group value={person}>
                <Radio value={0} onClick={() => setPerson(0)}>Юридическое лицо</Radio>
                <Radio value={1} onClick={() => setPerson(1)}>Физическое лицо</Radio>
            </Radio.Group>
            </Form.Item>
            {
                person ?
                <>
                <Form.Item
                  name="name"
                  label={
                    <span>
                      Фамилия
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Введите фамилию!',
                      whitespace: true
                    },
                    {
                      pattern:"^[A-Za-zА-Яа-я][A-Za-zА-Яа-я-]+$",
                      message: 'Фамилия должна состоять только из латинских и кириллических символов',
                      whitespace: true
                    }
                  ]}
                >
                  <Input type="text" 
                  title="Только буквы"
                  maxlength="40"/>
                </Form.Item>

                <Form.Item
                  name="sirname"
                  label={
                    <span>
                      Имя
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Введите имя!',
                      whitespace: true,
                    },
                    ,
                    {
                      pattern:"^[A-Za-zА-Яа-я][A-Za-zА-Яа-я-]+$",
                      message: 'Имя должно состоять только из латинских и кириллических символов',
                      whitespace: true
                    }
                  ]}
                >
                  <Input type="text" 
                  maxlength="40"
                  />
                </Form.Item>

                <Form.Item
                  name="patronyme"
                  label={
                    <span>
                      Отчество
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Введите отчество или "-"',
                      whitespace: true,
                    },
                    {
                      pattern:"^[A-Za-zА-Яа-я-]+$",
                      message: 'Отчество должно состоять только из латинских и кириллических символов'
                    }
                  ]}
                >
                  <Input type="text" maxlength="40" />
                </Form.Item>
                <Form.Item
                  name="inn2"
                  label={
                    <span>
                      ИНН
                      <Tooltip  placement="bottom"  placement="bottomRight"
                       title="Должен состоять из 10 цифр для юридических лиц и 12 цифр — для физических">
                        <QuestionCircleOutlined  style={{
                         
                          marginLeft: '.5em',
                          clear: 'both', whiteSpace: 'nowrap'}}/>
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Пожалуйста, введите ИНН',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input type="string" maxlength="12" minLength="12" />
                </Form.Item>
                </>
                :
                <>
                <Form.Item
                  name="organization"
                  label={
                    <span>
                      <span>Наименование</span>
                      <Tooltip title="Наименование организации согласно ЕГРЮЛ">
                        <QuestionCircleOutlined style={{
                          verticalAlign: 'middle',
                          marginLeft: '.5em'}}/>
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Введите наименование организации',
                      whitespace: true,
                    },
                    {
                      max: 200,
                      message: 'Максимальное число символов — 200',
                      whitespace: true,
                    },
                    {
                      pattern:"^[A-Za-zА-Яа-я][A-Za-zА-Яа-я-]+$",
                      message: 'Наименование должно состоять только из латинских и кириллических символов',
                      whitespace: true
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="inn"
                  label={
                    <span>
                      ИНН&nbsp;
                      <Tooltip title="Должен состоять из 10 цифр для юридических лиц и 12 цифр — для физических">
                        <QuestionCircleOutlined  style={{
                          verticalAlign: 'middle',
                          marginLeft: '.5em'}}/>
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Введите ИНН',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input type="string" maxlength="10" minLength="10" />
                </Form.Item>
                </>
            }
              
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: true,
                      message: 'Введите email!',
                    },
                  ]}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                >
                  <Input pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="not valid email"/>
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Номер телефона"
                  rules={[
                    {
                      required: false,
                      message: 'Введите номер телефона!',
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    maxLength="10"
                    minLength="10"
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Пароль"
                  rules={[
                    {
                      required: true,
                      message: 'Введите пароль!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password minLength="6"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$"
                  title="Минимум 6 символов, минимум 1 символ в верхнем регистре, минимум 1 символ у нижнем регистре, минимум 1 цифра"
                   />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Повторите пароль"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Повторите пароль!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('Пароли не совпадают!');
                      },
                    }),
                  ]}
                >
                  <Input.Password minLength="6"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$" 
                  title="Минимум 6 символов, минимум 1 символ в верхнем регистре, минимум 1 символ у нижнем регистре, минимум 1 цифра" />
                </Form.Item>

                <Form.Item label="Капча">      
                      <Button onClick={()=>{toggleCaptcha(1)}}>Я не робот</Button>
                    <br/><p style={{color: 'red'}}>{captchaMessage}</p>
                </Form.Item>
                { getCaptcha ?
                <form
                layout="vertical"
                onSubmit={captchaSubmit}
                  style={{textAlign:'-webkit-center',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 30
                }}
                >
                  <Captcha
                    ref={captcha}
                    onChange={status => {console.log(status);setCaptchaDone(status)}}
                  />
                </form>
                : null  }
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject('Необходимо принять согласие на обработку персональных данных'),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    Согласен с <a href="https://docs.google.com/document/d/1L_Bjwo1HSzgrx70EDFB-Pai9YqC51kkuA_tFbZdpAKs/edit">обработкой персональных данных</a>
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" >
                    Зарегистрироваться
                  </Button>
                </Form.Item>
              </Form>
  
              </TabPane>
              <TabPane tab="Вход" key="2">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                      remember: true,
                  }}
                  onFinish={onFinishLogin}
                  width="250px"
                  layout="vertical"
              >
                  <Form.Item
                  name="email"
                  label="E-mail"
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: 'Введите E-mail!',
                    },
                  ]}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                >
                  <Input pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="not valid email" />
                </Form.Item>
                  <Form.Item
                      name="password"
                      label="Пароль"
                      rules={[
                      {
                          required: true,
                          message: 'Введите пароль!',
                      },
                      ]}
                  >
                      <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Пароль"
                      minLength="6"
                      title="Минимум 6 символов"
                      />
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" htmlType="submit" className="login-form-button" >
                      Войти
                      </Button>
                  </Form.Item>
              </Form>
              </TabPane>
            </Tabs>
          </StickyContainer>
        
        </Drawer>
      </>
    );
}

export default Signup