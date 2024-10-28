import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Header from '../Header/Header';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import AllUsers from '../../Pages/Users/AllUsers';
import Login from '../auth/Login';
import AllCourse from '../../Pages/Course/AllCourse';
import AddCourse from '../../Pages/Course/AddCourse';
import EditCourse from '../../Pages/Course/EditCourse';
import AllCourseCategory from '../../Pages/CourseCateorgy/AllCourseCategory';
import AddCourseCategory from '../../Pages/CourseCateorgy/AddCourseCategory';
import EditCourseCategory from '../../Pages/CourseCateorgy/EditCourseCategory';
import AllCourseDetails from '../../Pages/CourseDetails/AllCourseDetails';
import AddCourseDetails from '../../Pages/CourseDetails/AddCourseDetails';
import EditCourseDetails from '../../Pages/CourseDetails/EditCourseDetails';
import AllGallery from '../../Pages/Gallery/AllGallery';
import AddGallery from '../../Pages/Gallery/AddGallery';
import EditGallery from '../../Pages/Gallery/EditGallery';
import AllNews from '../../Pages/News/AllNews';
import AddNews from '../../Pages/News/AddNews';
import EditNews from '../../Pages/News/EditNews';
// import Login from '../auth/Login';

const Home = () => {
  const isLoggedIn = sessionStorage.getItem("login"); // Check if the user is logged in

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <div className="rightside">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Category */}
              <Route path="/all-course" element={<AllCourse />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/edit-course/:id" element={<EditCourse />} />

              {/* Product */}
              <Route path="/all-course-details" element={<AllCourseDetails />} />
              <Route path="/add-course-details" element={<AddCourseDetails />} />
              <Route path="/edit-course-details/:id" element={<EditCourseDetails />} />


              
              {/* Gallery */}
              <Route path="/all-gallery" element={<AllGallery />} />
              <Route path="/add-gallery" element={<AddGallery />} />
              <Route path="/edit-gallery/:id" element={<EditGallery />} />

                {/* News */}
                <Route path="/all-news" element={<AllNews />} />
              <Route path="/add-news" element={<AddNews />} />
              <Route path="/edit-news/:id" element={<EditNews />} />

              {/* Users */}
              <Route path="/all-users" element={<AllUsers />} />


              {/* Tags */}
              <Route path="/all-course-category" element={<AllCourseCategory />} />
              <Route path="/add-course-category" element={<AddCourseCategory />} />
              <Route path="/edit-course-category/:name" element={<EditCourseCategory />} />

            </Routes>
          </div>
        </>
      ) : (
        // Redirect to the login page if not logged in
        <Login/>
      )}
    </>
  );
};

export default Home;
