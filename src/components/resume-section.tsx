import { motion, Variants } from 'framer-motion';
import React from 'react';
import { FaHashtag } from 'react-icons/fa';
import { accentColor } from '../constants';

const ResumeSection = (props: ResumeSectionProps) => {
  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
      },
    },
  };

  return (
    <motion.section
      id={props.id}
      variants={variants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      className='flex flex-col justify-center p-8 py-32 sm:pb-40 md:items-center'
    >
      <h2 className='group mb-4 -ml-6 flex items-center gap-2 text-2xl font-bold md:-ml-8 md:text-3xl'>
        <a
          href={'#' + props.id}
          className='text-lime-400 opacity-0 transition active:scale-95 group-hover:opacity-100'
        >
          #
        </a>
        <div className='text-xl md:text-2xl'>{props.icon}</div>
        {props.heading}
      </h2>
      {props.children}
    </motion.section>
  );
};

interface ResumeSectionProps {
  id: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  heading: string;
}

export default ResumeSection;
