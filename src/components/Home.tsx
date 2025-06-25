import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dumbbell,
  Droplet,
  CheckSquare,
  Brain,
  Apple,
  ShoppingBag,
  Camera,
  Crop as Drop,
} from 'lucide-react';
function Home() {
  const navigate = useNavigate();
  const features = [
    { icon: <Dumbbell className="w-8 h-8" />, title: 'Need a Fitness Trainer', path: '/fitness-trainer' },
    { icon: <Droplet className="w-8 h-8" />, title: 'Water Tracker', path: '/water-tracker' },
    { icon: <CheckSquare className="w-8 h-8" />, title: 'Habit Tracker', path: '/habit-tracker' },
    { icon: <Brain className="w-8 h-8" />, title: 'Meditation', path: '/meditation' },
    { icon: <Apple className="w-8 h-8" />, title: 'Calories/Protein Tracker', path: '/calories-tracker' },
    { icon: <ShoppingBag className="w-8 h-8" />, title: 'Shop', path: '/shop' },
    { icon: <Camera className="w-8 h-8" />, title: 'Period Tracker', path: '/period-tracker' },
    { icon: <Drop className="w-8 h-8" />, title: 'Workout Split Tracker', path: '/workout-tracker' },
  ];
  const workoutImages = [
    {
      url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Strength Training"
    },
    {
      url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Cardio"
    },
    {
      url: "https://images.unsplash.com/photo-1599447421416-3414985c3fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Flexibility"
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pt-16">
      <div className="relative h-screen">
        <img 
          src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Fitness"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold mb-6"
              >
                Transform Your Life
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-semibold mb-8"
              >
                Your Journey to Better Health Starts Here
              </motion.h2>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors"
              >
                Explore more
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      <section id="features" className="py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features to explore</h2>
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(feature.path)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105 transition-transform duration-200"
            >
              <div className="flex flex-col items-center text-teal-600">
                {feature.icon}
                <h3 className="mt-4 text-center font-medium">{feature.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Check your Body Posture here</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Use our posture analysis tool to identify alignment issues and improve your form. Stay safe and get the most out of every workout.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/posture-check')}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Check Now
          </motion.button>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Transform Your Body</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {workoutImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{image.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About Us</h2>
            <p className="text-gray-600 mb-6">
              We are dedicated to helping you achieve your fitness and wellness goals. Our platform provides comprehensive tools and guidance to support your journey to better health.
            </p>
            <p className="text-gray-600">
              With expert trainers, personalized workout plans, and a supportive community, we make it easier than ever to stay motivated and reach your fitness goals.
            </p>
          </div>
        </div>
      </section>
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full p-3 border rounded-lg"
              ></textarea>
              <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
