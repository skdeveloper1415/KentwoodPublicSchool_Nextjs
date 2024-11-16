"use client";
import { useState,useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Kentwood Public Schools - Strategic Plan Dashboard",
//   description: "Welcome to Kentwood Public Schools",
//   icons: {
//     icon: [{ url: "/logo.png" }],
//   },
// };

export default function GoalLayout({ children }) {
  const [route,setRoute] = useState(null)
  const router = useRouter();
 
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('hasVisitedGoalsPage');
 
      // If 'hasVisitedGoalsPage' exists, it's a refresh, so redirect to home
      if (hasVisited) {
        setRoute(true)
        router.replace('/'); // Redirect to the home page
      } else {
        setRoute(false)
        // If this is the first visit, set the session storage item
        sessionStorage.setItem('hasVisitedGoalsPage', true);
      }
    }
  }, [router]);
  return (
    <>
    {route ? null : children}
    </>
  );
}
