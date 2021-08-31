/* global kakao */
import '../styles/Results.css'
import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';
import { Select, Card, Row, Col, Typography, Rate } from 'antd';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

function SearchData(pageNumber, params, setWidth){
    const { dong, tags, sort } = params

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    let cancel;

    const setMap = (data) => {
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(data[0].latitude, data[0].longitude),
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
        for (var i = 0; i < data.length; i ++) {
            var latlng = new kakao.maps.LatLng(data[i].latitude, data[i].longitude)

            var imageSize = new kakao.maps.Size(15, 22); 
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

            var marker = new kakao.maps.Marker({
                map: map,
                position: latlng,
                title : data[i].name,
                image : markerImage
            });

            // 마커 클릭 하면 확대
            kakao.maps.event.addListener(marker, 'click', function(){
                map.setLevel(1, {anchor: this.getPosition()});
            });

            var infowindow = new kakao.maps.InfoWindow({
                content: `<div class="infoWindow">${data[i].name}</div>`
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
    }

    useEffect(() => {
        if (pageNumber === 0){
            setData([])
        }
        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: `/cafes?dong=${dong}&filtering=${tags}&sorting=${sort}`,
            params: { page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setData(prevData => {
                return [... new Set([...prevData, ...res.data.content])]
            });
            if (pageNumber == 0){
                setMap(res.data.content)
            } else {
                setMap([... new Set([...data, ...res.data.content])])
            }
            setHasMore(res.data.content.length > 0);
            setLoading(false);
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber, params])
    return {data, loading, hasMore};
}

function Results(props){
    const params = props.match.params

    const [width, setWidth] = useState(window.innerWidth);
    const [pageNumber, setPageNumber] = useState(0);
    const { data, loading, error, hasMore } = SearchData(pageNumber, params, setWidth);

    useEffect(() => {
        setPageNumber(0)
    }, [params])

    const changeSort = (type) => {
        const {dong, tags} = params
        props.history.push({
            pathname: `/search/${dong}/${tags}/${type}`
        })
    }

    const observer = useRef()
    const lastDataRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore){
                setPageNumber(prevNum => prevNum + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

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
                <Select value={props.match.params.sort} onChange={changeSort}>
                    <Option value="star">별점순</Option>
                    <Option value="price">가격순</Option>
                </Select>
            </div>
            </Col>
            <Col span={24} className="list">
            {data.map((d, index) => {
            if (data.length === index + 1){
                return (
                    <div className="listItem" key={index} ref={lastDataRef}>
                        <Card>
                            <Row>
                                <Col span={18}>
                                    <div className="img-div">
                                        <img src={d.img_path ? `http://${d.img_path}` : "https://1.bp.blogspot.com/-ZO8wGSRzFBA/YSnWa5QV6ZI/AAAAAAAAD-Y/3n5lSJwrx-Yh3McA1GpGCg6POSjrvsPPwCLcBGAsYHQ/s800/noimage.png"} alt={d.name} />
                                    </div>
                                    <div className="info" onClick={() => onCafeClick(d)}>
                                        <Title level={2} style={{margin: 0, color: "#dba56c"}}>{d.name}</Title>
                                        <p>{d.address}</p>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <Rate allowHalf disabled defaultValue={d.star} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                )
            }
            else {
                return (
                    <div className="listItem" key={index}>
                        <Card>
                            <Row>
                                <Col span={18}>
                                    <div className="img-div">
                                        <img src={d.img_path ? `http://${d.img_path}` : "https://1.bp.blogspot.com/-ZO8wGSRzFBA/YSnWa5QV6ZI/AAAAAAAAD-Y/3n5lSJwrx-Yh3McA1GpGCg6POSjrvsPPwCLcBGAsYHQ/s800/noimage.png"} alt={d.name} />
                                    </div>
                                    <div className="info" onClick={() => onCafeClick(d)}>
                                        <Title level={2} style={{margin: 0, color: "#dba56c"}}>{d.name}</Title>
                                        <p>{d.address}</p>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <Rate allowHalf disabled defaultValue={d.star} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                )
            }
        })}
            </Col>
        </Row>
    )
}

export default withRouter(Results)