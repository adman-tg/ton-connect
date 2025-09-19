import React from 'react'
import ReactDOM from 'react-dom/client'
import * as t from '@tonconnect/ui-react'
import { beginCell, toNano } from '@ton/core'

const manifestUrl=`https://adman-tg.github.io/ton-connect/manifest.json`

const root = document.getElementById('root') as HTMLElement

ReactDOM
  .createRoot(root)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

function WalletActions() {
  const [tonConnectUI] = t.useTonConnectUI()
  const wallet = t.useTonWallet()

  const sendTon = async () => {
    const amount = 0.3

    const receiver = `UQC66pKa-6mINNx3VKC9tY68Vr_3Q2h6Ybzq-Ktbuv0_w9XM`
    // const receiver = wallet.account.address,

    const payload = encodePayload(`{"TgId": "1234567"}`)
    const validUntil = dateAddMinutes(5)

    const messages = [{
      address: receiver,
      amount: toNano(amount).toString(),
      payload: payload,
    }]

    await tonConnectUI.sendTransaction({validUntil, messages})
  }

  return (
    <div className="blah">
      <t.TonConnectButton className="pos-center-x"/>
      {wallet && <button onClick={sendTon}>Send 1 TON</button>}
    </div>
  )
}

export default function App() {
  return (
    <t.TonConnectUIProvider manifestUrl>
      <WalletActions />
    </t.TonConnectUIProvider>
  )
}

function encodePayload(val) {
  return beginCell()
    .storeUint(0, 32)
    .storeStringTail(val)
    .endCell()
    .toBoc()
    .toString('base64')
}

function dateAddMinutes(val) {
  const now = Math.floor(Date.now() / 1000)
  return now + 60 * val
}
