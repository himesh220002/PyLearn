import { getAllTopics } from "../../data/topics";
import TopicExplorer from "../../components/TopicExplorer";

export default function TopicsPage() {
    const topics = getAllTopics();

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header Section */}
            <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
                </div>

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 mb-4">
                        Curriculum
                    </h2>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-5xl sm:tracking-tight lg:text-6xl mb-6">
                        Master Python <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Concepts</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Step-by-step interactive lessons designed to build your understanding
                        from the ground up. Choose a topic below to start learning.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <TopicExplorer initialTopics={topics} />
            </div>
        </div>
    );
}

