import React, { useEffect, useState } from 'react';
import If from '../../../../../shared/components/If';
import { Bait } from '../../../../../shared/types';
import { useAppStateValue } from '../../../../../state/AppStateProvider';
import MarkerInfoAddBait from './MarkerInfoAddBait';
import MarkerInfoBait from './MarkerInfoBait';
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
    setSelectedBaits(baits.filter((b) => props.baits.includes(b.id)));
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
        {selectedBaits.map((bait) => {
          return (
            <MarkerInfoBait
              type="view"
              removable={props.isEditable}
              bait={bait}
              key={bait.id}
              onRemove={() => handleRemove(bait)}
            />
          );
        })}
        <If condition={props.isEditable}>
          <MarkerInfoAddBait baits={baits} onAdd={handleAdd} />
        </If>
      </div>
    </div>
  );
};

export default MarkerInfoBaits;
