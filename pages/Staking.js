import React, { useEffect, useState } from "react";
import { PageHeader, Card, Button } from "antd";
import { ShoppingCartOutlined, SendOutlined, DollarCircleOutlined  } from "@ant-design/icons";
import { async } from "regenerator-runtime";
import ModalStaking from "../components/ModalStaking";
const { Meta } = Card;

export default function Staking({isSignedIn, contract_id, wallet}) {
    const [stakingVisible, setStakingVisible] = useState(false);
    const [totalStaked, setTotalStaked] = useState(null);

    async function fetchTotalStaked() {
        let data = await contract_id.get("stakingContractId").ft_total_supply()
        setTotalStaked(data);
        console.log("totalStaked: ", data);
    }



    async function submitStaking(amount) {
        await contract_id.get("ftContractId").ft_transfer_call("staking-test12.thanhdevtest.testnet", amount.toString(), "staking");
    }

    useEffect(() => {
        if (isSignedIn) {
            fetchTotalStaked();
        } else {
            wallet.signIn();
        }
    }, [])


    return (
        <div className="site-layout-content">
            <PageHeader
                className="site-page-header"
                title="Staking"
            />

            <div style={{padding: 30, display: "flex", flexWrap: "wrap"}}>
                <div>Total staked: {totalStaked/(10**18)}</div>
                <Button onClick={() => {setStakingVisible(true)}} key="3">Staking</Button>
            </div>
            <ModalStaking visible={stakingVisible} handleOk={submitStaking} handleCancel={() => setStakingVisible(false)}/>
        </div>
    )
}