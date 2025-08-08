import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'

const contentDirectory = path.join(process.cwd(), 'app/content')

export interface PostMeta {
  title: string
  date: string
  description?: string
  tags?: string[]
  image?: string
  published?: boolean
}

export interface Post {
  slug: string
  meta: PostMeta
  content: string
}

export function getPostSlugs(type: 'blog' | 'case-studies'): string[] {
  const fullPath = path.join(contentDirectory, type)
  if (!fs.existsSync(fullPath)) {
    return []
  }
  
  const fileNames = fs.readdirSync(fullPath)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string, type: 'blog' | 'case-studies'): Post | null {
  try {
    const fullPath = path.join(contentDirectory, type, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      meta: {
        title: data.title || slug,
        date: data.date ? format(new Date(data.date), 'MMMM dd, yyyy') : '',
        description: data.description || '',
        tags: data.tags || [],
        image: data.image || '',
        published: data.published ?? true, // default to true if not specified
      },
      content,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPosts(type: 'blog' | 'case-studies'): Post[] {
  const slugs = getPostSlugs(type)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, type))
    .filter((post): post is Post => post !== null && (post.meta.published ?? true))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1))
  
  return posts
}

export function getPostsByTag(tag: string, type: 'blog' | 'case-studies'): Post[] {
  return getAllPosts(type).filter((post) => 
    post.meta.tags?.includes(tag)
  )
} 