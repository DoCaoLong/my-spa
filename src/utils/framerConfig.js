//--------------------------------------//
// Framer-motion config
const container = {
    hidden: {opacity:0},
    show: {
          opacity:1,
          transition:{
          staggerChildren: 0.5,
          duration: 0.6,
          }
    }
}
export default container;