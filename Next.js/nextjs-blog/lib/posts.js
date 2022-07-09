import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
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
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // 아래와 같은 형태로 파일명 리스트를 리턴한다.
  // [
  //     {
  //         params: {
  //             id: 'ssg-ssr'
  //         }
  //     },
  //     {
  //         params: {
  //             id: 'pre-rendering'
  //         }
  //     },
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 포스트의 메타데이터를 파싱하기 위해 grayl-matter 사용
  const matterResult = matter(fileContents);

  // remark를 사용하여 마크다운을 HTML로 변환
  const processContent = await remark().use(html).process(matterResult.content);
  const contentHTML = processContent.toString();

  // 데이터를 id와 병합시킨다.
  return {
    id,
    contentHTML,
    ...matterResult.data,
  };
}
