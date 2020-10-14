import React, { useEffect, useState } from 'react';
import If from '../../shared/components/If';
import { FishingPlace } from '../../shared/types/game';
import { useAppStateValue } from '../../state/AppStateProvider';
import './FishingPlaceView.css';
import MarkersView from './MarkersView';
import PlaceHeader, { PlaceViewLink } from './PlaceHeader';

interface FishingPlaceViewProps {
  place: FishingPlace;
  markerId?: string;
}

const FishingPlaceView: React.FC<FishingPlaceViewProps> = (props) => {
  const [{ user }] = useAppStateValue();

  const [activeLink, setActiveLink] = useState<PlaceViewLink>('Точки');

  useEffect(() => {
    // reset to default link, since the current active link is not available
    if (!user && activeLink === 'Мои точки') {
      setActiveLink('Точки');
    }
  }, [user, activeLink]);

  useEffect(() => {
    if (!!props.markerId) {
      setActiveLink('Просмотр точки');
    }
  }, [props.markerId]);

  const handleLinkClick = (link: PlaceViewLink) => {
    setActiveLink(link);
  };

  return (
    <>
      <PlaceHeader
        name={props.place.name}
        links={
          activeLink === 'Просмотр точки'
            ? []
            : user
            ? ['Точки', 'Мои точки', 'Вся рыба', 'Цены в магазине', 'Кафе', 'Ремонт']
            : ['Точки', 'Вся рыба', 'Цены в магазине', 'Кафе', 'Ремонт']
        }
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
      />

      <If condition={activeLink === 'Точки'}>
        <MarkersView place={props.place} viewType="public" />
      </If>

      <If condition={activeLink === 'Мои точки' && !!user}>
        <MarkersView place={props.place} viewType="private" />
      </If>

      <If condition={activeLink === 'Просмотр точки' && !!user}>
        <MarkersView place={props.place} viewType="view" viewMarkerId={props.markerId} />
      </If>
    </>
  );
};

export default FishingPlaceView;
