"use client";
import TeamLanyardRail from "./TeamLanyardRail";

const reviews = [
  {
    "id": "review-0",
    "name": "Sarah M.",
    "role": "Sample review",
    "rating": 5,
    "review": true,
    "tone": 1,
    "image": "/images/about/member-1.jpg",
    "bio": "Careful work and a tidy finish. The shelf looks great.",
    "team": "Handyman Services",
    "links": [],
    "tags": []
  },
  {
    "id": "review-1",
    "name": "James R.",
    "role": "Sample review",
    "rating": 4,
    "review": true,
    "tone": 2,
    "image": "/images/about/member-2.jpg",
    "bio": "The cabinet door works smoothly again. Very helpful service.",
    "team": "Home Repairs",
    "links": [],
    "tags": []
  },
  {
    "id": "review-2",
    "name": "Emily T.",
    "role": "Sample review",
    "rating": 5,
    "review": true,
    "tone": 3,
    "image": "/images/about/member-3.jpg",
    "bio": "Our new cabinet was assembled neatly and securely.",
    "team": "Assembly & Installation",
    "links": [],
    "tags": []
  },
  {
    "id": "review-3",
    "name": "Michael B.",
    "role": "Sample review",
    "rating": 5,
    "review": true,
    "tone": 4,
    "image": "/images/about/member-4.jpg",
    "bio": "The kitchen feels fresh and spotless. Great attention to detail.",
    "team": "Cleaning Services",
    "links": [],
    "tags": []
  },
  {
    "id": "review-4",
    "name": "Laura S.",
    "role": "Sample review",
    "rating": 4,
    "review": true,
    "tone": 5,
    "image": "/images/about/member-5.jpg",
    "bio": "The freshly painted room looks fantastic.",
    "team": "Home Renovation",
    "links": [],
    "tags": []
  },
  {
    "id": "review-5",
    "name": "David K.",
    "role": "Sample review",
    "rating": 5,
    "review": true,
    "tone": 1,
    "image": "/images/about/member-6.jpg",
    "bio": "Clear communication and professional work throughout.",
    "team": "Handyman Services",
    "links": [],
    "tags": []
  },
  {
    "id": "review-6",
    "name": "Anna W.",
    "role": "Sample review",
    "rating": 4,
    "review": true,
    "tone": 2,
    "image": "/images/about/member-7.jpg",
    "bio": "Helpful with several small jobs around the house.",
    "team": "Home Repairs",
    "links": [],
    "tags": []
  },
  {
    "id": "review-7",
    "name": "Robert P.",
    "role": "Sample review",
    "rating": 5,
    "review": true,
    "tone": 3,
    "image": "/images/about/member-8.jpg",
    "bio": "Everything was left clean and organized after the work.",
    "team": "Assembly & Installation",
    "links": [],
    "tags": []
  }
];
export default function ReviewCards() { return <div className="about-mertin about-compact w-full bg-background text-foreground"><p className="review-demo-label">Sample reviews ? For design preview only</p><TeamLanyardRail items={reviews} autoplay={false} compact /></div>; }
