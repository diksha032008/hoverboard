import { Pending, Success } from '@abraham/remotedata';
import { computed, customElement, property } from '@polymer/decorators';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { Ticket } from '../models/ticket';
import { RootState } from '../store';
import { ReduxMixin } from '../store/mixin';
import { initialTicketsState } from '../store/tickets/state';
import { buyTicket, contentLoaders, ticketsBlock } from '../utils/data';
import '../utils/icons';
import './content-loader';
import './shared-styles';

@customElement('tickets-block')
export class TicketsBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
        }

        .tickets-wrapper {
          text-align: center;
        }

        .tickets {
          margin: 32px 0 24px;
        }

        .ticket-item {
          margin: 16px 8px;
          width: 100%;
          text-align: center;
          color: var(--primary-text-color);
          background-color: var(--default-background-color);
        }

        .ticket-item[in-demand] {
          transform: scale(1.05);
          box-shadow: var(--box-shadow-primary-color);
          border-top: 2px solid var(--default-primary-color);
          z-index: 1;
        }

        .ticket-item[in-demand]:hover {
          box-shadow: var(--box-shadow-primary-color-hover);
        }

        .ticket-item[sold-out] {
          opacity: 0.5;
          filter: grayscale(1);
          cursor: not-allowed;
        }

        .ticket-item[sold-out]:hover {
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.07), 0 2px 2px 0 rgba(0, 0, 0, 0.15);
        }

        .header {
          padding: 24px 0 0;
          font-size: 16px;
        }

        .content {
          padding: 0 24px;
        }

        .type-description {
          font-size: 12px;
          color: var(--secondary-text-color);
        }

        .ticket-price-wrapper {
          margin: 24px 0;
          white-space: nowrap;
        }

        .price {
          color: var(--default-primary-color);
          font-size: 40px;
        }

        .discount {
          font-size: 14px;
          color: var(--accent-color);
        }

        .sold-out {
          display: none;
          font-size: 14px;
          text-transform: uppercase;
          height: 32px;
          color: var(--secondary-text-color);
        }

        .additional-info {
          margin: 16px auto 0;
          max-width: 480px;
          font-size: 14px;
          color: var(--secondary-text-color);
        }

        .actions {
          padding: 24px;
          position: relative;
        }

        .tickets-placeholder {
          display: grid;
          width: 100%;
        }

        paper-button[disabled] {
          background-color: var(--primary-color-transparent);
          font-size: 12px;
        }

        @media (min-width: 640px) {
          .tickets-placeholder {
            grid-template-columns: repeat(auto-fill, 200px);
          }

          .ticket-item {
            max-width: 200px;
          }

          .ticket-item[in-demand] {
            transform: scale(1.15);
          }
        }
      </style>
    `;
  }

  private ticketsBlock = ticketsBlock;
  private contentLoaders = contentLoaders.tickets;

  @property({ type: Object })
  tickets = initialTicketsState;

  override stateChanged(state: RootState) {
    this.tickets = state.tickets;
  }

  @computed('tickets')
  private get pending() {
    return this.tickets instanceof Pending;
  }

  private getDiscount(ticket: Ticket) {
    if (!(this.tickets instanceof Success)) {
      return '';
    }
    const primaryTicket = this.tickets.data.find((ticket) => ticket.primary);
    if (!primaryTicket) {
      return '';
    }
    const maxPrice = primaryTicket && primaryTicket.price;
    if (!ticket.regular || ticket.primary || ticket.soldOut || !maxPrice) {
      return '';
    }
    const discount = String(Math.round(100 - (ticket.price * 100) / maxPrice));
    return this.ticketsBlock.save.replace('${discount}', discount);
  }

  private onTicketTap(e: PointerEvent & { model: { ticket: Ticket } }) {
    if (e.model.ticket.soldOut || !e.model.ticket.available) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private getButtonText(available: boolean) {
    return available ? buyTicket : this.ticketsBlock.notAvailableYet;
  }
}
