import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Select, Typography, message, Modal } from "antd";
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import axios from '../axios';

const RegisForm = styled.div`
.Regis{
    height: 150vh;
    display: flex;
    flex-direction:row;
    @media (max-width: 768px) {
      flex-direction: column;
      height: 140vh;
    }
    @media (max-height: 628px) {
      flex-direction: column;
      height: 140vh;
    }
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 50px;
    background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}
.Regis-header{
    max-width: 500px;
    width: 100%;
    background-color: #fff;
    padding: 25px 30px;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.15);
    overflow:auto;
}
.ant-typography{
    font-size: 45px;
    font-weight: 500;
    position: relative;
}
.ant-input-affix-wrapper {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}
.sign{
    text-align:right;
}`
const ButtonContainer = styled.div`
.ant-btn-primary {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #FBAB7E;
    &:hover{
        background-color: #FBAB7E;
        background-image: linear-gradient(250deg, #e3ed1f 0%, #F7CE68 100%);
    }
}`;

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const { Title } = Typography;

function Register() {
  

  const [form] = Form.useForm();
  let email = Form.useWatch('email', form);
  let username = Form.useWatch('username', form);
  let fullname = Form.useWatch('fullname', form);
  let customer_type = Form.useWatch('customer_type', form);
  let password = Form.useWatch('password', form);
  let verify_password = Form.useWatch('confirmPassword', form);
  const history = useHistory()


  //message cua register
  const success = () => {
    message.success({
      content: 'Đăng ký thành công ',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
 
  const existed = () => {
    message.error({
      content: 'Email hoặc số điện thoại đã tồn tại',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: 'Đăng kí không thành công',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed401 = () => {
    message.error({
      content: 'Email đã được đăng ký',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed500 = () => {
    message.error({
      content: 'Lỗi hệ thống,vui lòng đăng ký lại',
      className: 'custom-class',
      style: {
        marginTop: '30vh',
        padding:'20px'
      },
    });
  };
  const onFinish = async () => {    //submit register form
    try{
      const response = await axios.post('/auth/register',{   
          fullname: fullname,
          username: username,
          email: email,
          password: password 
      })
     
      console.log(response)
        success();
        setTimeout(() => { history.push("/") }, 1000);
    } catch(error){
      if(error.response.data.message === "user is exist"){
        existed();
      }
      if(error.message === "Request failed with status code 401") {
        failed401();
      }
      if(error.message === "Request failed with status code 400") {
        failed400();
      }
      if(error.message === "Request failed with status code 500") {
        failed500();
      }
      console.log(error)
    }
  };

  return (
    <div>
      <RegisForm> 
          <div className="Regis">
            <div className="Regis-header">
              <Form
                  form ={form}
                  autoComplete="off"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                  onFinish={(onFinish)}
                  onFinishFailed={(error) => {
                    console.log({ error });
                  } }
              >
                  <Title level={2} className="text-center">
                      Đăng kí
                  </Title>

                  <Form.Item
                      name="fullname"
                      label="Tên đầy đủ"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đầy đủ",
                        },
                        
                      ]}
                      hasFeedback
                  >
                      <Input placeholder="Nhập tên tài khoản" />
                  </Form.Item>
                  <Form.Item
                      name="username"
                      label="Tên tài khoản"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên tài khoản",
                        },
                        
                      ]}
                      hasFeedback
                  >
                      <Input placeholder="Nhập tên tài khoản" />
                  </Form.Item>

                  <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email ",
                        },      
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },       
                                   
                      ]}
                      hasFeedback
                      >
                      <Input placeholder="Nhập email " />
                  </Form.Item>

                  <Form.Item
                      name="password"
                      label="Mật khẩu"
                      rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu",
                          },
                          { 
                            min: 6,
                            message: "Mật khẩu phải dài hơn 6 chữ số",
                          },
                          {
                            max: 24,
                            message: "Mật khẩu chỉ được tối đa 24 chữ số",
                          },
                      ]}
                      hasFeedback
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Mật khẩu không khớp"
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "Mật khẩu không khớp"
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Xác nhận mật khẩu" />
                  </Form.Item>


                  <Form.Item wrapperCol={{ span: 24 }}>
                      <div className='sign'>
                          Bạn đã có tài khoản?  
                          <Link to="/login" className="font-semibold text-blue-700">
                              Đăng nhập
                          </Link>
                      </div>
                  </Form.Item>

                  <Form.Item wrapperCol={{ span: 24 }}>
                      <ButtonContainer>
                          <Button block type="primary" htmlType="submit">
                              Đăng ký
                          </Button>
                      </ButtonContainer>
                  </Form.Item>
              </Form>
            </div>
          </div>
      </RegisForm>
    </div>
  );
}

export default Register;