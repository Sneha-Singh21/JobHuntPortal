import React, { useEffect } from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './shared/HeroSection.jsx';
import CategoryCarousel from './shared/CategoryCarousel.jsx';
import LatestJobs from './shared/LatestJobs.jsx';
import Footer from './shared/Footer.jsx';
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect (() => {
    if(user?.role === 'recruiter') {
      navigate("/admin/companies")
    }
  })
  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home;