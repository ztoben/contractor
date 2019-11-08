import Layout from '../components/layout';
import Link from 'next/link';
import React from 'react';

const PostLink = ({type, id}) => (
  <li>
    <Link href={`/${type}/[id]`} as={`/${type}/${id}`}>
      <a>{`${type} - ${id}`}</a>
    </Link>
  </li>
);

export default function Blog() {
  return (
    <Layout>
      <h4>Invoices</h4>
      <ul>
        <PostLink id="1" type="invoices" />
        <PostLink id="2" type="invoices" />
        <PostLink id="3" type="invoices" />
      </ul>
      <h4>Projects</h4>
      <ul>
        <PostLink id="1" type="projects" />
        <PostLink id="2" type="projects" />
        <PostLink id="3" type="projects" />
      </ul>
    </Layout>
  );
}
