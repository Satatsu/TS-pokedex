import React from 'react';

interface Stat {
    name: string;
    value: number;
}

interface PokemonStatsProps {
    stats: Stat[];
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
    return (
        <div className="pokeStat">
            <ul>
                {stats.map((stat, index) => (
                    <li key={index} className="statItem">
                        <div className="statName">{stat.name}</div>
                        <div className="barContainer">
                            <div className="bar" style={{ height: `${stat.value > 100 ? 100 : stat.value / 2}%` }}>
                                <span className="barValue">{stat.value}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonStats;

