import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'

const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-faktum-medium mb-6 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-faktum-medium mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-faktum-medium mb-3 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-lg font-faktum-medium mb-2 text-gray-900 dark:text-gray-100" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mb-4 pl-6 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 pl-6 text-gray-700 dark:text-gray-300" {...props} />
  ),
  li: (props: any) => (
    <li className="mb-1 text-gray-700 dark:text-gray-300" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 mb-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  a: (props: any) => (
    <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-faktum-medium text-gray-900 dark:text-gray-100" {...props} />
  ),
  em: (props: any) => (
    <em className="italic text-gray-700 dark:text-gray-300" {...props} />
  ),
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
