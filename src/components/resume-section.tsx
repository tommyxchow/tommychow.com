import { motion, Variants } from 'framer-motion';
import React from 'react';
import { FaHashtag } from 'react-icons/fa';

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
      className='mb-96 flex flex-col justify-center p-8 py-12 md:items-center'
    >
      <div className='group mb-4 -ml-6 flex items-center gap-2 md:-ml-8'>
        <a
          href={'#' + props.id}
          className='opacity-0 transition group-hover:opacity-100 md:text-xl'
        >
          <FaHashtag color='#a3e635' />
        </a>
        <div className='text-xl md:text-2xl'>{props.icon} </div>
        <h2 className='text-2xl font-semibold md:text-3xl'>{props.heading}</h2>
      </div>
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
