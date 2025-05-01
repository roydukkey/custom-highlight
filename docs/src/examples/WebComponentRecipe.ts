import CustomHighlight from 'custom-highlight';

export class CustomHighlightZone extends HTMLElement {
  static observedAttributes = ['search'];

  connectedCallback() {
    const value = this.getAttribute('search');

    if (value) {
      CustomHighlight
        .created(this, { value })
        .beforeMount(this, { value })
        .mounted(this, { value });
    }
  }

  attributeChangedCallback(name: string, oldValue: string, value: string) {
    if (this.isConnected && name === 'search') {
      CustomHighlight
        .beforeUpdate(this, { value, oldValue })
        .updated(this, { value, oldValue });
    }
  }

  disconnectedCallback() {
    const value = this.getAttribute('search');

    if (value) {
      CustomHighlight.unmounted(this, { value });
    }
  }
}
