import React from 'react';
import { sido, sigungu } from './AddressData'
import { Form, Select } from 'antd';

const { Option } = Select;

class Address extends React.Component {
    render(){
        const changeAddress1 = this.props.changeAddress1
        const changeAddress2 = this.props.changeAddress2
        const changeAddress3 = this.props.changeAddress3
        const { address1, address2, address3 } = this.props
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
}

export default Address;