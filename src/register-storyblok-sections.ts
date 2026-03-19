import Footer from "./components/footer";
import FeatureCard from "./components/feature-card";
import FeatureCards from "./components/feature-cards";
import Hero from "./components/hero";
import Navigation from "./components/navigation";

export function registerStoryblokSections() {
  return {
    footer: Footer,
    feature_card: FeatureCard,
    feature_cards: FeatureCards,
    hero: Hero,
    navigation: Navigation,
  };
}
