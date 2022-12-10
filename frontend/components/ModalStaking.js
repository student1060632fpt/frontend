import React, { useState } from "react";
import { Modal, Input, Divider, Radio } from "antd";

export default function ModalStaking(props) {
    const [amount, setAmount] = useState(0);

    function handleOk() {
        props.handleOk(amount*(10**18));
    }

    function handleTokenChange(e) {
        setToken(e.target.value);
    }

    return (
        <Modal title="Staking" visible={props.visible} onOk={handleOk} onCancel={props.handleCancel}>
            <div>
                <span style={{marginBottom: 10,  display: "block"}}>Input amount:</span>
                <Input type={"number"} onChange={(e) => setAmount(e.target.value)} placeholder={"ex: 1000 ..."} size="large" />
            </div>
        </Modal>
    )
}