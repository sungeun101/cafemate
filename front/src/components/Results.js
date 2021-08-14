/* global kakao */
import '../styles/Results.css'
import React, {useState, useEffect} from 'react';
import { Select, Card, Row, Col, Typography, Rate } from 'antd';
import { HeartFilled }from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

/* ------------ DUMMY DATA ------------ */
const cafeData = [
    {
        name: "텐퍼센트커피 울산삼산현대점",
        address: "울산광역시 남구 왕생로66번길 30",
        rate: 5,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F44A70A4AA31E4A40921B4EC60FC3EBEC",
        tags: ["밀크티","마카롱","공부하기좋은카페","와이파이"]
    },
    {
        name: "커피씨엘 본점",
        address: "울산광역시 남구 번영로166번길 14",
        rate: 4.5,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F9E1572DA4FCE46868EEB0919E748A431",
        tags: ["빙수", "케이크","와이파이"]
    },
    {
        name: "핸즈커피",
        address: "울산광역시 중구 신기6길 17",
        rate: 4.5,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FFE9BBF4DE81C4C5DB6EDB83D5B18CFD3",
        tags: ["허니브레드","사진찍기좋은카페","와이파이","주차가능"]
    },
    {
        name: "엔제리너스 울산대점",
        address: "울산광역시 남구 대학로 94",
        rate: 4.5,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FD2827586E0724A4684BB12DBEA8B7C22",
        tags: ["직접로스팅하는카페"]
    },
    {
        name: "탐앤탐스 울산호계점",
        address: "울산광역시 북구 호계로 258",
        rate: 4,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FF37FF120E3CE49BABE9C98193D3C7C8B",
        tags: ["베이글","와이파이","깨끗한카페"]
    },
    {
        name: "치즈에게",
        address: "울산광역시 남구 중앙로91번길 21",
        rate: 4,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FD731038003814D4087560BDE58F70DBD",
        tags: ["마카롱","빙수","공부하기좋은카페"]
    },
    {
        name: "마리골드커피연구소",
        address: "울산광역시 남구 번영로 223",
        rate: 3.5,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F3236192956024F6F971AC0240BAEDDC8",
        tags: ["베이글","빙수","주차가능"]
    },
    {
        name: "커피그레이",
        address: "울산광역시 남구 대공원로 235",
        rate: 3.5,
        img: "http://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F0F83B8FB3C37429C95958B540217A09E",
        tags: ["밀크티"]
    },
]

function Results(props){
    const {address1, address2, address3} = props.state;
    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(37.496472, 127.028333),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(`${address1} ${address2} ${address3}`, function(result, status){
            if (status === kakao.maps.services.Status.OK){
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                map.setCenter(coords);
            }
        })
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [width, address1, address2, address3])

    const like = (event) => {
        if (!event.target.style.color){
            event.target.style.color = "#C92D40"
        } else {
            event.target.style.color = null
        }
    }

    return (
        <Row>
            <Col span={24}>
            <div id="map" style={{
                width: `${width - 200}px`,
                height: '40vh'
            }}>
            </div>
            </Col>
            <Col span={24}>
            <div className="sort">
                <Select defaultValue="star">
                    <Option value="star">별점순</Option>
                    <Option value="price">가격순</Option>
                </Select>
            </div>
            </Col>
            <Col span={24} className="list">
            {cafeData.map(data => (
                <div className="listItem" key={data.name}>
                    <Card>
                        <Row>
                            <Col span={18}>
                                <div className="img-div">
                                    <img src={data.img} alt={data.name} />
                                </div>
                                <div className="info">
                                    <Title level={2} style={{margin: 0, color: "#dba56c"}}>{data.name}</Title>
                                    <p>{data.address}</p>
                                </div>
                            </Col>
                            <Col span={6}>
                                <Rate allowHalf disabled defaultValue={data.rate} />
                                <HeartFilled onClick={like} />
                            </Col>
                        </Row>
                    </Card>
                </div>
            ))}
            </Col>
        </Row>
    )
}

export default Results;