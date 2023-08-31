import { customElement, property } from '@polymer/decorators';
import '@polymer/google-map';
import '@polymer/paper-icon-button';
import { html, PolymerElement } from '@polymer/polymer';
import { RootState } from '../store';
import { ReduxMixin } from '../store/mixin';
import { initialUiState } from '../store/ui/state';
import { CONFIG, getConfig } from '../utils/config';
import { location, mapBlock } from '../utils/data';
import '../utils/icons';
import './shared-styles';

@customElement('map-block')
export class MapBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          margin: 32px auto;
          display: block;
          position: relative;
        }

        .description-card {
          margin: 0 -16px;
          padding: 16px;
          background-color: var(--default-primary-color);
          color: var(--text-primary-color);
        }

        .bottom-info {
          margin-top: 24px;
        }

        .directions {
          --paper-icon-button: {
            width: 48px;
            height: 48px;
            color: var(--text-primary-color);
          }
        }

        @media (min-width: 640px) {
          :host {
            margin: 64px auto 72px;
          }

          google-map {
            display: block;
            height: 640px;
          }

          .description-card {
            margin: 0;
            padding: 24px;
            max-width: 320px;
            transform: translateY(80px);
            border-radius: var(--border-radius);
          }

          .address {
            font-size: 12px;
          }
        }
      </style>
    `;
  }

  private location = location;
  private mapBlock = mapBlock;
  private googleMapApiKey = getConfig(CONFIG.GOOGLE_MAPS_API_KEY);

  @property({ type: Object })
  private viewport = initialUiState.viewport;
  @property({ type: Object })
  private option = {
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    scrollwheel: false,
    draggable: false,
    styles: [
      {
        stylers: [{ lightness: 40 }, { visibility: 'on' }, { gamma: 0.9 }, { weight: 0.4 }],
      },
      {
        elementType: 'labels',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'water',
        stylers: [{ color: '#5dc7ff' }],
      },
      {
        featureType: 'road',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  override stateChanged(state: RootState) {
    this.viewport = state.ui.viewport;
  }
}
