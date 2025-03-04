import { css } from 'lit';

// Define the font-face rule to import AdihausDIN
const adihausDINFont = css`
  @font-face {
      font-family: 'AdihausDIN';
      src: url('font/AdihausDIN-Regular.woff2') format('woff2'),
          url('font/adineuePRO-Bold (1).woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
`;

const adineueProCondFont = css`
  @font-face {
      font-family: 'adineueProCond';
      src: url('font/adineuePRO-Bold.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
`;


export const theme = css`
  ${adihausDINFont}
  ${adineueProCondFont}
  :host {
    --dark-primary-color: #0098cf;
    --default-primary-color: #00b0f0;
    --focused-color: #029ad2;
    --light-primary-color: #00b0f0;
    --text-primary-color: #fff;
    --accent-color: #ff5252;
    --primary-background-color: #fff;
    --primary-text-color: #424242;
    --secondary-text-color: #757575;
    --disabled-text-color: #bdbdbd;
    --divider-color: #ededed;
    --footer-background-color: #00b0f0;
    --footer-text-color: #616161;
    --twitter-color: #4099ff;
    --facebook-color: #00b0f0;
    --border-light-color: #e2e2e2;
    --error-color: #e64a19;

    /* Custom */
    --default-background-color: #fff;
    --secondary-background-color: #f5f5f5;
    --additional-background-color: #f7f7f7;
    --contrast-additional-background-color: #e8e8e8;
    --animation: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --slide-animation: 0.4s cubic-bezier(0, 0, 0.2, 1);
    --border-radius: 4px;
    --box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
      0 1px 3px 0 rgb(0 0 0 / 12%);
    --box-shadow-primary-color: 0 3px 3px -2px rgb(18 185 246 / 30%),
      0 3px 4px 0 rgb(18 185 246 / 30%), 0 1px 8px 0 rgb(18 185 246 / 30%);
    --box-shadow-primary-color-hover: 0 1px 3px -2px rgb(18 185 246 / 30%),
      0 4px 5px 0 rgb(18 185 246 / 30%), 0 2px 9px 0 rgb(18 185 246 / 30%);
    --font-family: 'AdihausDIN', Arial, sans-serif;
    --max-container-width: 1280px;
    --primary-color-transparent: rgb(18 185 246 / 10%);
    --primary-color-light: rgb(18 185 246 / 80%);
    --primary-color-white: #ede7f6;

    /* Labels */
    --gde: #3d5afe;
    --wtm: #1de9b6;
    --gdg: #00b0ff;

    /* Tags */
    --general: #9e9e9e;
    --android: #78c257;
    --web: #2196f3;
    --cloud: #00b0f0;
    --community: #e91e63;
    --design: #e91e63;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: 'AdihausDIN',var(--font-family);
    text-rendering: optimizelegibility;
    color: var(--primary-text-color);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: bold;
    font-family:'AdineuePRO', Arial, sans-serif;
  }

  h1 {
    padding: 8px 8px 24px 14px;
    font-size: 24px;
    line-height: 30px;
    font-weight: 500;
  }

  a {
    color: var(--default-primary-color);
    text-decoration: none;
    transition: border-color var(--animation);
  }

  mwc-button {
    --mdc-theme-primary: var(--default-primary-color);
    --mdc-theme-on-primary: var(--default-background-color);
  }

  paper-button {
    padding: 0.7em;
    border-radius: 2px;
    font-size: 14px;
    color: var(--default-primary-color);
    transition: background-color var(--animation);
  }

  paper-button:hover {
    background-color: var(--primary-color-transparent);
  }

  paper-button[disabled] {
    cursor: default;
    background-color: var(--primary-color-transparent);
    opacity: 0.8;
  }

  paper-button[primary] {
    background-color: var(--default-primary-color);
    color: var(--text-primary-color);
  }

  paper-button[primary]:hover {
    background-color: var(--primary-color-light);
  }

  paper-button[primary][invert] {
    color: var(--default-primary-color);
    background-color: var(--text-primary-color);
  }

  paper-button[primary][invert]:hover {
    background-color: var(--primary-color-white);
  }

  paper-button[primary-text] {
    color: var(--default-primary-color);
  }

  paper-button iron-icon {
    --iron-icon-height: 20px;
    --iron-icon-width: 20px;
  }

  paper-button.icon-right iron-icon {
    margin-left: 8px;
  }

  paper-button.icon-left iron-icon {
    margin-right: 8px;
  }

  paper-button.animated iron-icon {
    transition: transform var(--animation);
  }

  paper-button.animated.icon-right:hover iron-icon {
    transform: translateX(4px);
  }

  paper-button.animated.icon-left:hover iron-icon {
    transform: translateX(-4px);
  }

  .container,
  .container-narrow {
    margin: 0 auto;
    padding: 24px 16px;
    max-width: var(--max-container-width);
  }

  .container-narrow {
    max-width: 800px;
  }

  .container-title {
    margin-bottom: 24px;
    padding: 0;
    font-size: 32px;
    line-height: 30px;
    margin-top:-60px;
   
  }

  .countdown-title {
    text-align: center;
    color:#000000;
    margin-bottom: 24px;
    padding: 0;
    font-size: 25px;
    line-height: 35px;
    flex-wrap: wrap;
    font-weight:bold;
    letter-spacing:-1px;
    margin-top:-20px;
  }

  .countdown-time {
    display: flex;
    justify-content: center;
    text-align: center;
    color: white;
    margin-top: 40px
    margin-bottom: 40px;
    line-height: 25px;
    flex-wrap: wrap;
   background-image: url('images/backgrounds/timerBg.png');
   background-size: cover;
  background-position: center bottom; /* This positions the image at the center horizontally and at the bottom vertically */
   padding-bottom: 20px;
  }

  .big-icon {
    --iron-icon-height: 48px;
    --iron-icon-width: 48px;
  }

  .gde-b {
    background-color: var(--gde);
  }

  .wtm-b {
    background-color: var(--wtm);
  }

  .gdg-b {
    background-color: var(--gdg);
  }

  .google-b {
    background-color: var(--secondary-background-color);
  }

  .google-b .badge-icon {
    --iron-icon-width: 18px;
    --iron-icon-height: 18px;

    color: #fff;
  }

  .card {
    background-color: var(--default-background-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    transition: box-shadow var(--animation);
    cursor: pointer;
  }

  .tag {
    height: 32px;
    padding: 8px 12px;
    font-size: 12px;
    color: currentcolor;
    background: white;
    border: 1px solid currentcolor;
    border-radius: 32px;
    margin: 1px;
    line-height: initial;
  }

  @media (min-width: 640px) {
    .container,
    .container-narrow {
      padding: 32px;
    }

    .card:hover {
      box-shadow: var(--box-shadow);
    }
  }
`;
