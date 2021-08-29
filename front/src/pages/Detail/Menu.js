import React, { useEffect, useState } from 'react';
import { InfoWrapper } from 'globalStyles';
import {
  DownOutlinedIcon,
  IconContainer,
  Items,
  UpOutlinedIcon,
} from './Menu.style';

const Menu = ({ cafe }) => {
  const [showAllMenu, setShowAllMenu] = useState(undefined);
  const [items, setItems] = useState([]);

  const { menu } = cafe;

  useEffect(() => {
    if (menu && menu.length > 0) {
      const items = menu.split('/').map((item) => item.split(':'));
      setItems(items);
    }
  }, [cafe]);

  useEffect(() => {
    if (items.length < 6) {
      setShowAllMenu(true);
    } else {
      setShowAllMenu(false);
    }
  }, [items]);

  return (
    items.length > 0 && (
      <InfoWrapper>
        <h1>MENU</h1>
        {showAllMenu ? (
          <div>
            {items.map((item, i) => {
              return (
                <Items key={i}>
                  <div>{item[0]}</div>
                  <div>{item[1]}</div>
                </Items>
              );
            })}
            {items.length > 5 && (
              <IconContainer>
                <UpOutlinedIcon onClick={() => setShowAllMenu(false)} />
              </IconContainer>
            )}
          </div>
        ) : (
          <div>
            {items.slice(0, 5).map((item, i) => {
              return (
                <Items key={i}>
                  <div>{item[0]}</div>
                  <div>{item[1]}</div>
                </Items>
              );
            })}
            <IconContainer>
              <DownOutlinedIcon onClick={() => setShowAllMenu(true)} />
            </IconContainer>
          </div>
        )}
      </InfoWrapper>
    )
  );
};

export default Menu;
