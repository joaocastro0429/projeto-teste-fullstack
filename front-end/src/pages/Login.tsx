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
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4444/login', {
        email: values.email,
        password: values.password
      });

      localStorage.setItem('authToken', response.data.token);
      message.success('Login realizado com sucesso!');
      navigate('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error('Erro ao fazer login. Verifique suas credenciais.');
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
            Login
          </Title>
          
          <Form
            form={form}
            name="login_form"
            initialValues={{ remember: true }}
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
                prefix={<UserOutlined />} 
                placeholder="Digite seu e-mail" 
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

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
              >
                Entrar
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Link to="/register">
                <Button type="link">Registre-se</Button>
              </Link>
            </div>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export { Login };