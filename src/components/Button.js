// A component where different buttons are created for the impplementing different logics
import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion' 


// A simple button layout which can be used anywhere inside the other components
function Button({children, type, ...rest}) {
  return (
    <button
        {...rest}
        type={'submit' ? 'submit' : 'button'}>
            {children}
    </button>
  )
}

// For the select input type options a basic layout of button being created
function SelectButton({children, ...rest}){
    return (
        <select {...rest}>{children}</select>
    )
}

const checkVariants = {
    initial: {
        color: '#fff',
    },
    checked: {
        pathLength: 1,
    },
    unchecked: {
        pathLength: 0
    }
}

const boxVariants = {
    checked: {
        background: "#006400",
        transition: {duration  : 0.1}
    },
    unchecked: {
        background: "#fff",
        transition: {duration  : 0.1}
    }
}


// For the implementation of checkbox we have created a checkbox button and we have used the framer motion for checking and unchecking the check button
function CheckButton({checked, handleCheck}){
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0,1])
    return (
        <motion.div
            className='flex justify-center items-center h-[25px] cursor-pointer border border-black basis-[30px]'>
            <motion.svg
                className='w-100% h-100% stroke-white flex items-center justify-center'
                onClick={handleCheck}
                variants={boxVariants}
                animate={checked ? 'checked' : 'unchecked'}
                viewBox='0 0 55 40'
                fill='none'
                xmlns='https://www.w3.org/2000/svg'
            >
                <motion.path
                    fill='none'
                    variants={checkVariants}
                    animate={checked ? 'checked' : 'unchecked'}
                    style={{pathLength, opacity}}
                    strokeMiterlimit="8"
                    strokeWidth="4"
                    d='M1.5 22L16 36.5L51.5 1'
                    strokeLinejoin='round'
                    strokeLinecap='round'
                />
            </motion.svg>
        </motion.div>
    )
}

export {SelectButton, CheckButton}
export default Button