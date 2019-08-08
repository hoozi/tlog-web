import PageLayout from '@/layouts/PageLayout'
import content from './view';
import { services } from '@/config';

const PAGE_NAME = 'news';

const render = data => {
  return content({services, ...data});
}

export default new PageLayout({
  pageTitle: '新闻',
  current: `${PAGE_NAME}.html`,
  page: true
}).render(render);