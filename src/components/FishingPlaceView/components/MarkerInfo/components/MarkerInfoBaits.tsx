import React, { useEffect, useState } from 'react';
import { Bait } from '../../../../../shared/types';
import { useAppStateValue } from '../../../../../state/AppStateProvider';
import BaitsGrid from './BaitsGrid';
import './MarkerInfoBaits.css';

interface MarkerInfoBaitsProps {
  baits: number[];
  isEditable: boolean;
  onChange: (baits: number[]) => void;
}

const MarkerInfoBaits: React.FC<MarkerInfoBaitsProps> = (props) => {
  const [{ baits }] = useAppStateValue();

  const [selectedBaits, setSelectedBaits] = useState<Bait[]>([]);

  useEffect(() => {
    const newValue = props.baits.reduce((acc, id) => {
      const found = baits.find((b) => b.id === id);
      if (found) {
        acc.push(found);
      }
      return acc;
    }, [] as Bait[]);
    setSelectedBaits(newValue);
  }, [baits, props.baits]);

  const handleAdd = (bait: Bait) => {
    const newValue = [...selectedBaits, bait];
    props.onChange(newValue.map((b) => b.id));
  };

  const handleRemove = (bait: Bait) => {
    const newValue = selectedBaits.filter((b) => b.id !== bait.id);
    props.onChange(newValue.map((b) => b.id));
  };

  return (
    <div className="marker-info-baits-wrapper">
      <h2 className="group-header">Наживки</h2>
      <div className="baits-container">
        <BaitsGrid
          baits={selectedBaits}
          removable={props.isEditable}
          onRemove={handleRemove}
          addOption={props.isEditable}
          onAdd={handleAdd}
        ></BaitsGrid>
      </div>
    </div>
  );
};

export default MarkerInfoBaits;
