import { customElement } from '@polymer/decorators';
import '@polymer/paper-fab';
import { html, PolymerElement } from '@polymer/polymer';
import '../utils/icons';
import { scrollToTop } from '../utils/scrolling';
import './footer-nav';
import './footer-rel';
import './footer-social';

@customElement('footer-block')
export class FooterBlock extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          margin-top: 20px;
          display: block;
          position: relative;
          color: var(--footer-text-color);
          background: var(--footer-background-color);
          font-size: 14px;
          line-height: 1.5;
        }

        .container {
          margin: 0 auto;
          padding: 20px 0;
          position: relative;
          height: 40px;
        }

        .fab paper-fab {
          background: var(--primary-background-color);
          color: inherit;
          pointer-events: all;
          box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12), 0 8px 8px 0 rgba(0, 0, 0, 0.24);
        }

        .fab {
          margin-bottom:50px;
          position: absolute;
          right: 25px;
          top: -25px;
          pointer-events: none;
          z-index: 1;
        }

        @media (min-width: 640px) {
          .container {
            padding: 15px 36px;
          }
        }
        .copyright{
          color:white;
          font-weight:500;
          text-align:center;
          margin-top: -10px;
        }
      </style>

      <div class="container">
  <p class="copyright" >&#169; adidas 2023</p>
  <div class="fab">
    <paper-fab class="back-to-top" icon="hoverboard:up" on-click="backToTop"></paper-fab>
  </div>
</div>

        
        
      </div>
    `;
  }

  backToTop() {
    scrollToTop();
  }
}
