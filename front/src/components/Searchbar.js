import './Searchbar.css';
import React from 'react';
import { Link } from 'react-router-dom'
import Address from './Address'
import { Form, Input, Button, Tag, Slider, Rate } from 'antd';

const { CheckableTag } = Tag;

const tagsData = ["디저트가 있는","빙수","마카롱","케이크","허니브레드","와이파이","과제하기 좋은","주차가능","수다 떨기 좋은","깔끔한","로스팅","사진 찍기 좋은"];

const marks = {
    0: "1.0",
    50: "3.0",
    100: "5.0"
};

function formatter(val) {
    return `${1000 + (40 * val)}원`
}

class Searchbar extends React.Component {
    render(){
        const {
            handleChange,
            sliderChange,
            rateChange,
            tagChange,
            changeAddress1,
            changeAddress2,
            changeAddress3,
            state
        } = this.props
        const {
            keyword,
            address1,
            address2,
            address3,
            tags
        } = state
        console.log(state)
        return (
            <Form>
                <Form.Item>
                    <Input name="keyword" placeholder="키워드 검색" value={keyword} onChange={handleChange}/>
                </Form.Item>
                <Address
                    changeAddress1={changeAddress1}
                    changeAddress2={changeAddress2}
                    changeAddress3={changeAddress3}
                    address1={address1}
                    address2={address2}
                    address3={address3}
                />
                <Form.Item>
                    가격대 (아메리카노 기준)
                    <Slider marks={marks} tipFormatter={formatter} onChange={sliderChange} />
                    별점 
                    <Rate allowHalf onChange={rateChange}/>
                </Form.Item>
                <Form.Item>
                    {tagsData.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={tags.indexOf(tag) > -1}
                            onChange={checked => tagChange(tag, checked)}
                        >
                            {tag}
                        </CheckableTag>
                    ))}
                </Form.Item>
                <Form.Item>
                    <Link to='/search'>
                        <Button>검색</Button>
                    </Link>
                </Form.Item>
            </Form>
        )
    }
}

export default Searchbar