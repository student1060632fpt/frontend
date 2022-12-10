import React, { useEffect, useState } from "react";
import { PageHeader, Card, Button } from "antd";
import { utils } from "near-api-js";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { async } from "regenerator-runtime";
const { Meta } = Card;

export default function Jobs({ isSignedIn, contract_id, wallet }) {
    const [sales, setSales] = useState([]);
    const [balanceFt, setBalanceFt] = useState([]);
    const [balanceVeFt, setBalanceVeFt] = useState([]);



    async function fetchBalance(){
        let balanceFt = await contract_id.get("ftContractId").ft_balance_of("thanhdevtest.testnet");
        let balanceVeFt = await contract_id.get("stakingContractId").ft_balance_of("thanhdevtest.testnet");
        // let balance = await ftContractId.ft_metadata();
        setBalanceFt(balanceFt);
        setBalanceVeFt(balanceVeFt);
        console.log("Balance: ", balanceFt);
    }

    async function handleFaucet() {
        await contract_id.get("faucetContractId").ft_request_funds("partie-test2.thanhdevtest.testnet", wallet.accountId, "10000000000000000000000");
    }

    useEffect(() => {
    }, [])

    return (
        <div className="site-layout-content">
            <PageHeader
                className="site-page-header"
                title="Faucet"
            />
            <p>test</p>

            <div style={{ padding: 30, display: "flex", flexWrap: "wrap" }}>
                {/* {
                    sales.map(item => {
                        return (
                            <Card
                                key={item.sale_id}
                                hoverable
                                style={{ width: 240, marginRight: 15, marginBottom: 15 }}
                                cover={<img style={{ height: 300, width: "100%", objectFit: "contain" }} alt="Media NFT" src={item.token.metadata.media} />}
                                actions={[
                                    <Button onClick={() => handleBuyNFT(item)} icon={<ShoppingCartOutlined />}> Buy </Button>
                                ]}
                            >
                                <h1>{utils.format.formatNearAmount(item.price) + " NEAR"}</h1>
                                <Meta title={item.token.metadata.title} description={item.owner_id} />
                            </Card>
                        )
                    })
                } */}
                <Button onClick={() => handleFaucet()} icon={<ShoppingCartOutlined />}> Faucet </Button>
            </div>
        </div>
    )
}