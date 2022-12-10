import React, { useEffect, useState } from "react";
import {
    useLocation
  } from "react-router-dom";
import { PageHeader, Card, Button } from "antd";
import { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
import { ShoppingCartOutlined, SendOutlined, DollarCircleOutlined  } from "@ant-design/icons";
import { async } from "regenerator-runtime";
import ModalStaking from "../components/ModalStaking";
const { Meta } = Card;

export default function VotingDetail({isSignedIn, contract_id, wallet}) {

    function useQuery() {
        const { search } = useLocation(); 
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }
    let query = useQuery();
    let para = query.get("id")
    console.log("job_id: ", para)

    let defaultData = {
        poll: {
          creator: 'thanhdevtest.testnet',
          poll_id: '4P7yWq4WJEyY2EhZ6Yy6Hj71ALVigpe4CLz6SuueLEVN',
          question: 'ngu ngu ',
          variants: [
            { option_id: 'v1', message: 'create_tor' },
            { option_id: 'v2', message: 'freelancer' }
          ],
          start: 1,
          end: 1670354308000000000,
          budget: '1900000000000000000000'
        },
        results: {
          poll_id: '4P7yWq4WJEyY2EhZ6Yy6Hj71ALVigpe4CLz6SuueLEVN',
          variants: [],
          voted: {},
          total_voted_stake: 0
        }
    }
    let votesDefault = {
        "v1":0,
        "v2":0
    }
    const [stakingVisible, setStakingVisible] = useState(false);
    const [votingDetail, setVotingDetail] = useState(defaultData);
    const [signerVoted, setSignerVoted] = useState({})
    const [poll, setPoll] = useState({});
    const [result, setResult] = useState({})
    const [value, setValue] = useState(null);
    const [votes, setVotes] = useState({});

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        if (e.target.value == 1) {
            votesDefault.v1 = 1;
            votesDefault.v2 = 0;
        }
        else {
            votesDefault.v1 = 0;
            votesDefault.v2 = 1;
        }
        setVotes(votesDefault);
      };

    async function fetchVoting() {
        let data = await contract_id.get("votingContractId").show_results(para)
        setVotingDetail(data);
        setPoll(data.poll);
        setResult(data.result);
        if (data.results.voted[wallet.accountId]){
            setSignerVoted(data.results.voted[wallet.accountId]);
            if (data.results.voted[wallet.accountId].option_id == "v1") setValue(1);
            else setValue(2);
        }
        console.log("votingDetail: ", data);
        // console.log("votingDetail.results.voted[wallet.accountId]", data.results.voted[wallet.accountId].quantity)
    }



    async function submitVote() {
        await contract_id.get("votingContractId").vote(para, votes);
    }

    useEffect(() => {
        if (isSignedIn) {
            fetchVoting();
        } else {
            wallet.signIn();
        }
    }, [])


    return (
        <div className="site-layout-content">
            <PageHeader
                className="site-page-header"
                title="Voting Detail"
            />

            <div style={{padding: 30, display: "flex", flexWrap: "wrap"}}>
                <div>Voting id: {para}</div>
                <Card
                    key={para}
                    hoverable
                    style={{ width: 1000, marginRight: 15, marginBottom: 15 }}
                    // cover={<img style={{ height: 300, width: "100%", objectFit: "contain" }} alt="Media NFT" src={item.token.metadata.media} />}
                    actions={[
                        <Button onClick={() => submitVote()} icon={<ShoppingCartOutlined />}> Vote </Button>
                    ]}
                >
                    {/* <h1>{utils.format.formatNearAmount(item.price) + " NEAR"}</h1>
                    <Meta title={item.token.metadata.title} description={item.owner_id} /> */}
                    <h1>Voting ID: {para}</h1>
                    <h1>Budget: {votingDetail.poll.budget/(10**18)} PAT</h1>
                    <h1>Creator: {votingDetail.poll.creator}</h1>
                    <h1>Question: {votingDetail.poll.question}</h1>
                    <h1>Option: {votingDetail.poll.variants[0].message}</h1>
                    <h1>Option: {votingDetail.poll.variants[1].message}</h1>
                    <h1>Start: {votingDetail.poll.start}</h1>
                    <h1>End: {votingDetail.poll.end}</h1>
                    <h1>Results:</h1>
                    <h1>Total staked: {votingDetail.results.total_voted_stake/(10**18)}</h1>
                    <h1>v1: {votingDetail.results.variants.v1 ? votingDetail.results.variants.v1/(10**18) : 0}</h1>
                    <h1>v2: {votingDetail.results.variants.v2 ? votingDetail.results.variants.v2/(10**18) : 0}</h1>
                    <h1>Signer: {wallet.accountId}</h1>
                    <h1>Option Id: {signerVoted.option_id}</h1>
                    <h1>Quantity: {signerVoted.quantity/(10**18)}</h1>
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={1}>Option A</Radio>
                            <Radio value={2}>Option B</Radio>
                        </Space>
                    </Radio.Group>

                    {
                        Object.entries(votingDetail.results.voted).map(item =>{
                            return(
                                <div>
                                    <h1>Voter: {item[0]}</h1>
                                    <h1>Option Id: {item[1].option_id}</h1>
                                    <h1>Quantity: {item[1].quantity/(10**18)}</h1>
                                </div>
                                
                            )
                            
                        })
                    }

                </Card>
            </div>

        </div>
    )
}