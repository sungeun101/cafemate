import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { InfoWrapper } from '../globalStyles';
import { IconContainer, Items } from './Menu.style';

const menu = [
  { id: 0, name: '아이스크림 블렌딩 콜드 브루', price: '5000원' },
  { id: 1, name: '나이트로 콜드 브루', price: '5000원' },
  { id: 2, name: '돌체 콜드 브루', price: '5000원' },
  { id: 3, name: '바닐라 크림 콜드 브루', price: '5000원' },
  { id: 4, name: '벨벳 다크 모카 나이트로', price: '5000원' },
  { id: 5, name: '제주 비자림 콜드 브루', price: '5000원' },
  { id: 6, name: '프렌치 애플 타르트 나이트로', price: '5000원' },
  { id: 7, name: '브루드 커피디카페인', price: '5000원' },
  // 아이스 커피
  // 에스프레소디카페인
  // 루프탑 그레이 라떼
  // 에스프레소 콘 파나
  // 에스프레소 마키아또
  // 카페 아메리카노
  // 아이스 화이트 초콜릿 모카
  // 카페 모카
];

const Menu = () => {
  const [showAllMenu, setShowAllMenu] = useState(false);

  useEffect(() => {
    if (menu.length < 6) {
      setShowAllMenu(true);
    }
  }, []);

  return (
    <InfoWrapper>
      <h1>MENU</h1>
      {showAllMenu ? (
        <div>
          {menu.map((item) => {
            return (
              <Items key={item.id}>
                <div>{item.name}</div>
                <div>{item.price}</div>
              </Items>
            );
          })}
          <IconContainer>
            <UpOutlined
              style={{ fontSize: '1.7rem' }}
              onClick={() => setShowAllMenu(false)}
            />
          </IconContainer>
        </div>
      ) : (
        <div>
          {menu.slice(0, 5).map((item) => {
            return (
              <Items key={item.id}>
                <div>{item.name}</div>
                <div>{item.price}</div>
              </Items>
            );
          })}
          <IconContainer>
            <DownOutlined
              style={{ fontSize: '1.7rem' }}
              onClick={() => setShowAllMenu(true)}
            />
          </IconContainer>
        </div>
      )}
    </InfoWrapper>
  );
};

export default Menu;
