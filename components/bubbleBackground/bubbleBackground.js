class BubbleBackground extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class='canvas'>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
      <div class='bubble'></div>
    </div>`;
  }
}

customElements.define('bubble-background', BubbleBackground);
