import { html, render } from 'https://esm.sh/htm/preact/standalone'
import { signal } from 'https://esm.sh/htm/preact/signals'

const App = () => {
  const light = signal(true)
  return html`<button onClick={() => light = !light} class="theme-btn">S</button>`
}

render(html`<${App} />`, document.body)
