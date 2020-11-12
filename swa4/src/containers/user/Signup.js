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

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);

const Signup = () => {

  const [visible, setVisible] = useState(0);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    localStorage.setItem('user', Date.now());
    setVisible(0);
    window.location.href='/';
  };

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
        <Button type="primary" onClick={() => setVisible(1)}>
          <PlusOutlined /> signup 
        </Button>
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
                form={form}
                name="register"
                onFinish={onFinish}
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
                      message: 'Please input your name!',
                      whitespace: true
                    },
                  ]}
                >
                  <Input  pattern="^[A-Za-zА-Яа-я][A-Za-zА-Яа-я-]+$" type="text" 
                  title="Only letters"
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
                      message: 'Please input your sirname!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input   pattern="^[A-Za-zА-Яа-я][A-Za-zА-Яа-я-]+$" type="text" 
                  title="Only letters"
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
                      message: 'Please input your patronyme!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input   pattern="^[A-Za-zА-Яа-я-]+$" type="text" 
                  title="Only letters or '-'" maxlength="40" />
                </Form.Item>
                <Form.Item
                  name="inn2"
                  label={
                    <span>
                      ИНН&nbsp;
                      <Tooltip title="Должен состоять из 10 цифр для юридических лиц и 12 цифр — для физических">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please input your inn!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input type="number" min="100000000000" max="999999999999" />
                </Form.Item>
                </>
                :
                <>
                <Form.Item
                  name="organization"
                  label={
                    <span>
                      Наименование
                      <Tooltip title="Наименование организации согласно ЕГРЮЛ">
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please input your organization name!',
                      whitespace: true,
                    },
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
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Please input your inn!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input type="number" min="1000000000"  max="9999999999" />
                </Form.Item>
                </>
            }
               
               

                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your E-mail!',
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
                      message: 'Please input your phone number!',
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
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password minlength="6"
                  pattern="^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])[0-9a-zа-яА-ЯA-Z]{6,}$"
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
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),
                  ]}
                >
                  <Input.Password minlength="6"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$" 
                  title="Минимум 6 символов, минимум 1 символ в верхнем регистре, минимум 1 символ у нижнем регистре, минимум 1 цифра" />
                </Form.Item>

                

                

                <Form.Item label="Капча">      
                      <Button onClick={()=>{toggleCaptcha(1)}}>Я не робот</Button>
                    <br/><p style={{color: 'red'}}>{captchaMessage}</p>
                </Form.Item>
                { getCaptcha ?
                <form onSubmit={captchaSubmit}
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
                        value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                    },
                  ]}
                  {...tailFormItemLayout}
                >
                  <Checkbox>
                    Согласен с <a href="https://docs.google.com/document/d/1L_Bjwo1HSzgrx70EDFB-Pai9YqC51kkuA_tFbZdpAKs/edit">обработкой персональных данных</a>
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
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
                  onFinish={onFinish}
                  width="250px"
              >
                  <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                >
                  <Input pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" title="not valid email" />
                </Form.Item>
                  <Form.Item
                      name="password"
                      rules={[
                      {
                          required: true,
                          message: 'Please input your Password!',
                      },
                      ]}
                  >
                      <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Пароль"
                      minlength="6"
                      title="Минимум 6 символов"
                      />
                  </Form.Item>
                  <Form.Item>
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Запомнить меня</Checkbox>
                      </Form.Item>

                      <a className="login-form-forgot" href="">
                      Забыли пароль
                      </a>
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" htmlType="submit" className="login-form-button">
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