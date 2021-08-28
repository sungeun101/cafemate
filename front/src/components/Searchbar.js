import '../styles/Searchbar.css';
import React, {useState} from 'react';
import Address from './Address'
import { Form, Button, Tag, Slider, Rate, message } from 'antd';
import { withRouter, Link } from 'react-router-dom';

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
    "샌드위치": "sandwich",
    "베이글": "bagel",
    "주차가능": "parking",
    "와이파이": "wifi",
    "깔끔한": "clean",
    "과제하기 좋은": "work",
    "수다떨기 좋은": "chat",
    "사진찍기 좋은": "camera",
    "디저트가 있는": "dessert",
    "로스팅 직접 하는": "roasting",
}

const marks = {
    0: "0.0",
    33: "4.0",
    66: "6.0",
    100: "ALL"
}

function formatter(value) {
    if (value <= 33){
        return "4천원 이하"
    }
    if (value > 33 && value <= 66){
        return "6천원 이하"
    }
    if (value > 66) {
        return "모든 가격"
    }
}

function Searchbar(props) {
    const { setPrice, setRate, setAddress1, setAddress2, setAddress3, setTags } = props.funcs
    const { price, rate, address1, address2, address3, tags } = props.filterData

    const [americano, setAmericano] = useState("four")

    const sliderChange = (value) => {
        if (value <= 33){
            setAmericano("four")
        }
        if (value > 33 && value <= 66){
            setAmericano("six")
        }
        if (value > 66) {
            setAmericano("over")
        }
        setPrice(value)
    }

    const rateChange = (value) => {
        setRate(value);
    }

    const tagChange = (tag, checked) => {
        const nextTags = checked ? [...tags, tag] : tags.filter(t => t !== tag);
        setTags(nextTags);
    }

    const showError = () => {
        message.error("주소를 선택하세요.")
    }

    return (
        <Form>
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
                {address3 ? 
                    <Link to={`/search/${address3}/${tags.concat(americano).join(",")}/star`}>
                        <Button className="blackButton">검색</Button>
                    </Link>
                    :
                    <Button onClick={showError} className="blackButton">검색</Button>
                }
            </Form.Item>
        </Form>
    )
}

export default withRouter(Searchbar);