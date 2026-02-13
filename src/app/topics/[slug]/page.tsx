import { notFound } from 'next/navigation';
import { getTopicBySlug, getAllTopics } from '../../../data/topics';
import TopicContent from '@/components/TopicContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  // Calculate previous and next topics for navigation
  const allTopics = getAllTopics();
  const currentIndex = allTopics.findIndex((t) => t.slug === slug);

  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  return (
    <TopicContent
      topic={topic}
      prevTopic={prevTopic ? { slug: prevTopic.slug, title: prevTopic.title } : null}
      nextTopic={nextTopic ? { slug: nextTopic.slug, title: nextTopic.title } : null}
    />
  );
}
