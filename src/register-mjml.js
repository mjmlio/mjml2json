import { registerMJElement, registerMJHeadElement } from 'mjml-core'

import each from 'lodash/each'

import Button from 'mjml-button'
import Column from 'mjml-column'
import Divider from 'mjml-divider'
import Group from 'mjml-group'
import Image from 'mjml-image'
import MJAccordion from 'mjml-accordion'
import MJCarousel from 'mjml-carousel'
import MJHero from 'mjml-hero'
import MJNavbar from 'mjml-navbar'
import Raw from 'mjml-raw'
import Section from 'mjml-section'
import MJSocial from 'mjml-social'
import Spacer from 'mjml-spacer'
import Table from 'mjml-table'
import Text from 'mjml-text'
import Wrapper from 'mjml-wrapper'

import MJHeadAttributes from 'mjml-head-attributes'
import MJHeadFont from 'mjml-head-font'
import MJHeadStyle from 'mjml-head-style'
import MJHeadTitle from 'mjml-head-title'

const { Accordion, AccordionElement, AccordionTitle, AccordionText } = MJAccordion
const { Hero, HeroContent } = MJHero
const { Carousel, CarouselImage } = MJCarousel
const { Navbar, InlineLinks, Link } = MJNavbar
const { Social, SocialElement } = MJSocial

each(
  [
    Accordion,
    AccordionElement,
    AccordionText,
    AccordionTitle,
    Button,
    Carousel,
    CarouselImage,
    Column,
    Divider,
    Group,
    Hero,
    HeroContent,
    Image,
    InlineLinks,
    Link,
    Navbar,
    Raw,
    Section,
    Social,
    SocialElement,
    Spacer,
    Table,
    Text,
    Wrapper,
  ],
  tag => registerMJElement(tag),
)

each([MJHeadAttributes, MJHeadFont, MJHeadStyle, MJHeadTitle], tag => registerMJHeadElement(tag))

export * from 'mjml-core'
