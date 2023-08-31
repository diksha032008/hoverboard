import { Initialized, Success } from '@abraham/remotedata';
import { computed, customElement, property } from '@polymer/decorators';
import '@polymer/iron-icon';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import '@power-elements/lazy-image';
import '../components/markdown/short-markdown';
import '../components/text-truncate';
import { router } from '../router';
import { RootState, store } from '../store';
import { fetchBlogPosts } from '../store/blog/actions';
import { BlogState, initialBlogState } from '../store/blog/state';
import { ReduxMixin } from '../store/mixin';
import { latestPostsBlock } from '../utils/data';
import { getDate } from '../utils/dates';
import '../utils/icons';
import './shared-styles';

@customElement('latest-posts-block')
export class LatestPostsBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment">
        :host {
          display: block;
        }

        .posts-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 16px;
        }

        .image {
          overflow: hidden;
          --lazy-image-width: 100%;
          --lazy-image-height: 128px;
          --lazy-image-fit: cover;
          width: var(--lazy-image-width);
          height: var(--lazy-image-height);
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
        }

        .details {
          padding: 16px;
        }

        .title {
          font-size: 20px;
          line-height: 1.2;
        }

        .description {
          margin-top: 8px;
          color: var(--secondary-text-color);
        }

        .date {
          margin-top: 16px;
          font-size: 12px;
          text-transform: uppercase;
          color: var(--secondary-text-color);
        }

        .cta-button {
          margin-top: 24px;
        }

        @media (min-width: 640px) {
          .posts-wrapper {
            grid-template-columns: repeat(3, 1fr);
          }

          .post:last-of-type {
            display: none;
          }
        }

        @media (min-width: 812px) {
          .posts-wrapper {
            grid-template-columns: repeat(4, 1fr);
          }

          .post:last-of-type {
            display: flex;
          }
        }
      </style>

    `;
  }

  private latestPostsBlock = latestPostsBlock;

  @property({ type: Object })
  posts: BlogState = initialBlogState;

  override stateChanged(state: RootState) {
    this.posts = state.blog;
  }

  override connectedCallback() {
    super.connectedCallback();
    if (this.posts instanceof Initialized) {
      store.dispatch(fetchBlogPosts);
    }
  }

  @computed('posts')
  get latestPosts() {
    if (this.posts instanceof Success) {
      return this.posts.data.slice(0, 4);
    } else {
      return [];
    }
  }

  postUrl(id: string) {
    return router.urlForName('post-page', { id });
  }

  getDate(date: Date) {
    return getDate(date);
  }
}
