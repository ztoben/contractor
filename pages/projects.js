import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';

export default function Projects() {
  return (
    <Layout>
      <h1>Projects</h1>
      <Link href="/projects/new">
        <a>+ New Project</a>
      </Link>
    </Layout>
  );
}
