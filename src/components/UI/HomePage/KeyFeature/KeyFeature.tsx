"use client";

import { motion } from "framer-motion";
import {
  Schedule,
  Notifications,
  Analytics,
  ManageAccounts,
} from "@mui/icons-material";

const KeyFeature = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };


  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  const features = [
    {
      icon: <Schedule className="text-4xl" />,
      title: "Effortless Scheduling",
      description:
        "Quickly check, manage, do or not synchronize with a new data. Our task is to maintain most remaining your time through any steps here.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <Notifications className="text-4xl" />,
      title: "Smart Reminders",
      description:
        "Never find an appointment with some user anywhere but email and talk. Stay informed about key-just schedules on track without click.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Analytics className="text-4xl" />,
      title: "Performance Insights",
      description:
        "Previous data includes analytics on topologies, promises, and client satisfaction within the Internet and grow their people.",
      color: "from-pink-400 to-purple-400",
    },
    {
      icon: <ManageAccounts className="text-4xl" />,
      title: "Multi-Role Management",
      description:
        "Managing online, mobile, and application forms in large platforms. Auditor controls monitor mobile operations and efficient oversight.",
      color: "from-blue-400 to-cyan-400",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-lineara-to-br from-blue-100 to-purple-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-lineara-to-tr from-purple-100 to-pink-100 rounded-full translate-y-24 -translate-x-24 opacity-50"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-lineara-to-r text-black from-blue-600 to-purple-600 bg-clip-text">
            Key Features to Streamline Your Day
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden relative">
                {/* lineara top border */}
                <div className={`h-1 bg-lineara-to-r ${feature.color}`}></div>

                <div className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="p-3 rounded-2xl bg-gray-100 text-gray-700 mr-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeature;
