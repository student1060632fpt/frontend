import React, { useEffect, useState } from "react";
import {
    useLocation
  } from "react-router-dom";
import { PageHeader, Card, Button } from "antd";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';
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
    let jobsDefault = {
        creator_id: 'thanhdevtest.testnet',
        budget: 1000000000000000000,
        freelancers: {},
        is_start: false,
        is_end: false,
        voting_id: ''
      };
    const [jobs, setJobs] = useState(jobsDefault);

    async function fetchJobs() {
        let data = await contract_id.get("stakingContractId").show_jobs(para)
        setJobs(data);
        console.log("jobs: ", data);
    }



    async function submitGetJobs() {
        await contract_id.get("stakingContractId").get_jobs(para);
    }

    async function submitStartJobs(freelancer_id) {
        await contract_id.get("stakingContractId").start_jobs(para, freelancer_id);
    }

    async function submitCompleteJobs(choice) {
        await contract_id.get("stakingContractId").complete_jobs(para, choice);
    }

    async function submitEndJobs(freelancer_id) {
        await contract_id.get("stakingContractId").end_jobs(para, freelancer_id);
    }

    // async function submitCreateVoting() {
    //     await contract_id.get("votingContractId").create_voting(para, freelancer_id, question, variants, start, end);
    // }

    const handleChange = (event, freelancer_id) => {
        console.log("event", event);
        if (event) {
            submitStartJobs(freelancer_id);
        }
    }

    const handleChangeEndJobs = (event, freelancer_id) => {
        console.log("event", event);
        if (event) {
            submitEndJobs(freelancer_id);
        }
    }

    useEffect(() => {
        if (isSignedIn) {
            fetchJobs();
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
                <Card
                    key={para}
                    hoverable
                    style={{ width: 1000, marginRight: 15, marginBottom: 15 }}
                    // cover={<img style={{ height: 300, width: "100%", objectFit: "contain" }} alt="Media NFT" src={item.token.metadata.media} />}
                    actions={[
                        <Button onClick={() => submitGetJobs()} icon={<ShoppingCartOutlined />}> Get Jobs </Button>,
                        <Button onClick={() => submitCompleteJobs(true)} icon={<ShoppingCartOutlined />}> Complete Jobs </Button>
                    ]}
                >
                    <div>Jobs id: {para}</div>
                    <div>Budget: {jobs.budget}</div>
                    <div>creator_id: {jobs.creator_id}</div>
                    <div>is_start: {jobs.is_start.toString()}</div>
                    <div>is_end: {jobs.is_end.toString()}</div>
                    <div>voting_id: {jobs.voting_id}</div>


                    <table>
                        <thead>
                            <th>No.</th>
                            <th>Freelancer</th>
                            <th>Check</th>
                            <th>Complete</th>
                            <th>Confirm</th>
                            <th>End Jobs</th>
                        </thead>
                        <tbody>
                        {
                        Object.entries(jobs.freelancers).map((item,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item[0]}</td>
                                    <td>{item[1].freelancer[0].toString()}</td>
                                    <td>{item[1].freelancer[1].toString()}</td>
                                    <td>
                                    <Space direction="vertical">
                                        <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        disabled={jobs.is_start}
                                        onChange= {event => handleChange(event, item[0])}
                                        defaultChecked = {item[1].creator[0]}
                                        />
                                    </Space>
                                    </td>
                                    <td>
                                    <Space direction="vertical">
                                        <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        disabled={jobs.is_end || !(item[1].freelancer[1] && item[1].creator[0])}
                                        onChange= {event => handleChangeEndJobs(event, item[0])}
                                        defaultChecked = {item[1].creator[1]}
                                        />
                                    </Space>
                                    </td>
                                </tr>
                                
                            )
                            
                        })
                        }
                        </tbody>
                    </table>
                    

                </Card>
            </div>


        </div>
    )
}