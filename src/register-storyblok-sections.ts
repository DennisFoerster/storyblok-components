import CallToAction from "./components/call-to-action";
import Footer from "./components/footer";
import FeatureCard from "./components/feature-card";
import FeatureCards from "./components/feature-cards";
import Hero from "./components/hero";
import ImageBlock from "./components/image-block";
import ImageTextSection from "./components/image-text-section";
import Navigation from "./components/navigation";
import TextBlock from "./components/text-block";

export function registerStoryblokSections() {
  return {
    call_to_action: CallToAction,
    footer: Footer,
    feature_card: FeatureCard,
    feature_cards: FeatureCards,
    hero: Hero,
    image_block: ImageBlock,
    image_text_section: ImageTextSection,
    navigation: Navigation,
    text_block: TextBlock,
  };
}
