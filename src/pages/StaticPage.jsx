import { useParams, Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useStaticPages } from "@/hooks/useStaticPages.js";
import NotFound from "@/pages/NotFound.jsx";

export default function StaticPage() {
  const { slug } = useParams();
  const { staticPageData, isLoading, error } = useStaticPages();
  let pageData;
  if (!isLoading) pageData = staticPageData.find((page) => page.slug === slug);
  console.log(slug);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!pageData) {
    return <NotFound />;
  }

  return (
    <Layout>
      <AuroraHero
        title={pageData.title}
        compact={true}
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
      />
      <div className="container px-4 mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-card border rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-green-600"
            dangerouslySetInnerHTML={{ __html: pageData.description }}
          />
        </motion.div>
      </div>
    </Layout>
  );
}
