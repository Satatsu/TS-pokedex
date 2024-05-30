import React from "react";

interface Ability {
  ability: { name: string };
  is_hidden: boolean;
  slot: number;
}

interface PhysicalStat {
  height: number;
  weight: number;
  abilities: Ability[];
}

interface StatDetailProps {
  statPhysical: PhysicalStat;
}

const StatDetail: React.FC<StatDetailProps> = ({ statPhysical }) => {
  return (
    <section className="globalStatDetail">
      <div>
      <h1>Physical:</h1>
        <h4>{statPhysical.height} m</h4>
        <h4>{statPhysical.weight} kg</h4>
      </div>
       <div>
      <h1>Abilities:</h1>
        {statPhysical.abilities.map((ability, index) => (
        <h4 key={index}>
         {index + 1} - {ability.ability.name} {ability.is_hidden}
        </h4>
      ))}
       </div>
    </section>
  );
};

export default StatDetail;
