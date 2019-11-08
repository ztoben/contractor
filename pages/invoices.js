import React from 'react';
import Layout from '../components/layout';
import Link from 'next/link';

export default function Invoices() {
  return (
    <Layout>
      <h1>Invoices</h1>
      <Link href="/invoices/new">
        <a>+ New Invoice</a>
      </Link>
    </Layout>
  );
}
