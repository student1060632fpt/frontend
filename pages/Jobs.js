import React, { useEffect, useState } from "react";
import { PageHeader, Card, Button } from "antd";
import { utils } from "near-api-js";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { async } from "regenerator-runtime";
const { Meta } = Card;
import ModelCreateJobs from "../components/ModelCreateJobs";

export default function Jobs({ isSignedIn, contract_id, wallet }) {
    const [sales, setSales] = useState([]);
    const [balance, setBalance] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [createVisible, setCreateVisible] = useState(false);

    async function fetJobs(){
        let data = await contract_id.get("stakingContractId").get_list_jobs();
        setJobs(Object.entries(data));
        console.log("jobs: ",Object.entries(data));
        console.log("user address", wallet.accountId);
    }

    async function fetchSales() {
        let data = await contract_id.get("nftMarketplace").getSales();
        setSales(data);
        console.log("Sales: ", data);
    }

    async function submitOnCreate({jobsId, tokenTitle, description, media, budget}) {
        const dataInput = {
            purpose: "up jobs",
            para: jobsId.toString()
        };
        const stringData = JSON.stringify(dataInput);
        console.log("stringData ", stringData);
        const rp = stringData.replace(/["]+/g, '\"');
        console.log("rp: ", rp);
        await contract_id.get("ftContractId").ft_transfer_call("staking-test16.thanhdevtest.testnet", budget.toString(), rp);

        //post be/
    }

    async function handleBuyNFT(item) {
        if (isSignedIn) {
            await contract_id.get("nftMarketplace").buy(item.sale_id, item.price);
        } else {
            wallet.signIn()
        }
    }

    useEffect(() => {
        fetchSales();
        fetJobs();
    }, [])

    return (
        <div className="site-layout-content">
            <PageHeader
                className="site-page-header"
                title="Jobs"
                extra={[
                    <Button onClick={() => {setCreateVisible(true)}} key="3">Create Jobs</Button>
                ]}
            />
            <p>test</p>

            <div style={{ padding: 30}}>
                {
                    jobs.map(item => {
                        return (
                            <Card
                                key={item[0]}
                                hoverable
                                style={{ width: 1000, marginRight: 15, marginBottom: 15 }}
                                // cover={<img style={{ height: 300, width: "100%", objectFit: "contain" }} alt="Media NFT" src={item.token.metadata.media} />}
                                actions={[
                                    <Button onClick={() => window.location.href = `/jobs-detail?id=${item[0]}`} icon={<ShoppingCartOutlined />}> Detail </Button>
                                ]}
                            >
                                {/* <h1>{utils.format.formatNearAmount(item.price) + " NEAR"}</h1>
                                <Meta title={item.token.metadata.title} description={item.owner_id} /> */}
                                <h1>Jobs ID: {item[0]}</h1>
                                <h1>Budget: {item[1].budget/(10**18)} PAT</h1>
                                <h1>Creator: {item[1].creator_id}</h1>
                                <h1>Is start: {item[1].is_start.toString()}</h1>
                                <h1>Is end: {item[1].is_end.toString()}</h1>


                            </Card>
                        )
                    })
                }
                {/* <div>Balance: </div> */}
            </div>

            {/* <div style={{ padding: 30, display: "flex", flexWrap: "wrap" }}>
                {
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
                }
                
            </div> */}
            <ModelCreateJobs visible={createVisible} handleOk={submitOnCreate} handleCancel={() => setCreateVisible(false)}/>
        </div>
    )
}