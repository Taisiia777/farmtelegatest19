import React from 'react';
import { motion, Variants } from 'framer-motion';

const cloudVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -5, 5, -5, 5, 0],
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 5,
      ease: 'easeInOut'
    },
  },
};

interface CloudsProps {
  onClick: () => void;
}

const Clouds: React.FC<CloudsProps> = ({onClick}) => {
  

  return (
    <>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный черный фон
        zIndex: '1', // Задний план
        pointerEvents: 'none'
      }} />
      <motion.img
        style={{
          position: 'absolute',
          top: '50px',
          left: '-10%',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
          <motion.img
        style={{
          position: 'absolute',
          top: '20px',
          left: '-5%',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
      <motion.img
        style={{
          position: 'absolute',
          top: '30px',
          left: '20%',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
      <motion.img
        style={{
          position: 'absolute',
          top: '60px',
          left: '25%',
          transform: 'translateX(-50%)',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
      <motion.img
        style={{
          position: 'absolute',
          top: '40px',
          left: '35%',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
      <motion.img
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
      <motion.img
        style={{
          position: 'absolute',
          top: '45px',
          left: '65%',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
      <motion.img
        style={{
          position: 'absolute',
          top: '25px',
          left: '80%',
          width: '140.8px',
          height: '96.6px',
          zIndex: '1',
          pointerEvents: 'none'
        }}
        onClick={onClick}
        src="img/pages/home/energy/dark-cloud.svg"
        variants={cloudVariants}
        initial="initial"
        animate="animate"
      />
    </>
  );
};

export default Clouds;
