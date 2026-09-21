import React from 'react';
import Eyebrow from './Eyebrow';

export default function PageHero({ eyebrow, title, lead }) {
  return <section className="page-hero wrap"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p className="page-lead">{lead}</p></section>;
}
