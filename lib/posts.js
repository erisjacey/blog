import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { idArrToStr, idStrToArr } from '@/lib/utils';

const postsDirectory = path.join(process.cwd(), 'posts');

const readdirSyncRec = (path) => {
  const files = [];
  for (const file of fs.readdirSync(path)) {
    const fullPath = path + '/' + file;
    if (fs.lstatSync(fullPath).isDirectory())
      readdirSyncRec(fullPath).forEach(x => files.push(file + '/' + x));
    else files.push(file);
  }
  return files
};

const getSortedPostsData = () => {
  // Get file names under /posts
  const fileNames = readdirSyncRec(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
};

const getAllPostIds = () => {
  const fileNames = readdirSyncRec(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: ['ssg-ssr']
  //     }
  //   },
  //   {
  //     params: {
  //       id: ['pre-rendering']
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => ({
    params: {
      id: idStrToArr(fileName.replace(/\.md$/, '')),
    }
  }));
};

async function getPostData(id) {
  // id format for '/a/b/c.md': ['a', 'b', 'c']
  const idString = idArrToStr(id);
  const fullPath = path.join(postsDirectory, `${idString}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use unified to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse) // Parse markdown.
    .use(remarkGfm) // Support GFM (tables, autolinks, tasklists, strikethrough).
    .use(remarkRehype) // Turn it into HTML.
    .use(rehypeStringify) // Serialize HTML.
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};

export { getSortedPostsData, getAllPostIds, getPostData };
