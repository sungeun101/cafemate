import React from 'react';
import { sido, sigungu } from './AddressData'
import { Form, Select } from 'antd';

const { Option } = Select;

function Address(props) {
    const { address1, address2, address3 , setAddress1, setAddress2, setAddress3 } = props

    const changeAddress1 = (value) => {
        setAddress1(value);
        setAddress2(null);
        setAddress3(null);
    }

    const changeAddress2 = (value) => {
        setAddress2(value);
        setAddress3(null);
    }

    const changeAddress3 = (value) => {
        setAddress3(value);
    }

    return (
        <>
            <Form.Item>
                <Select placeholder="시/도" onChange={changeAddress1} value={address1}>
                    {sido.map(s => (
                        <Option key={s} value={s}>{s}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Select placeholder="시/군/구" onChange={changeAddress2} value={address2}>
                    {address1 ?
                    Object.keys(sigungu[address1]).sort().map(s => (
                        <Option key={s} value={s}>{s}</Option>
                    ))
                    : <></>
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <Select placeholder="동" onChange={changeAddress3} value={address3}>
                    {address2 ?
                    sigungu[address1][address2].sort().map(s => (
                        <Option key={s} value={s}>{s}</Option>
                    ))
                    : <></>
                    }
                </Select>
            </Form.Item>
        </>
    )
}

export default Address;