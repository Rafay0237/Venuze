export const venueCategories = [
  {
    id: "celebration",
    label: "Celebration Venues",
    count: 37,
    image: "/images/celebration-venues.png",
  },
  {
    id: "private-party",
    label: "Private Party Venues",
    count: 24,
    image: "/images/private-party-venues.png",
  },
  {
    id: "corporate",
    label: "Corporate Meetings",
    count: 18,
    image: "/images/corporate-meetings.png",
  },
  {
    id: "creative",
    label: "Creative Studios",
    count: 15,
    image: "/images/creative-studios.png",
  },
] as const;

export const featuredFilters = [
  "Gallery",
  "Rooftop",
  "Restaurant",
  "Outdoor",
  "Studio",
  "Terrace",
  "Ballroom",
] as const;

export const featuredVenues = [
  {
    id: "fv-1",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    image: "/images/high-spec-room-social.jpg",
    guests: "300+",
    size: "2,000 sq ft",
    perk: "Free parking",
    pricePerHour: 50,
  },
  {
    id: "fv-2",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    image: "/images/high-spec-room-meeting.png",
    guests: "300+",
    size: "2,000 sq ft",
    perk: "Free parking",
    pricePerHour: 50,
  },
  {
    id: "fv-3",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    image: "/images/high-spec-room-studio.png",
    guests: "300+",
    size: "2,000 sq ft",
    perk: "Free parking",
    pricePerHour: 50,
  },
  {
    id: "fv-4",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    image: "/images/high-spec-room-party.png",
    guests: "300+",
    size: "2,000 sq ft",
    perk: "Free parking",
    pricePerHour: 50,
  },
] as const;

export const vendorCategories = [
  { id: "caterers", label: "Caterers", image: "/images/caterers.png" },
  { id: "decorators", label: "Decorators", image: "/images/decorators.png" },
  { id: "photographers", label: "Photographers", image: "/images/photographers.png" },
  { id: "entertainment", label: "Entertainment", image: "/images/entertainment.png" },
] as const;

export const howItWorksImages = [
  { src: "/images/search-filter.png", alt: "Search and filter venues" },
  { src: "/images/compare-message.png", alt: "Compare and message hosts" },
  { src: "/images/book-add-services.png", alt: "Book and add services" },
  { src: "/images/agreement.png", alt: "Agreement and teamwork" },
] as const;

export const howItWorksSteps = [
  {
    step: 1,
    title: "Search & filter",
    body: "Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.",
  },
  {
    step: 2,
    title: "Compare & message",
    body: "Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.",
  },
  {
    step: 3,
    title: "Book & add services",
    body: "Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.",
  },
] as const;

export const trustStats = [
  {
    value: "1,500+",
    label: "Venues Vetted & Approved",
    color: "#F18A7A",
  },
  {
    value: "7,500+",
    label: "Events Successfully Hosted",
    color: "#FF5037",
  },
  {
    value: "35+",
    label: "Cities Across the Region",
    color: "#FF8A3D",
  },
  {
    value: "4.9★",
    label: "Average Host Rating",
    color: "#E8A012",
  },
] as const;

export const landingTestimonials = [
  {
    id: "t1",
    name: "Michael Carter",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/images/michael-carter.png",
    rating: 5,
  },
  {
    id: "t2",
    name: "by Ayesha M.",
    quote: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: "/images/ayesha-m.png",
    rating: 5,
  },
] as const;
