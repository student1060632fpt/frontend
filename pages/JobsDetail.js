import React, { useEffect, useState } from "react";
import {
    useLocation
  } from "react-router-dom";
import { PageHeader, Card, Button } from "antd";
import { ShoppingCartOutlined, SendOutlined, DollarCircleOutlined  } from "@ant-design/icons";
import { async } from "regenerator-runtime";
import ModalStaking from "../components/ModalStaking";
const { Meta } = Card;

export default function JobsDetail({isSignedIn, contract_id, wallet}) {

    function useQuery() {
        const { search } = useLocation(); 
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }
    let query = useQuery();
    let para = query.get("id")
    console.log("job_id: ", para)
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
                title="Jobs Detail"
            />

            <div style={{padding: 30, display: "flex", flexWrap: "wrap"}}>
                <div>Jobs id: {para}</div>
            </div>

        </div>
    )
}