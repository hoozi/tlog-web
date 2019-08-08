import PageLayout from '@/layouts/PageLayout'
import content from './view';
import { services } from '@/config';

const PAGE_NAME = 'index';

const render = data => {
  return content({services, ...data});
}

export default new PageLayout({
  pageTitle: 'index',
  current: `${PAGE_NAME}.html`,
  page: false
}).render(render);