/* global kakao */
import '../styles/Results.css'
import React, {useState, useEffect} from 'react';
import { Select, Card, Row, Col, Typography, Rate } from 'antd';
import { HeartFilled }from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

/* ------------ DUMMY DATA ------------ */
const cafeData = [
    {
        id: 1,
        name: "나무",
        sub: "",
        address: "제주특별자치도 제주시 조천읍 선교로 560",
        star: 5,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FB3555247E3AC49BCBF7CA16FA2213C3C",
        tags: ["과제하기 좋은", "와이파이", "밀크티", "주차가능", "에이드"],
        lon: 126.710437957655,
        lat: 33.4561863790248
    },
    {
        id: 2,
        name: "카페세바",
        sub: "",
        address: "제주특별자치도 제주시 조천읍 선흘동2길 20-7",
        star: 4.5,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FB6FEA66BA45B426B9C244DEDCDC2CFF2",
        tags: ["와이파이", "과제하기 좋은"],
        lon: 126.706083724181,
        lat: 33.5132124206566
    },
    {
        id: 3,
        name: "하오",
        sub: "",
        address: "제주특별자치도 제주시 조천읍 비자림로 637",
        star: 4.5,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F2710674253FE8A9429",
        tags: [],
        lon: 126.675678499217,
        lat: 33.4353715901611
    },
    {
        id: 4,
        name: "엔젤리쉬",
        sub: "삼화신촌점",
        address: "제주특별자치도 제주시 조천읍 신촌남1길 69-1",
        star: 4.5,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F2155D44E5592916211",
        tags: ["직접로스팅하는카페"],
        lon: 126.617527876841,
        lat: 33.5244992643051
    },
    {
        id: 5,
        name: "북촌에가면카페",
        sub: "",
        address: "제주특별자치도 제주시 조천읍 북촌5길 6",
        star: 4,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F0584E357868D49398296A68A18D214CE",
        tags: ["베이글","와이파이","깨끗한카페"],
        lon: 126.692644248879,
        lat: 33.5480080672537
    },
    {
        id: 6,
        name: "베네치아",
        sub: "",
        address: "제주특별자치도 제주시 조천읍 중산간동로 380-3",
        star: 4,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fcfile%2F24024C41556FE2D11B",
        tags: ["마카롱","빙수","공부하기좋은카페"],
        lon: 126.628212846299,
        lat: 33.5043053272329
    },
    {
        id: 7,
        name: "에이바우트커피",
        sub: "함덕점",
        address: "제주특별자치도 제주시 조천읍 조함해안로 526",
        star: 3.5,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F2EE6BC17F08D4EC1ADA09B34C62589B9",
        tags: ["베이글","빙수","주차가능"],
        lon: 126.669029690862,
        lat: 33.5424821653004
    },
    {
        id: 8,
        name: "어느멋진날",
        sub: "",
        address: "제주특별자치도 제주시 조천읍 신북로 215",
        star: 3.5,
        img: "t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FA0E985792FA147C5AA30ABBD5191012C",
        tags: ["밀크티"],
        lon: 126.636007811034,
        lat: 33.5356404030867
    },
]

function Results(props){
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(cafeData[0].lat, cafeData[0].lon),
            level: 5
        };
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        const map = new kakao.maps.Map(container, options);
    
        // 오른쪽에 지도 컨트롤 표시
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        var bounds = new kakao.maps.LatLngBounds();    
        var imageSrc = "https://1.bp.blogspot.com/-08ebwsVzqag/YSXWjBOHKPI/AAAAAAAAD9s/lRd5ya_9A2AgPtylT9oyilWIGohCTv9XQCLcBGAsYHQ/s834/dark_marker.png";   
        for (var i = 0; i < cafeData.length; i ++) {
            var latlng = new kakao.maps.LatLng(cafeData[i].lat, cafeData[i].lon)

            var imageSize = new kakao.maps.Size(24, 35); 
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

            var marker = new kakao.maps.Marker({
                map: map,
                position: latlng,
                title : cafeData[i].name,
                image : markerImage
            });

            // 마커 클릭 하면 확대
            kakao.maps.event.addListener(marker, 'click', function(){
                map.setLevel(1, {anchor: this.getPosition()});
            });

            var infowindow = new kakao.maps.InfoWindow({
                content: `<div class="infoWindow">${cafeData[i].name}</div>`
            });

            (function(marker, infowindow) {
                // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    infowindow.open(map, marker);

                    var bgDiv = infowindow.a
                    bgDiv.style.borderColor = "#9ba2bd"
                    bgDiv.style.borderRadius = "10px"
                    bgDiv.children[1].style = "text-align: center; width: 150px;"
                });

                kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });
            })(marker, infowindow);

            // bounds = 모든 마커가 보이도록 지도 범위 설정
            bounds.extend(latlng)
        }
        map.setBounds(bounds);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [width])

    const like = (event) => {
        if (!event.target.style.color){
            event.target.style.color = "#C92D40"
        } else {
            event.target.style.color = null
        }
    }

    const onCafeClick = (cafe) => {
        props.history.push({
          pathname: `/detail/${cafe.id}`,
          state: { cafe },
        });
      };

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
                <div className="listItem" key={data.id}>
                    <Card>
                        <Row>
                            <Col span={18}>
                                <div className="img-div">
                                    <img src={`http://${data.img}`} alt={data.name} />
                                </div>
                                <div className="info" onClick={() => onCafeClick(data)}>
                                    <Title level={2} style={{margin: 0, color: "#dba56c"}}>{data.name}</Title>
                                    <p>{data.address}</p>
                                </div>
                            </Col>
                            <Col span={6}>
                                <Rate allowHalf disabled defaultValue={data.star} />
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

export default withRouter(Results);