import Banner from "@/components/Banner";
import ContactFeedbackPage from "@/components/ContactFeedbackPage";
import FeaturedFacilities from "@/components/FeaturedFacilities";
import FeedbackSlider from "@/components/FeedbackSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner />
     <FeaturedFacilities />
     <FeedbackSlider />
     <ContactFeedbackPage />
    </div>
  );
}
