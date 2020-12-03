import React, { useState, useEffect, useMemo } from 'react'
import {  Layout, Tabs, Typography, Drawer, Form, 
  Button, Col, Row, Input, Select, DatePicker, Checkbox,
  Tooltip, AutoComplete, Cascader, Radio } from 'antd';
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

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const Producers = () => {

    const [users, usersSet] = useState([])
    const apiLink = "https://anti-criptonit-outsourcing.herokuapp.com/api/"
    
    const [form] = Form.useForm();

    const [accreditated, setAccreditated] = useState("ALL")
    const [individuals, setIndividuals] = useState('ALL')

    useEffect(() => {
        async function getAll() {
            const token = localStorage.getItem('user')
            await axios.get(apiLink + "producers",
            {
             headers: { Authorization: `Bearer ${token}` },
             
                params: {
                  state: 'OVERALL'
                }
              
            })
           .then(function (response) {
             console.log(response.data.producersList);
             let dat = response.data.producersList
             let result = []
             dat.map(res => {
                 let item;
                 let link = "/producers/" + res.producerId
                 console.log(res, 'res')
                if (res.organizationName) {
                    console.log(res.organizationName)
                    item = {
                        name: <a href={link}>{res.organizationName}</a>,
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

      const accreditatedUsers = users.filter(user => user.accreditation === 'accredited');
      const notAccreditatedUsers = users.filter(user => !user.accreditation === 'accredited');
      const individualUsers = users.filter(user => user.individual);
      const notIndividualUsers = users.filter(user => !user.individual);
      const accreditatedAndIndividualUsers = users.filter(user => user.individual && user.accreditated === 'accredited');
      const notAccreditatedAndIndividualUsers = users.filter(user => !user.individual && !user.accreditation === 'accredited');

      const cols = [
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
          label: 'Стек технологий',
          field: 'stack',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Сфера деятельности',
          field: 'activity',
          sort: 'asc',
          width: 120
        },
        {
          label: 'Численность',
          field: 'size',
          sort: 'asc',
          width: 80
        },
        {
          label: 'Дата регистрации',
          field: 'registrationDate',
          sort: 'asc',
          width: 70
        },
        {
          label: 'Аккредитован',
          field: 'accreditation',
          sort: 'asc',
          width: 30
        }
      ]
  const data = (individuals === 'ALL' && accreditated === 'ALL') ? {
    columns: cols,
    rows: users
  } : (individuals === 'true' && accreditated === 'ALL') ? {
    columns: cols,
    rows: individualUsers
  } : (accreditated === 'true' && individuals === 'ALL') ? {
    columns: cols,
    rows: accreditatedUsers
  } : (accreditated === 'false' && individuals != 'false') ? {
    columns: cols,
    rows: notAccreditatedUsers
  } : (individuals === 'false' && accreditatedUsers != 'false') ? {
    columns: cols,
    rows: notIndividualUsers
  } : (individuals === 'true' && accreditatedUsers === 'true') ? {
    columns: cols,
    rows: notAccreditatedAndIndividualUsers
  } : {
    columns: cols,
    rows: notAccreditatedAndIndividualUsers
  };

  return (
    <>
    <h2>Список поставщиков</h2>
    <Form
      layout="vertical"
      form={form}
      name="Отфильтровать"
    >
    <Form.Item
      name="agreement"
      valuePropName="checked"
    >
      <Checkbox>
        ЮЛ
      </Checkbox>
      <Checkbox>
        ФЛ
      </Checkbox>
      <Checkbox>
        Все
      </Checkbox>
    </Form.Item>

    <Form.Item
      name="agreement"
      valuePropName="checked"
    >
      <Checkbox>
        Аккредитованные
      </Checkbox>
      <Checkbox>
        Неаккредитованные
      </Checkbox>
      <Checkbox>
        Все
      </Checkbox>
    </Form.Item>
    </Form>
    <MDBDataTable
      striped
      bordered
      responsive
      data={data}
      paginationLabel={['Предыдущая', 'Следующая']}
      entriesLabel={'Поставщиков на странице'}
      searchLabel={"Поиск"}
      noRecordsFoundLabel={"Нет ни одного поставщика"}
    />
    </>
  );
}

export default Producers;


