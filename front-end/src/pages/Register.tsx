import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  message
} from 'antd';
import { 
  MailOutlined, 
  LockOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { 
    email: string; 
    password: string; 
    confirmPassword: string 
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:4444/register', {
        email: values.email,
        password: values.password
      });

      message.success('Registro realizado com sucesso! Redirecionando para login...');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Erro ao registrar. Tente novamente.');
      } else {
        message.error('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <Card
        style={{
          width: 400,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 0 }}>
            Criar Conta
          </Title>
          
          <Form
            form={form}
            name="register_form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { 
                  required: true, 
                  message: 'Por favor insira seu e-mail!' 
                },
                { 
                  type: 'email',
                  message: 'Por favor insira um e-mail válido!'
                }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="seu@email.com" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Senha"
              rules={[
                { 
                  required: true, 
                  message: 'Por favor insira sua senha!' 
                },
                { 
                  min: 6,
                  message: 'A senha deve ter no mínimo 6 caracteres!'
                }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Digite sua senha" 
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirmar Senha"
              dependencies={['password']}
              rules={[
                { 
                  required: true, 
                  message: 'Por favor confirme sua senha!' 
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas não coincidem!'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Confirme sua senha" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
              >
                Registrar
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Link to="/">
                <Button type="link" icon={<ArrowLeftOutlined />}>
                  Já tem uma conta? Faça login
                </Button>
              </Link>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export { Register };