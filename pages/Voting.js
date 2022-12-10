import React, { useEffect, useState } from "react";
import { PageHeader, Card, Button } from "antd";
import { ShoppingCartOutlined, SendOutlined, DollarCircleOutlined  } from "@ant-design/icons";
import { async } from "regenerator-runtime";
import ModalStaking from "../components/ModalStaking";
const { Meta } = Card;

export default function Voting({isSignedIn, contract_id, wallet}) {
    const [loading, setLoading] = useState(false);
    const [poll, setPoll] = useState([]);
    const [stakingVisible, setStakingVisible] = useState(false);
    const [totalStaked, setTotalStaked] = useState(null);


    async function submitStaking(amount) {
        await contract_id.get("ftContractId").ft_transfer_call("staking-test11.thanhdevtest.testnet", amount.toString(), "staking");
    }

    useEffect(() => {
        const fetchVotingDetail = async () => {
            setLoading(true);
            let data = await contract_id.get("votingContractId").show_list_voting();
            setPoll(Object.entries(data));
            console.log("data", Object.entries(data))
            setLoading(false);
        }
        fetchVotingDetail();
    }, [])


    return (
        <div className="site-layout-content">
            <PageHeader
                className="site-page-header"
                title="Voting"
            />

            <div style={{padding: 30}}>
                { loading ? (<h4>Loading...</h4>) : (
                    <div>
                    {
                        poll.map(item => {
                            return (
                                <Card
                                    key={item[0]}
                                    hoverable
                                    style={{ width: 1000, marginRight: 15, marginBottom: 15 }}
                                    // cover={<img style={{ height: 300, width: "100%", objectFit: "contain" }} alt="Media NFT" src={item.token.metadata.media} />}
                                    actions={[
                                        <Button onClick={() => window.location.href = `/voting-detail?id=${item[0]}`} icon={<ShoppingCartOutlined />}> Detail </Button>
                                    ]}
                                >
                                    {/* <h1>{utils.format.formatNearAmount(item.price) + " NEAR"}</h1>
                                    <Meta title={item.token.metadata.title} description={item.owner_id} /> */}
                                    <h1>Voting ID: {item[0]}</h1>
                                    <h1>Budget: {item[1].budget/(10**18)} PAT</h1>
                                    <h1>Creator: {item[1].creator}</h1>
                                    <h1>Question: {item[1].question}</h1>
                                    <h1>Option: {item[1].variants[0].message}</h1>
                                    <h1>Option: {item[1].variants[1].message}</h1>
                                    <h1>Start: {item[1].start}</h1>
                                    <h1>End: {item[1].end}</h1>
    
    
                                </Card>
                            )
                        })
                    }
                    </div>
                )
                }

            </div>
        </div>
    )
}