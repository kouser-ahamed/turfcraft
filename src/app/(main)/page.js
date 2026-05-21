import Banner from "@/components/Banner";
import ContactFeedbackPage from "@/components/ContactFeedbackPage";
import FeaturedFacilities from "@/components/FeaturedFacilities";
import FeedbackSlider from "@/components/FeedbackSlider";
import NewArrivals from "@/components/shared/NewArrivals";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner />
     <NewArrivals />
     <FeaturedFacilities />
     <FeedbackSlider />
     <ContactFeedbackPage />
    </div>
  );
}
