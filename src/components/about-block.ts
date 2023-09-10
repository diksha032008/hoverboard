import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { aboutBlock } from '../utils/data';
import { ThemedElement } from './themed-element';
import { openVideoDialog } from '../store/ui/actions';

@customElement('about-block')
export class AboutBlock extends ThemedElement {
  private countdownInterval: NodeJS.Timeout | null = null;

  override connectedCallback() {
    super.connectedCallback();

    // Calculate the time remaining until October 18,2023 (in milliseconds)
    const targetDate = new Date('2023-10-18T00:00:00Z').getTime();
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    // Update the countdown timer immediately
    this.updateCountdownTimer(timeRemaining);

    // Set up an interval to update the countdown timer every second
    this.countdownInterval = setInterval(() => {
      const updatedTimeRemaining = targetDate - new Date().getTime();
      this.updateCountdownTimer(updatedTimeRemaining);
    }, 1000);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    const countdownTimer = this.shadowRoot?.getElementById('countdown-timer');


    // Clear the countdown interval when the component is disconnected
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private updateCountdownTimer(timeRemaining: number) {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const countdownTimer = this.shadowRoot?.getElementById('countdown-timer');

    if (countdownTimer) {
      countdownTimer.innerHTML = `
      <h1 class="countdown-title" style="text-align:center; font-weight:bolder;">Countdown To The Most Awaited Event Of The Year</h1>
      <h2 class = "countdown-time">${days} days ${hours} hours ${minutes} minutes ${seconds} seconds</h2>
      `;
    }
  }

  static override get styles() {
    return [
      ...super.styles,
      css`
        .container {
          padding-top: 64px;
          display: grid;
          grid-gap: 32px;
          grid-template-columns: 1fr;
        }

        .statistics-block {
          width: 100%;
          display: grid;
          grid-gap: 32px 16px;
          grid-template-columns: repeat(2, 1fr);
        }

        .numbers {
          font-size: 40px;
        }

        .numbers::after {
          content: '';
          display: block;
          height: 2px;
          width: 64px;
          background-color: var(--default-primary-color);
        }

        .label {
          margin-top: 4px;
        }

        @media (max-width: 640px) {
          .content {
            display:block;
            height:auto;
            text-align:left;
          }

          .statistics-block {
            grid-gap: 32px;
          }

          .numbers {
            font-size: 56px;
          }
          .countdown-time{
            
            height:100px;
            padding-top:40px;
            text-align:center;
          }
        }

        .countdown-time{
        height:300px;
            padding-top:120px;
            text-align:center;
        }
          



      `,
    ];
  }

  override render() {
    return html`
      <div class="container">
        <!-- Your existing content here -->
        <div>
         
          <p>${aboutBlock.callToAction.featuredSessions.description}</p>
        </div>

        <!-- Countdown timer -->
   
        
        <div id="countdown-timer"></div>
   
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'about-block': AboutBlock;
  }
}
