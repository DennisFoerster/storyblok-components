import Footer from "./components/footer";
import FeatureCard from "./components/feature-card";
import FeatureCards from "./components/feature-cards";
import Hero from "./components/hero";
import ImageTextSection from "./components/image-text-section";
import Navigation from "./components/navigation";
import TextBlock from "./components/text-block";

export function registerStoryblokSections() {
  return {
    footer: Footer,
    feature_card: FeatureCard,
    feature_cards: FeatureCards,
    hero: Hero,
    image_text_section: ImageTextSection,
    navigation: Navigation,
    text_block: TextBlock,
  };
}
