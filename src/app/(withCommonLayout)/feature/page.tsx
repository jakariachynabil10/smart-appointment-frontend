import BestChoice from "@/components/UI/FeaturePage/BestChoice/BestChoice";
import BuildMorden from "@/components/UI/FeaturePage/BuiltMordan/BuiltMorden";
import Feature from "@/components/UI/FeaturePage/Feature/Feature";
import RedyToTransform from "@/components/UI/FeaturePage/RedyToTransfrom/RedyToTransForm";
import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";

const featurePage = () => {
  return (
    <>
      <HeroSection />
      <Feature />
      <BestChoice />
      <BuildMorden/>
      <RedyToTransform/>
    </>
  );
};

export default featurePage;
