import '@justinribeiro/lite-youtube';
import '@material/mwc-button';
import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';
import { property, query } from '@polymer/decorators';
import '@polymer/paper-icon-button';
import { html, PolymerElement } from '@polymer/polymer';
import { RootState } from '../../store';
import { ReduxMixin } from '../../store/mixin';
import { closeVideoDialog } from '../../store/ui/actions';
import { initialUiState } from '../../store/ui/state';
import '../shared-styles';

class VideoDialog extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="positioning">
        :host {
          --mdc-dialog-min-width: 80vw;
        }

        @media only screen and (max-width: 600px) {
          :host {
            --mdc-dialog-min-width: 100vw;
          }
        }
      </style>
    `;
  }

  static get is() {
    return 'video-dialog';
  }

  @query('#dialog')
  dialog!: Dialog;

  @property({ type: Object })
  video = initialUiState.videoDialog;

  override ready() {
    super.ready();
  }

  override stateChanged(state: RootState) {
    this.video = state.ui.videoDialog;
  }

  closeDialog() {
    closeVideoDialog();
  }
}

window.customElements.define(VideoDialog.is, VideoDialog);
