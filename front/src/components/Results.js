/* global kakao */
import '../styles/Results.css'
import React, {useState, useEffect} from 'react';
import { Select, Card, Row, Col, Typography, Rate } from 'antd';
import { HeartFilled }from '@ant-design/icons';
import {withRouter} from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

function Results(props){
    const [width, setWidth] = useState(window.innerWidth);
    const cafeData = props.cafeData

    useEffect(() => {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(cafeData[0].latitude, cafeData[0].longitude),
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
            var latlng = new kakao.maps.LatLng(cafeData[i].latitude, cafeData[i].longitude)

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
                                    <img src={`http://${data.img_path}`} alt={data.name} />
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