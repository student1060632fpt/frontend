import React, { useState } from "react";
import { Modal, Input, Divider } from "antd";

export default function ModelCreateJobs(props) {
    const [jobsId, setJobsId] = useState("");
    const [tokenTitle, setTokenTitle] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState("");
    const [budget, setBudget] = useState(0);

    function handleOk() {
        props.handleOk({
            jobsId,tokenTitle, description, media, budget: budget*(10**18)
        });
    }

    return (
        <Modal title="Create Jobs" visible={props.visible} onOk={handleOk} onCancel={props.handleCancel}>
            <span>Jobs ID:</span>
            <Input onChange={(e) => setJobsId(e.target.value)} style={{marginBottom: 15}}/>
            <span>Title:</span>
            <Input onChange={(e) => setTokenTitle(e.target.value)} style={{marginBottom: 15}}/>
            <span>Description:</span>
            <Input onChange={(e) => setDescription(e.target.value)} style={{marginBottom: 15}}/>
            <span>Media:</span>
            <Input onChange={(e) => setMedia(e.target.value)} style={{marginBottom: 15}} />
            <span>Budget:</span>
            <Input onChange={(e) => setBudget(e.target.value)} style={{marginBottom: 15}} />
        </Modal>
    )
}