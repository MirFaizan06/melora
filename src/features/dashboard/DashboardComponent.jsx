import React from 'react'
import { motion, AnimatePresence } from "framer-motion";


function DashboardComponent() {
  return (
    <motion.div
          className=" bg-gray-950"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <h2 className='text-4xl text-emerald-400 font-bold'>My Dashboard</h2>
          
        </motion.div>
  )
}

export default DashboardComponent