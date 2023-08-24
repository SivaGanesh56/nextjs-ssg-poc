// TODO: lazy load
import Hero from './hero/Hero';
import Layout from './layout/Layout';
import LayoutSectionV2 from './layoutSectionV2/LayoutSectionV2';
import TabbedCarousal from './tabbedCarousal/TabbedCarousal';

export const templatesMap = {
    "LayoutSection": Layout,
    "TemplateHeroFullBleed": Hero,
    "layoutSectionV2": LayoutSectionV2,
    "templateTabbedCarousal": TabbedCarousal
}