import React from 'react';
import { conditionalClass } from '../../shared/utils/classes.utils';
import { useAppStateValue } from '../../state/AppStateProvider';
import './PlaceHeader.css';

interface PlaceHeader {
  name: string;
  links: PlaceViewLink[];
  activeLink: string;
  onLinkClick: (link: PlaceViewLink) => void;
}

export type PlaceViewLink =
  | 'Точки'
  | 'Мои точки'
  | 'Просмотр точки'
  | 'Вся рыба'
  | 'Цены в магазине'
  | 'Кафе'
  | 'Ремонт';

const PlaceHeader: React.FC<PlaceHeader> = (props) => {
  const [{ isMobile }] = useAppStateValue();

  return (
    <div className={conditionalClass('place-header-wrapper', 'mobile', isMobile)}>
      <h1 className="place-header-name">{props.name}</h1>
      <div className="place-header-links-wrapper">
        {props.links.map((link, index) => {
          return (
            <div
              className={conditionalClass('place-header-link', 'active', link === props.activeLink)}
              key={index}
              onClick={() => props.onLinkClick(link)}
            >
              {link}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaceHeader;
