import "../Home.module.scss";

interface EnergyProps {
   total: number;
   current: number;
}

const Energy = ({ total, current }: EnergyProps) => {
   return (
      <div>
         <span> Energy total: {total}</span>
         <span> Energy current: {current}</span>
      </div>
   );
};

export default Energy;
