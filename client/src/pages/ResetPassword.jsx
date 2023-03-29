import React, { useState, useEffect } from 'react'
import { Form, Button, Input,  Typography, message } from "antd";
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import axios from '../axios';

const RegisForm = styled.div`
.Regis{
    height: 100vh;
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
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #FBAB7E;
      background-image: linear-gradient(-135deg,#c850c0,#4158d0);
    overflow: hidden;
}
.Regis-header{
    height:80vh;
    max-width: 860px;
    width: 100%;
    display:flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 25px 30px;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}
 .Div-img{
    width: 35%;
  }
  .Img{
    max-width: 100%;
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
    background-color: #bd59d4;
    &:hover{
     background-color: #4b2354;
       box-shadow: 0 10px 30px 0 rgb(189 89 212 / 80%);
    }
}`;



function ResetPassword() {
  const [form] = Form.useForm();
  let password = Form.useWatch('password', form);
  const {token} = useParams()
  let verify_password = Form.useWatch('confirmPassword', form);
  const navigate = useNavigate()

  //message cua register
  const success = () => {
    message.success({
      content: 'Thay đổi thành công ',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
 
 
  const failed400 = () => {
    message.error({
      content: 'Thay đổi mật khẩu không thành công',
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
      console.log(token)
      const response = await axios.post(`/auth/reset-password/${token}`,{   
          password: password 
      })
     
      console.log(response)
        success();
      setTimeout(() => { navigate('/login', { replace: true }); }, 1000);
    } catch(error){

     
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
            <div className="Div-img">
              <img
                className="Img"
                src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
              />
            </div>
            <Form
              className="px-6 w-[60%]"
              form={form}
              autoComplete="off"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              onFinish={onFinish}
              onFinishFailed={(error) => {
                console.log({ error });
              }}
            >
              <div className="flex justify-center items-center mb-3 ">
                <div className="py-[7px] px-12 ml-[50px] bg-gray-400  text-base font-semibold border-r-[1px] rounded-tl-md rounded-bl-md cursor-pointer">
                  SIGN UP
                </div>
                <div className="py-[7px] px-12   bg-gray-200 text-base font-semibold rounded-tr-md rounded-br-md cursor-pointer">
                  <Link to="/login">SIGN IN</Link>
                </div>
              </div>
              <div className="flex justify-start items-center mb-4 flex-col">
                <div className="ml-[50px] text-3xl font-bold text-left">
                  Reset password
                </div>
              </div>

              <Form.Item
                name="password"
                label="Password"
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
                label="Confirm password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không khớp",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Mật khẩu không khớp");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Xác nhận mật khẩu" />
              </Form.Item>

            {/*   <Form.Item wrapperCol={{ span: 24 }}>
                <div className="sign">
                  You already have a account?
                  <Link to="/login" className="font-semibold text-blue-700 ml-1">
                    Sign In
                  </Link>
                </div>
              </Form.Item> */}

              <div className="flex justify-end mt-[-18px]">
                <ButtonContainer className="w-[312px]     ">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    className="w-[100%]     "
                  >
                   Change password
                  </Button>
                </ButtonContainer>
              </div>
            </Form>
          </div>
        </div>
      </RegisForm>
    </div>
  );
}

export default ResetPassword;