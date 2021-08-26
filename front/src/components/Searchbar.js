import '../styles/Searchbar.css';
import React from 'react';
import { Link } from 'react-router-dom'
import Address from './Address'
import { Form, Input, Button, Tag, Slider, Rate, Radio } from 'antd';

const { CheckableTag } = Tag;

const tagsData = {
    "마카롱": "macaron",
    "빙수": "ice",
    "와플": "waffle",
    "허니브레드": "honey",
    "케이크": "cake",
    "스무디": "smoothie",
    "밀크티": "milktea",
    "스콘": "scone",
    "에이드": "ade",
    "아이스티": "icedtea",
    "크로플": "cropple",
    "과제하기 좋은": "work",
    "베이글": "bagel",
    "수다떨기 좋은": "chat",
    "사진찍기 좋은": "camera",
    "깔끔한": "clean",
    "샌드위치": "sandwich",
    "디저트가 있는": "dessert",
    "로스팅 직접 하는": "roasting",
}

const marks = {
    0: "0.0",
    33: "4.0",
    66: "6.0",
    100: "ALL"
}

function formatter(val) {
    if (val <= 33){
        return "4천원 이하"
    }
    if (val > 33 && val <= 66){
        return "6천원 이하"
    }
    if (val > 66) {
        return "모든 가격"
    }
}

function Searchbar(props) {
    const { setKeyword, setPrice, setRate, setAddress1, setAddress2, setAddress3, setTags } = props.funcs
    const { keyword, price, rate, address1, address2, address3, tags } = props.filterData

    const handleChange = (event) => {
        setKeyword(event.target.value);
    }

    const sliderChange = (value) => {
        setPrice(value)
    }

    const rateChange = (value) => {
        setRate(value);
    }

    const tagChange = (tag, checked) => {
        const nextTags = checked ? [...tags, tag] : tags.filter(t => t !== tag);
        setTags(nextTags);
    }

    return (
        <Form>
            <Form.Item>
                <Input name="keyword" placeholder="키워드 검색" value={keyword} onChange={handleChange}/>
            </Form.Item>
            <Address
                setAddress1={setAddress1}
                setAddress2={setAddress2}
                setAddress3={setAddress3}
                address1={address1}
                address2={address2}
                address3={address3}
            />
            <Form.Item>
                가격대 (아메리카노 기준)
                <Slider marks={marks} tipFormatter={formatter} onChange={sliderChange} value={price} />
                별점 
                <Rate allowHalf onChange={rateChange} value={rate}/>
            </Form.Item>
            <Form.Item>
                {Object.keys(tagsData).map(tag => (
                    <CheckableTag
                        key={tagsData[tag]}
                        checked={tags.indexOf(tagsData[tag]) > -1}
                        onChange={checked => tagChange(tagsData[tag], checked)}
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

export default Searchbar;