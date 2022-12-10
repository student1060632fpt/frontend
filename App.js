import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import Router from './routes';
import './css/global.css';
import 'antd/dist/antd.css'; 
import { Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;

export default function App({isSignedIn, contract_id, wallet}) {

  const [balanceFt, setBalanceFt] = useState(0);
  const [balanceVeFt, setBalanceVeFt] = useState(0);
  async function fetchBalance(){
    let ft;
    let veFt;
    if (isSignedIn) {
      ft = await contract_id.get("ftContractId").ft_balance_of(wallet.accountId);
      veFt = await contract_id.get("stakingContractId").ft_balance_of(wallet.accountId);
    } else {
      ft = 0;
      veFt = 0;
    }
    
    setBalanceFt(ft);
    setBalanceVeFt(veFt);
  }
  useEffect(() => {
    fetchBalance()
  }, [])
  return (
    <>
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key="/" icon={<VideoCameraOutlined />}>
              <Link to={"/"}> Jobs </Link>
          </Menu.Item>
          <Menu.Item key="/myNFT" icon={<UserOutlined />}>
              <Link to={"/myNFT"}> Profile </Link>
          </Menu.Item>
          <Menu.Item key="/staking" icon={<UserOutlined />}>
              <Link to={"/staking"}> Staking </Link>
          </Menu.Item>
          <Menu.Item key="/voting" icon={<UserOutlined />}>
              <Link to={"/voting"}> Voting </Link>
          </Menu.Item>
          <Menu.Item key="/faucet" icon={<UserOutlined />}>
              <Link to={"/faucet"}> Faucet </Link>
          </Menu.Item>
        </Menu>
        {
          isSignedIn ? 
          <Button onClick={() => {wallet.signOut()}}>
            Logout {wallet.accountId}
          </Button>:
          <Button onClick={() => {wallet.signIn()}}>
            Login with NEAR
          </Button>
        }
        <Button href={'https://testnet.nearblocks.io/address/' + wallet.accountId}>
            PAT: {balanceFt/(10**18)}
        </Button>
        <Button href={'https://testnet.nearblocks.io/address/' + wallet.accountId}>
            vePAT: {balanceVeFt/(10**18)}
        </Button>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 100 }}>
        <Router isSignedIn={isSignedIn} contract_id={contract_id} wallet={wallet} />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Power by Partie Team</Footer>
    </Layout>
    </>
  );
}
