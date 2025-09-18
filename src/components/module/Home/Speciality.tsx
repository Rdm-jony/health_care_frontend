import ComponentTitle from "@/components/ComponentTitlte";
import { useGetAllSpecializationQuery } from "@/redux/features/doctor/doctorApi";
import { motion } from "framer-motion";
import { Link } from "react-router";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Speciality = () => {
  const { data } = useGetAllSpecializationQuery();

  return (
    <div>
      <ComponentTitle title="Find by Speciality" subTitle="Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free."/>
      <motion.div
        className="flex gap-5 justify-center flex-wrap"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {data?.map((item) => (
          <motion.div
            key={item._id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }} // hover effect
            transition={{ type: "spring", stiffness: 300 }}
            className="cursor-pointer"
          >
            <Link to={`/all-doctor?specialization.name=${item.name}`}>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-primary/10 p-5 border rounded-full flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <p className="text-smP mt-2 capitalize">{item.name}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Speciality;
